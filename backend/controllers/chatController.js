import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export const chatWithAI = async (req, res, next) => {
    try {
        const { message, resumeContext, history } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(200).json({ 
                reply: "I'm currently in offline mode. To activate my full potential as your AI Career Coach, please add your Gemini API Key! In the meantime, I recommend using action verbs like 'Spearheaded' or 'Orchestrated' to make your experience pop!" 
            });
        }

        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                ]
            });
            
            // Format history for the prompt
            const historyText = history && history.length > 0 
                ? history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')
                : 'No previous conversation.';

            const systemPrompt = `You are "Antigravity AI", an elite career consultant. 
Your goal is to help the user build a high-impact, ATS-optimized resume. 
BE ACTIONABLE. BE BRIEF.

CURRENT RESUME DATA (JSON):
${JSON.stringify(resumeContext)}

CONVERSATION HISTORY:
${historyText}

USER QUESTION:
"${message}"

Give a 1-3 sentence expert response.`;
            
            const result = await model.generateContent(systemPrompt);
            const response = await result.response;
            const responseText = response.text() || "I've reviewed your request but don't have a specific recommendation right now. Try rephrasing your question!";
            
            res.status(200).json({ reply: responseText.trim() });
        } catch (aiError) {
            console.error("Chat AI Generation failed:", aiError.message);
            
            // Helpful fallback based on user's message
            let fallbackReply = "I'm currently experiencing a high volume of requests (quota reached), but I'm still here to help! ";
            if (message.toLowerCase().includes('skill')) {
                fallbackReply += "Regarding skills, try to group them by category (e.g., 'Technical', 'Soft Skills') to make them more readable for recruiters.";
            } else if (message.toLowerCase().includes('experience')) {
                fallbackReply += "For your experience, remember to focus on achievements rather than just duties. Use numbers whenever possible!";
            } else {
                fallbackReply += "A great tip for any resume is to ensure your most relevant experience is in the top 1/3 of the first page.";
            }

            return res.status(200).json({ 
                reply: fallbackReply,
                isMock: true 
            });
        }
    } catch (error) {
        next(error);
    }
};
