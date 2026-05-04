import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();

// ==========================================
// Security & Utility Middlewares
// ==========================================
// Set security HTTP headers
app.use(helmet());

// Enable CORS (Allow frontend origin)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port
    credentials: true, // Allow cookies to be sent
}));

// Parse incoming JSON payloads
app.use(express.json());

// Parse incoming URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// ==========================================
// Database Connection
// ==========================================
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resume-builder');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// ==========================================
// Routes (Placeholders for MVC)
// ==========================================
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/resume', resumeRoutes);
app.use('/api/v1/chat', chatRoutes);

// Basic health check route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running perfectly.' });
});

// ==========================================
// Global Error Handler Middleware
// ==========================================
app.use((err, req, res, next) => {
    // If error has a status (like from axios or gemini sdk), use it
    let statusCode = err.status || err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    
    // Specifically handle Google API errors which often come back as 429
    if (err.message && err.message.includes('429')) {
        statusCode = 429;
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
        error: process.env.NODE_ENV === 'production' ? {} : err,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});

// ==========================================
// Server Initialization
// ==========================================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
});
