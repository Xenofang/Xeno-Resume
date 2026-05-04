import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ==========================================
// Security & Utility Middlewares
// ==========================================
app.use(helmet({
    contentSecurityPolicy: false, // Required for some React production builds
}));

app.use(cors({
    origin: true, // Allow all in production for now, or use process.env.FRONTEND_URL
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================================
// Routes
// ==========================================
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/resume', resumeRoutes);
app.use('/api/v1/chat', chatRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running perfectly.' });
});

// Serve Static Files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Handle React Routing
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});

// ==========================================
// Server Initialization
// ==========================================
const PORT = process.env.PORT || 8080; // Cloud Run default

const startServer = async () => {
    try {
        // Connect to DB (Optional: don't await here if you want instant start)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Startup Error:', error.message);
        // Start server anyway so Cloud Run doesn't kill it, allowing you to debug
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running in FAILSAFE mode on port ${PORT}`);
        });
    }
};

startServer();
