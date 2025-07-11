// API Configuration for AI Resume Builder
// All APIs used are free tier or have generous free limits

const API_CONFIG = {
    // OpenAI API - Free Tier: 3 requests/minute
    OPENAI: {
        BASE_URL: 'https://api.openai.com/v1',
        ENDPOINTS: {
            CHAT_COMPLETIONS: '/chat/completions',
            COMPLETIONS: '/completions'
        },
        MODELS: {
            GPT_3_5_TURBO: 'gpt-3.5-turbo',
            GPT_4: 'gpt-4'
        },
        FREE_LIMITS: {
            REQUESTS_PER_MINUTE: 3,
            TOKENS_PER_REQUEST: 1000
        }
    },

    // Resume Parser API - Free Tier: 5 requests/month
    RESUME_PARSER: {
        BASE_URL: 'https://api.resumeparser.com',
        ENDPOINTS: {
            PARSE: '/parse',
            ANALYZE: '/analyze'
        },
        FREE_LIMITS: {
            REQUESTS_PER_MONTH: 5
        }
    },

    // Hugging Face Inference API - Free Tier
    HUGGING_FACE: {
        BASE_URL: 'https://api-inference.huggingface.co',
        MODELS: {
            TEXT_GENERATION: 'gpt2',
            SENTIMENT_ANALYSIS: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
            TEXT_CLASSIFICATION: 'facebook/bart-large-mnli'
        }
    },

    // Cohere API - Free Tier: 5 requests/minute
    COHERE: {
        BASE_URL: 'https://api.cohere.ai/v1',
        ENDPOINTS: {
            GENERATE: '/generate',
            EMBED: '/embed',
            CLASSIFY: '/classify'
        },
        FREE_LIMITS: {
            REQUESTS_PER_MINUTE: 5
        }
    },

    // Google Analytics - Free Forever
    GOOGLE_ANALYTICS: {
        TRACKING_ID: 'G-XXXXXXXXXX', // Replace with your GA4 tracking ID
        EVENTS: {
            RESUME_CREATED: 'resume_created',
            AI_SUGGESTION_USED: 'ai_suggestion_used',
            PDF_EXPORTED: 'pdf_exported',
            TEMPLATE_CHANGED: 'template_changed'
        }
    }
};

// API Service Class
class APIService {
    constructor() {
        this.apiKeys = this.loadAPIKeys();
        this.requestCounts = this.initializeRequestCounts();
    }

    // Load API keys from environment or localStorage
    loadAPIKeys() {
        return {
            OPENAI: process.env.OPENAI_API_KEY || localStorage.getItem('openai_api_key'),
            RESUME_PARSER: process.env.RESUME_PARSER_API_KEY || localStorage.getItem('resume_parser_api_key'),
            HUGGING_FACE: process.env.HUGGING_FACE_API_KEY || localStorage.getItem('hugging_face_api_key'),
            COHERE: process.env.COHERE_API_KEY || localStorage.getItem('cohere_api_key')
        };
    }

    // Initialize request counters for rate limiting
    initializeRequestCounts() {
        return {
            openai: { count: 0, lastReset: Date.now() },
            resumeParser: { count: 0, lastReset: Date.now() },
            cohere: { count: 0, lastReset: Date.now() }
        };
    }

    // Check rate limits before making requests
    checkRateLimit(apiName) {
        const counter = this.requestCounts[apiName];
        const now = Date.now();
        
        // Reset counter if minute has passed
        if (now - counter.lastReset > 60000) {
            counter.count = 0;
            counter.lastReset = now;
        }

        const limits = {
            openai: API_CONFIG.OPENAI.FREE_LIMITS.REQUESTS_PER_MINUTE,
            resumeParser: API_CONFIG.RESUME_PARSER.FREE_LIMITS.REQUESTS_PER_MONTH,
            cohere: API_CONFIG.COHERE.FREE_LIMITS.REQUESTS_PER_MINUTE
        };

        if (counter.count >= limits[apiName]) {
            throw new Error(`${apiName} rate limit exceeded. Please wait before making more requests.`);
        }

        counter.count++;
        return true;
    }

    // OpenAI API - Content Suggestions
    async getAIContentSuggestion(text, context = 'resume') {
        try {
            this.checkRateLimit('openai');
            
            const response = await fetch(`${API_CONFIG.OPENAI.BASE_URL}${API_CONFIG.OPENAI.ENDPOINTS.CHAT_COMPLETIONS}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.OPENAI}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: API_CONFIG.OPENAI.MODELS.GPT_3_5_TURBO,
                    messages: [{
                        role: 'system',
                        content: 'You are a professional resume writer. Provide specific, actionable suggestions to improve resume content.'
                    }, {
                        role: 'user',
                        content: `Improve this ${context} content: "${text}". Provide specific suggestions with examples.`
                    }],
                    max_tokens: API_CONFIG.OPENAI.FREE_LIMITS.TOKENS_PER_REQUEST,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;

        } catch (error) {
            console.error('OpenAI API error:', error);
            return this.getFallbackSuggestion(text, context);
        }
    }

    // Resume Parser API - ATS Compatibility
    async checkATSCompatibility(resumeText) {
        try {
            this.checkRateLimit('resumeParser');
            
            const response = await fetch(`${API_CONFIG.RESUME_PARSER.BASE_URL}${API_CONFIG.RESUME_PARSER.ENDPOINTS.PARSE}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.RESUME_PARSER}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resume_text: resumeText,
                    output_format: 'json'
                })
            });

            if (!response.ok) {
                throw new Error(`Resume Parser API error: ${response.status}`);
            }

            const data = await response.json();
            return this.calculateATSScore(data);

        } catch (error) {
            console.error('Resume Parser API error:', error);
            return this.calculateATSScoreLocal(resumeText);
        }
    }

    // Hugging Face API - Text Analysis
    async analyzeTextSentiment(text) {
        try {
            const response = await fetch(`${API_CONFIG.HUGGING_FACE.BASE_URL}/models/${API_CONFIG.HUGGING_FACE.MODELS.SENTIMENT_ANALYSIS}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.HUGGING_FACE}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: text
                })
            });

            if (!response.ok) {
                throw new Error(`Hugging Face API error: ${response.status}`);
            }

            const data = await response.json();
            return data[0];

        } catch (error) {
            console.error('Hugging Face API error:', error);
            return { label: 'neutral', score: 0.5 };
        }
    }

    // Cohere API - Content Generation
    async generateContent(prompt, maxTokens = 100) {
        try {
            this.checkRateLimit('cohere');
            
            const response = await fetch(`${API_CONFIG.COHERE.BASE_URL}${API_CONFIG.COHERE.ENDPOINTS.GENERATE}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.COHERE}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'command',
                    prompt: prompt,
                    max_tokens: maxTokens,
                    temperature: 0.7,
                    k: 0,
                    stop_sequences: [],
                    return_likelihoods: 'NONE'
                })
            });

            if (!response.ok) {
                throw new Error(`Cohere API error: ${response.status}`);
            }

            const data = await response.json();
            return data.generations[0].text;

        } catch (error) {
            console.error('Cohere API error:', error);
            return this.getFallbackContent(prompt);
        }
    }

    // Google Analytics - Event Tracking
    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'resume_builder',
                ...parameters
            });
        }
    }

    // Local fallback methods (when APIs are not available)
    getFallbackSuggestion(text, context) {
        const suggestions = {
            'resume': [
                'Add specific metrics and numbers to quantify your achievements',
                'Use action verbs at the beginning of each bullet point',
                'Include relevant keywords for your target industry',
                'Keep bullet points concise and impactful'
            ],
            'experience': [
                'Start with strong action verbs like "Developed", "Implemented", "Managed"',
                'Include quantifiable results and achievements',
                'Focus on impact and outcomes, not just responsibilities',
                'Use industry-specific terminology'
            ],
            'summary': [
                'Start with your years of experience and key expertise',
                'Mention your most impressive achievements',
                'Include relevant skills and technologies',
                'Keep it concise (2-3 sentences)'
            ]
        };

        const contextSuggestions = suggestions[context] || suggestions['resume'];
        return contextSuggestions[Math.floor(Math.random() * contextSuggestions.length)];
    }

    calculateATSScoreLocal(resumeText) {
        let score = 85; // Base score
        
        // Check for keywords
        const keywords = ['javascript', 'react', 'node.js', 'python', 'sql', 'api', 'development', 'management'];
        const content = resumeText.toLowerCase();
        
        const foundKeywords = keywords.filter(keyword => content.includes(keyword));
        score += foundKeywords.length * 2;
        
        // Check for metrics/numbers
        const hasMetrics = /\d+%|\d+ years|\d+ projects|\d+ users/.test(content);
        if (hasMetrics) score += 5;
        
        // Check for action verbs
        const actionVerbs = ['developed', 'implemented', 'managed', 'created', 'designed', 'optimized'];
        const foundVerbs = actionVerbs.filter(verb => content.includes(verb));
        score += foundVerbs.length * 2;
        
        return Math.min(score, 100);
    }

    getFallbackContent(prompt) {
        const templates = {
            'experience': 'Developed and maintained web applications using modern technologies, resulting in improved user experience and system performance.',
            'achievement': 'Increased team productivity by 25% through implementation of new development processes and tools.',
            'skill': 'Proficient in JavaScript, React, Node.js, and related technologies with 3+ years of experience.'
        };

        for (const [key, template] of Object.entries(templates)) {
            if (prompt.toLowerCase().includes(key)) {
                return template;
            }
        }

        return 'Professional experience with strong technical skills and proven track record of delivering results.';
    }

    // Save API keys to localStorage
    saveAPIKey(service, key) {
        localStorage.setItem(`${service}_api_key`, key);
        this.apiKeys[service.toUpperCase()] = key;
    }

    // Remove API key
    removeAPIKey(service) {
        localStorage.removeItem(`${service}_api_key`);
        delete this.apiKeys[service.toUpperCase()];
    }

    // Get API key status
    getAPIKeyStatus() {
        return {
            openai: !!this.apiKeys.OPENAI,
            resumeParser: !!this.apiKeys.RESUME_PARSER,
            huggingFace: !!this.apiKeys.HUGGING_FACE,
            cohere: !!this.apiKeys.COHERE
        };
    }
}

// Initialize API Service
const apiService = new APIService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIService, API_CONFIG };
} else {
    window.APIService = APIService;
    window.apiService = apiService;
    window.API_CONFIG = API_CONFIG;
} 