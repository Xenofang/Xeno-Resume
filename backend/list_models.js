import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const listModels = async () => {
    const key = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(key);
    try {
        // The SDK doesn't have a direct listModels, but we can try to guess or use the REST API
        // Actually, let's just try 'gemini-pro' as a baseline
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("test");
        console.log("Gemini Pro works!");
        process.exit(0);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

listModels();
