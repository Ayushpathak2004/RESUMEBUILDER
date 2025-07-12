# AI Resume Builder Pro 🚀

A sophisticated resume builder with AI-powered suggestions, real-time analytics, and ATS optimization using **100% free APIs**.

## ✨ Features

### 🤖 AI-Powered Features
- **Smart Content Suggestions**: Get AI-powered recommendations for improving your resume
- **ATS Compatibility Checker**: Real-time scoring for Applicant Tracking System compatibility
- **Keyword Optimization**: Automatic suggestions for relevant keywords
- **Readability Analysis**: Advanced text analysis for better readability


### 🎨 Professional Templates
- **Modern Design**: Clean and professional layouts
- **Creative Options**: Stand out from the crowd
- **Minimal Style**: Simple and elegant designs
- **Customizable**: Easy to modify and extend

### 📤 Export Options
- **PDF Export**: High-quality PDF generation
- **Multiple Formats**: Support for various export formats
- **Print-Ready**: Optimized for printing

## 🛠️ Free API Integrations

### 1. AI Content Suggestions
```javascript
// Using OpenAI API (Free Tier)
const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: `Improve this resume bullet point: "${bulletPoint}"`
        }],
        max_tokens: 100
    })
});
```

### 2. ATS Compatibility Check
```javascript
// Using Resume Parser API (Free Tier)
const atsResponse = await fetch('https://api.resumeparser.com/parse', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${RESUME_PARSER_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        resume_text: resumeContent,
        output_format: 'json'
    })
});
```

### 3. Analytics & Tracking
```javascript
// Using Google Analytics (Free)
gtag('event', 'resume_created', {
    'event_category': 'resume_builder',
    'event_label': 'ai_suggestions_used'
});
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Basic knowledge of HTML, CSS, JavaScript
- Free API keys (optional for enhanced features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

2. **Open the project**
```bash
# Simply open index.html in your browser
# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

3. **Configure API Keys (Optional)**
```javascript
// In script.js, add your API keys
const API_KEYS = {
    OPENAI: 'your-openai-api-key',
    RESUME_PARSER: 'your-resume-parser-api-key',
    GOOGLE_ANALYTICS: 'your-ga-tracking-id'
};
```

## 📋 Free API Setup Guide

### 1. OpenAI API (Free Tier)
- Visit [OpenAI Platform](https://platform.openai.com/)
- Create an account and get your API key
- Free tier: 3 requests/minute
- Perfect for content suggestions

### 2. Resume Parser API
- Visit [Resume Parser](https://resumeparser.com/)
- Sign up for free tier
- Free tier: 5 requests/month
- Great for ATS compatibility checking

### 3. Google Analytics
- Visit [Google Analytics](https://analytics.google.com/)
- Create a new property
- Get your tracking ID
- Free forever

### 4. Alternative Free APIs
- **Hugging Face Inference API**: For text analysis
- **Cohere API**: For content generation
- **Affinda Resume Parser**: For resume parsing

## 🎯 How to Use

### 1. Personal Information
- Fill in your basic details
- Write a compelling professional summary
- AI will suggest improvements in real-time

### 2. Work Experience
- Click "Add Experience" to add new entries
- Include specific metrics and achievements
- AI will suggest better ways to phrase your experience

### 3. Education
- Add your educational background
- Include relevant coursework and projects
- GPA is optional but recommended

### 4. Skills
- List technical and soft skills
- AI will suggest relevant keywords
- Skills are automatically optimized for ATS

### 5. Export
- Click "Export PDF" to download your resume
- Preview before exporting
- Multiple format support

## 🔧 Customization

### Adding New Templates
```javascript
// In script.js, add new template
const newTemplate = {
    id: 'custom',
    name: 'Custom Template',
    description: 'Your custom design'
};

// Add to templates array
templates.push(newTemplate);
```

### Custom AI Suggestions
```javascript
// Add custom AI logic
async function customAISuggestion(text) {
    // Your custom AI logic here
    return suggestion;
}
```

### Styling Customization
```css
/* In your CSS file */
.resume-template-custom {
    /* Your custom styles */
}
```

## 📊 Analytics Dashboard

The project includes a comprehensive analytics dashboard that tracks:

- **ATS Compatibility**: How well your resume performs with ATS systems
- **Readability Score**: How easy your resume is to read
- **Impact Score**: How effective your content is
- **Keyword Density**: Optimization of relevant keywords
- **Real-time Updates**: Live feedback as you type

## 🎨 Design Features

### Modern UI/UX
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Professional transitions
- **Accessibility**: WCAG compliant

### Professional Templates
- **Clean Layouts**: Easy to read and scan
- **ATS Optimized**: Compatible with tracking systems
- **Print Ready**: Perfect for physical copies
- **Customizable**: Easy to modify

## 🔒 Privacy & Security

- **No Data Storage**: All data stays in your browser
- **Local Processing**: AI features work locally when possible
- **Secure APIs**: Only uses HTTPS connections
- **No Tracking**: Respects user privacy


## 🙏 Acknowledgments

- **OpenAI** for AI capabilities
- **Tailwind CSS** for styling
- **Feather Icons** for beautiful icons
- **jsPDF** for PDF generation



*Perfect for your portfolio and resume!* 
