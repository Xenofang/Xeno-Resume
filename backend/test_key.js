import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const testKey = async () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error('No API key found in .env');
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(key);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say 'Key is working!'");
        console.log(result.response.text());
        process.exit(0);
    } catch (error) {
        console.error('API Key Test Failed:');
        console.error(error.message);
        process.exit(1);
    }
};

testKey();
