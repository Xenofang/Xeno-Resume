# Xeno-Resume AI Builder with Antigravity 🌌

**Live Demo:** [https://xeno-resume-892626183489.us-central1.run.app](https://xeno-resume-892626183489.us-central1.run.app)

Xeno-Resume is a cutting-edge, high-performance AI Resume Builder designed to help professionals create ATS-optimized resumes with a premium, "Antigravity" aesthetic. Built on the MERN stack and powered by Google Gemini AI, it offers real-time feedback, smart content enhancement, and seamless PDF exports.

![Antigravity UI](https://img.shields.io/badge/Design-Futuristic-blueviolet)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![AI Powered](https://img.shields.io/badge/AI-Gemini_2.5-orange)

## ✨ Core Features

- **🤖 AI Career Coach**: A real-time chatbot that provides actionable resume advice and strategy based on your current data.
- **⚡ AI Bullet Point Optimizer**: Transform simple job descriptions into high-impact, professional bullet points using Google Gemini.
- **📊 Real-time ATS Scoring**: Get instant feedback on your resume's searchability and professional impact as you type.
- **📂 Saved Masterpieces**: Fully authenticated dashboard to save, edit, and manage multiple resume versions.
- **🎨 Design Systems**: Swap between "Modern", "Professional", and "Elegant" templates with dynamic accent color customization.
- **📄 Pro PDF Export**: High-resolution, print-optimized PDF generation that preserves the "Antigravity" layout.

## 🛠️ Technology Stack

### Frontend
- **React 19** + **Vite** (Ultra-fast HMR)
- **Vanilla CSS** (Premium glassmorphism & futuristic themes)
- **React Router 7** (Secure navigation)
- **Axios** (API communication)
- **React Hot Toast** (Polished UI notifications)

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Scalable document storage)
- **JWT** (Secure, token-based authentication)
- **Google Generative AI** (Gemini 2.5/3.1 Flash integration)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or Local)
- Google AI Studio API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Xenofang/Xeno-Resume.git
   cd Xeno-Resume
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `/backend` directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_google_ai_key
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🛡️ Security
- **Helmet**: Secure HTTP headers.
- **CORS**: Restricted access to trusted origins.
- **Environment Isolation**: Sensitive keys are never committed to version control.
- **Protected Routes**: Ensuring your private resumes stay private.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

---
*Created with 💜 by Xenofang*