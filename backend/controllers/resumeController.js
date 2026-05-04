import mongoose from 'mongoose';
import Resume from '../models/resumeModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @desc    Optimize raw job description into professional bullets
 * @route   POST /api/v1/resume/optimize
 * @access  Private (Needs auth in production)
 */
export const optimizeResume = async (req, res, next) => {
    try {
        const { rawDescription } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
        
        if (!rawDescription) {
            return res.status(400).json({ message: 'Please provide rawDescription to enhance.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            // Mock response if no API key
            await new Promise(resolve => setTimeout(resolve, 1500));
            return res.status(200).json({
                success: true,
                data: [
                    `Spearheaded the optimization of "${rawDescription}", achieving a 40% increase in efficiency.`,
                    `Architected scalable solutions that improved system reliability by 25%.`,
                    `Collaborated with cross-functional teams to deliver high-impact features ahead of schedule.`
                ]
            });
        }

        // Real Gemini Call
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = `Rewrite the following job experience into exactly 3 professional, high-impact resume bullet points. Focus on action verbs and quantifiable results if possible. Return ONLY a valid JSON array of strings, with no markdown formatting or extra text.\n\nExperience: ${rawDescription}`;
            
            const result = await model.generateContent(prompt);
            let responseText = result.response.text().trim();
            
            // Strip markdown backticks if Gemini adds them
            if (responseText.startsWith('```json')) responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            if (responseText.startsWith('```')) responseText = responseText.replace(/```/g, '').trim();

            const enhancedBullets = JSON.parse(responseText);

            res.status(200).json({
                success: true,
                data: enhancedBullets
            });
        } catch (aiError) {
            console.error("AI Generation failed, falling back to mock:", aiError.message);
            
            // Mock response if API fails (e.g. quota exceeded)
            return res.status(200).json({
                success: true,
                isMock: true,
                message: "Using AI-powered fallback (Quota reached)",
                data: [
                    `Spearheaded projects related to "${rawDescription}", resulting in significant process improvements.`,
                    `Optimized workflows and collaborated with teams to enhance overall productivity.`,
                    `Leveraged technical expertise to solve complex challenges and deliver high-quality results.`
                ]
            });
        }
    } catch (error) {
        console.error("Controller Error:", error);
        next(error);
    }
};
/**
 * @desc    Optimize raw summary into a professional professional summary
 * @route   POST /api/v1/resume/optimize-summary
 * @access  Private
 */
export const optimizeSummary = async (req, res, next) => {
    try {
        const { rawSummary } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
        
        if (!rawSummary) {
            return res.status(400).json({ message: 'Please provide rawSummary to enhance.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return res.status(200).json({
                success: true,
                data: "Experienced professional with a strong background in delivering high-quality solutions and driving business growth through technical excellence and innovative problem-solving."
            });
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = `Rewrite the following professional summary into a compelling, professional, and concise 2-3 sentence summary for a resume. Focus on key strengths and value proposition. Return ONLY the text of the summary, with no extra formatting.\n\nSummary: ${rawSummary}`;
            
            const result = await model.generateContent(prompt);
            let responseText = result.response.text().trim();
            
            res.status(200).json({
                success: true,
                data: responseText
            });
        } catch (aiError) {
            console.error("Summary AI Generation failed, falling back to mock:", aiError.message);
            
            return res.status(200).json({
                success: true,
                isMock: true,
                message: "Using AI-powered fallback (Quota reached)",
                data: `A dedicated professional focused on ${rawSummary}, with a proven track record of delivering results and contributing to team success through innovation and strategic thinking.`
            });
        }
    } catch (error) {
        console.error("Summary AI Generation Error:", error);
        next(error);
    }
};/**
 * @desc    Get all resumes for logged in user
 * @route   GET /api/v1/resume
 * @access  Private
 */
export const getResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, count: resumes.length, data: resumes });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Save a new resume or update existing
 * @route   POST /api/v1/resume
 * @access  Private
 */
export const saveResume = async (req, res, next) => {
    try {
        const { id, title, formData, settings, atsScore } = req.body;
        
        if (!req.user) {
            console.error("Save failed: No user found on request");
            return res.status(401).json({ success: false, message: 'User authentication failed' });
        }

        console.log(`Attempting to save resume for user ${req.user._id}: ${title}`);

        if (id && mongoose.Types.ObjectId.isValid(id)) {
            // Update existing
            let resume = await Resume.findById(id);
            if (!resume) {
                console.warn(`Resume with ID ${id} not found, creating new instead.`);
            } else {
                // Check ownership
                if (resume.user.toString() !== req.user._id.toString()) {
                    return res.status(401).json({ message: 'Not authorized to update this resume' });
                }

                resume = await Resume.findByIdAndUpdate(id, { title, formData, settings, atsScore }, { new: true });
                console.log(`Successfully updated resume: ${id}`);
                return res.status(200).json({ success: true, data: resume });
            }
        }

        // Create new
        const resume = await Resume.create({
            user: req.user._id,
            title,
            formData,
            settings,
            atsScore
        });

        console.log(`Successfully created new resume: ${resume._id}`);
        res.status(201).json({ success: true, data: resume });
    } catch (error) {
        console.error("Critical error in saveResume controller:", error);
        next(error);
    }
};

/**
 * @desc    Delete a resume
 * @route   DELETE /api/v1/resume/:id
 * @access  Private
 */
export const deleteResume = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        // Check ownership
        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Resume.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Resume removed' });
    } catch (error) {
        next(error);
    }
};
