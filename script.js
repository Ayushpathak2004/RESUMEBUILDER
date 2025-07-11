// Resume Builder Application
class ResumeBuilder {
    constructor() {
        this.resumeData = {
            personal: {
                name: '',
                email: '',
                phone: '',
                location: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: {
                technical: '',
                soft: ''
            }
        };
        
        this.currentTemplate = 'modern';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTemplates();
        this.updatePreview();
        this.initializeAI();
        feather.replace();
    }

    setupEventListeners() {
        // Personal information inputs
        document.getElementById('fullName').addEventListener('input', (e) => {
            this.resumeData.personal.name = e.target.value;
            this.updatePreview();
            this.analyzeResume();
        });

        document.getElementById('email').addEventListener('input', (e) => {
            this.resumeData.personal.email = e.target.value;
            this.updatePreview();
        });

        document.getElementById('phone').addEventListener('input', (e) => {
            this.resumeData.personal.phone = e.target.value;
            this.updatePreview();
        });

        document.getElementById('location').addEventListener('input', (e) => {
            this.resumeData.personal.location = e.target.value;
            this.updatePreview();
        });

        document.getElementById('summary').addEventListener('input', (e) => {
            this.resumeData.personal.summary = e.target.value;
            this.updatePreview();
            this.analyzeResume();
        });

        // Skills inputs
        document.getElementById('technicalSkills').addEventListener('input', (e) => {
            this.resumeData.skills.technical = e.target.value;
            this.updatePreview();
            this.analyzeResume();
        });

        document.getElementById('softSkills').addEventListener('input', (e) => {
            this.resumeData.skills.soft = e.target.value;
            this.updatePreview();
            this.analyzeResume();
        });

        // Buttons
        document.getElementById('addExperience').addEventListener('click', () => {
            this.addExperienceItem();
        });

        document.getElementById('addEducation').addEventListener('click', () => {
            this.addEducationItem();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportToPDF();
        });

        document.getElementById('previewBtn').addEventListener('click', () => {
            this.togglePreview();
        });
    }

    // AI Integration with Free APIs
    async initializeAI() {
        // Simulate AI analysis with free API calls
        this.startAIAnalysis();
    }

    async startAIAnalysis() {
        // Using free APIs for AI features
        try {
            // Simulate AI content suggestions
            await this.generateAISuggestions();
            
            // Simulate ATS compatibility check
            await this.checkATSCompatibility();
            
            // Update analytics
            this.updateAnalytics();
            
        } catch (error) {
            console.log('AI features using simulated data for demo');
        }
    }

    async generateAISuggestions() {
        // Simulate AI suggestions using free APIs
        const suggestions = [
            {
                type: 'improvement',
                message: 'Add specific metrics to your experience. Instead of "Increased sales", try "Increased sales by 25% in Q3 2023"',
                priority: 'high'
            },
            {
                type: 'keyword',
                message: 'Include relevant keywords: "React", "JavaScript", "API", "Node.js"',
                priority: 'medium'
            },
            {
                type: 'format',
                message: 'Use bullet points for better readability and ATS compatibility',
                priority: 'low'
            }
        ];

        this.updateAISuggestions(suggestions);
    }

    async checkATSCompatibility() {
        // Simulate ATS compatibility check
        const atsScore = this.calculateATSScore();
        this.updateATSScore(atsScore);
    }

    calculateATSScore() {
        let score = 85; // Base score
        
        // Check for keywords
        const keywords = ['javascript', 'react', 'node.js', 'python', 'sql', 'api'];
        const content = this.resumeData.personal.summary.toLowerCase() + 
                       this.resumeData.skills.technical.toLowerCase();
        
        const foundKeywords = keywords.filter(keyword => content.includes(keyword));
        score += foundKeywords.length * 2;
        
        // Check for metrics/numbers
        const hasMetrics = /\d+%|\d+ years|\d+ projects/.test(content);
        if (hasMetrics) score += 5;
        
        return Math.min(score, 100);
    }

    updateAISuggestions(suggestions) {
        const container = document.getElementById('aiSuggestions');
        container.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = `p-3 bg-${this.getSuggestionColor(suggestion.type)}-50 rounded-lg border-l-4 border-${this.getSuggestionColor(suggestion.type)}-400`;
            div.innerHTML = `
                <p class="text-sm text-${this.getSuggestionColor(suggestion.type)}-800">
                    <strong>${this.getSuggestionIcon(suggestion.type)} ${suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}:</strong> ${suggestion.message}
                </p>
            `;
            container.appendChild(div);
        });
    }

    getSuggestionColor(type) {
        const colors = {
            'improvement': 'blue',
            'keyword': 'green',
            'format': 'yellow'
        };
        return colors[type] || 'blue';
    }

    getSuggestionIcon(type) {
        const icons = {
            'improvement': '💡',
            'keyword': '🎯',
            'format': '📝'
        };
        return icons[type] || '💡';
    }

    updateATSScore(score) {
        const atsElement = document.querySelector('.bg-blue-50 .text-blue-600');
        if (atsElement) {
            atsElement.textContent = `${score}%`;
        }
    }

    updateAnalytics() {
        // Update analytics based on resume content
        const readability = this.calculateReadability();
        const impact = this.calculateImpactScore();
        
        // Update readability score
        const readabilityElement = document.querySelector('.bg-green-50 .text-green-600');
        if (readabilityElement) {
            readabilityElement.textContent = `${readability}%`;
        }
        
        // Update impact score
        const impactElement = document.querySelector('.bg-purple-50 .text-purple-600');
        if (impactElement) {
            impactElement.textContent = `${impact}%`;
        }
    }

    calculateReadability() {
        // Simple readability calculation
        const content = this.resumeData.personal.summary;
        if (!content) return 92;
        
        const words = content.split(' ').length;
        const sentences = content.split(/[.!?]+/).length;
        const avgWordsPerSentence = words / sentences;
        
        // Flesch Reading Ease approximation
        let score = 100;
        if (avgWordsPerSentence > 20) score -= 10;
        if (avgWordsPerSentence > 25) score -= 10;
        
        return Math.max(score, 70);
    }

    calculateImpactScore() {
        let score = 78;
        
        // Check for action verbs
        const actionVerbs = ['developed', 'implemented', 'managed', 'created', 'designed', 'optimized'];
        const content = this.resumeData.personal.summary.toLowerCase();
        
        const foundVerbs = actionVerbs.filter(verb => content.includes(verb));
        score += foundVerbs.length * 3;
        
        // Check for quantifiable achievements
        const hasNumbers = /\d+/.test(content);
        if (hasNumbers) score += 5;
        
        return Math.min(score, 100);
    }

    analyzeResume() {
        // Trigger analysis when content changes
        setTimeout(() => {
            this.startAIAnalysis();
        }, 1000);
    }

    // Experience Management
    addExperienceItem() {
        const experienceId = Date.now();
        const experienceItem = {
            id: experienceId,
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };

        this.resumeData.experience.push(experienceItem);
        this.renderExperienceItem(experienceItem);
        this.updatePreview();
    }

    renderExperienceItem(experience) {
        const container = document.getElementById('experienceList');
        const div = document.createElement('div');
        div.className = 'bg-gray-50 rounded-lg p-4 border';
        div.id = `experience-${experience.id}`;
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h4 class="font-medium text-gray-900">Experience ${this.resumeData.experience.length}</h4>
                <button onclick="resumeBuilder.removeExperience(${experience.id})" class="text-red-500 hover:text-red-700">
                    <i data-feather="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="Software Engineer" 
                           oninput="resumeBuilder.updateExperience(${experience.id}, 'title', this.value)">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="Tech Corp" 
                           oninput="resumeBuilder.updateExperience(${experience.id}, 'company', this.value)">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="San Francisco, CA" 
                           oninput="resumeBuilder.updateExperience(${experience.id}, 'location', this.value)">
                </div>
                <div class="flex space-x-2">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input type="month" max="2035-12" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                               oninput="resumeBuilder.updateExperience(${experience.id}, 'startDate', this.value)">
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input type="month" max="2035-12" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                               oninput="resumeBuilder.updateExperience(${experience.id}, 'endDate', this.value)">
                    </div>
                </div>
            </div>
            <div class="flex items-center mb-3">
                <input type="checkbox" id="current-${experience.id}" class="mr-2" 
                       onchange="resumeBuilder.updateExperience(${experience.id}, 'current', this.checked)">
                <label for="current-${experience.id}" class="text-sm text-gray-700">Currently working here</label>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          placeholder="Describe your responsibilities and achievements..." 
                          oninput="resumeBuilder.updateExperience(${experience.id}, 'description', this.value)"></textarea>
            </div>
        `;
        
        container.appendChild(div);
        feather.replace();
    }

    updateExperience(id, field, value) {
        const experience = this.resumeData.experience.find(exp => exp.id === id);
        if (experience) {
            experience[field] = value;
            this.updatePreview();
            this.analyzeResume();
        }
    }

    removeExperience(id) {
        this.resumeData.experience = this.resumeData.experience.filter(exp => exp.id !== id);
        const element = document.getElementById(`experience-${id}`);
        if (element) {
            element.remove();
        }
        this.updatePreview();
    }

    // Education Management
    addEducationItem() {
        const educationId = Date.now();
        const educationItem = {
            id: educationId,
            degree: '',
            school: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: '',
            description: ''
        };

        this.resumeData.education.push(educationItem);
        this.renderEducationItem(educationItem);
        this.updatePreview();
    }

    renderEducationItem(education) {
        const container = document.getElementById('educationList');
        const div = document.createElement('div');
        div.className = 'bg-gray-50 rounded-lg p-4 border';
        div.id = `education-${education.id}`;
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h4 class="font-medium text-gray-900">Education ${this.resumeData.education.length}</h4>
                <button onclick="resumeBuilder.removeEducation(${education.id})" class="text-red-500 hover:text-red-700">
                    <i data-feather="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="Bachelor of Science in Computer Science" 
                           oninput="resumeBuilder.updateEducation(${education.id}, 'degree', this.value)">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="University of California" 
                           oninput="resumeBuilder.updateEducation(${education.id}, 'school', this.value)">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="Berkeley, CA" 
                           oninput="resumeBuilder.updateEducation(${education.id}, 'location', this.value)">
                </div>
                <div class="flex space-x-2">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input type="month" max="2035-12" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                               oninput="resumeBuilder.updateEducation(${education.id}, 'startDate', this.value)">
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input type="month" max="2035-12" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                               oninput="resumeBuilder.updateEducation(${education.id}, 'endDate', this.value)">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                           placeholder="3.8/4.0" 
                           oninput="resumeBuilder.updateEducation(${education.id}, 'gpa', this.value)">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          placeholder="Relevant coursework, projects, achievements..." 
                          oninput="resumeBuilder.updateEducation(${education.id}, 'description', this.value)"></textarea>
            </div>
        `;
        
        container.appendChild(div);
        feather.replace();
    }

    updateEducation(id, field, value) {
        const education = this.resumeData.education.find(edu => edu.id === id);
        if (education) {
            education[field] = value;
            this.updatePreview();
        }
    }

    removeEducation(id) {
        this.resumeData.education = this.resumeData.education.filter(edu => edu.id !== id);
        const element = document.getElementById(`education-${id}`);
        if (element) {
            element.remove();
        }
        this.updatePreview();
    }

    // Preview Management
    updatePreview() {
        const previewContainer = document.getElementById('resumePreview');
        previewContainer.innerHTML = this.generateResumeHTML();
    }

    generateResumeHTML() {
        const { personal, experience, education, skills } = this.resumeData;
        
        return `
            <div class="bg-white p-6 max-w-4xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">${personal.name || 'Your Name'}</h1>
                    <div class="text-gray-600 space-y-1">
                        ${personal.email ? `<div>${personal.email}</div>` : ''}
                        ${personal.phone ? `<div>${personal.phone}</div>` : ''}
                        ${personal.location ? `<div>${personal.location}</div>` : ''}
                    </div>
                </div>

                <!-- Summary -->
                ${personal.summary ? `
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">Professional Summary</h2>
                        <p class="text-gray-700 leading-relaxed">${personal.summary}</p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${experience.length > 0 ? `
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">Work Experience</h2>
                        ${experience.map(exp => `
                            <div class="mb-4">
                                <div class="flex justify-between items-start mb-1">
                                    <h3 class="font-semibold text-gray-900">${exp.title || 'Job Title'}</h3>
                                    <span class="text-sm text-gray-600">
                                        ${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - 
                                        ${exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                                    </span>
                                </div>
                                <div class="text-gray-600 mb-2">
                                    ${exp.company || 'Company'}${exp.location ? `, ${exp.location}` : ''}
                                </div>
                                ${exp.description ? `<p class="text-gray-700 text-sm">${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Education -->
                ${education.length > 0 ? `
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">Education</h2>
                        ${education.map(edu => `
                            <div class="mb-4">
                                <div class="flex justify-between items-start mb-1">
                                    <h3 class="font-semibold text-gray-900">${edu.degree || 'Degree'}</h3>
                                    <span class="text-sm text-gray-600">
                                        ${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - 
                                        ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                                    </span>
                                </div>
                                <div class="text-gray-600 mb-2">
                                    ${edu.school || 'School'}${edu.location ? `, ${edu.location}` : ''}
                                    ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                                </div>
                                ${edu.description ? `<p class="text-gray-700 text-sm">${edu.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Skills -->
                ${(skills.technical || skills.soft) ? `
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">Skills</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${skills.technical ? `
                                <div>
                                    <h3 class="font-medium text-gray-900 mb-2">Technical Skills</h3>
                                    <p class="text-gray-700 text-sm">${skills.technical}</p>
                                </div>
                            ` : ''}
                            ${skills.soft ? `
                                <div>
                                    <h3 class="font-medium text-gray-900 mb-2">Soft Skills</h3>
                                    <p class="text-gray-700 text-sm">${skills.soft}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Export Functionality
    async exportToPDF() {
        try {
            // Use html2pdf.js to export the styled resume preview
            const element = document.getElementById('resumePreview');
            const opt = {
                margin:       0.5,
                filename:     'resume.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            await html2pdf().set(opt).from(element).save();
            this.showNotification('PDF exported successfully!', 'success');
        } catch (error) {
            console.error('PDF export failed:', error);
            this.showNotification('PDF export failed. Please try again.', 'error');
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    togglePreview() {
        const previewContainer = document.getElementById('resumePreview');
        previewContainer.classList.toggle('hidden');
    }

    loadTemplates() {
        // Template loading functionality
        const templates = [
            { id: 'modern', name: 'Modern', description: 'Clean and professional' },
            { id: 'creative', name: 'Creative', description: 'Stand out from the crowd' },
            { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' }
        ];

        const templateGrid = document.getElementById('templateGrid');
        if (templateGrid) {
            templateGrid.innerHTML = templates.map(template => `
                <div class="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors" 
                     onclick="resumeBuilder.selectTemplate('${template.id}')">
                    <h4 class="font-semibold text-gray-900">${template.name}</h4>
                    <p class="text-sm text-gray-600">${template.description}</p>
                </div>
            `).join('');
        }
    }

    selectTemplate(templateId) {
        this.currentTemplate = templateId;
        this.updatePreview();
        this.showNotification(`Template changed to ${templateId}`, 'success');
    }
}

// Initialize the application
const resumeBuilder = new ResumeBuilder();

// Additional utility functions for free API integrations
class FreeAPIService {
    static async getAISuggestions(text) {
        // Simulate AI suggestions using free APIs
        // In a real implementation, you could use:
        // - OpenAI API (free tier)
        // - Hugging Face Inference API
        // - Cohere API (free tier)
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    'Add specific metrics to quantify your achievements',
                    'Use action verbs to start each bullet point',
                    'Include relevant keywords for ATS optimization'
                ]);
            }, 1000);
        });
    }

    static async checkATSCompatibility(resumeText) {
        // Simulate ATS compatibility check
        // In a real implementation, you could use:
        // - Resume Parser API
        // - Affinda Resume Parser
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const score = Math.floor(Math.random() * 20) + 80; // 80-100
                resolve(score);
            }, 500);
        });
    }

    static async generateContentSuggestion(prompt) {
        // Simulate content generation
        // In a real implementation, you could use OpenAI API free tier
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Developed and maintained web applications using React and Node.js, resulting in 25% improvement in user engagement.');
            }, 2000);
        });
    }
}

// Export for global access
window.ResumeBuilder = ResumeBuilder;
window.FreeAPIService = FreeAPIService; 