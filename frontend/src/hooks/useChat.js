import { useState } from 'react';
import axios from 'axios';

export const useChat = (formData) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hi! I'm your AI Career Coach. Need help tailoring your resume?" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setChatMessage('');
    setIsChatLoading(true);

    try {
      const response = await axios.post('/api/v1/chat', {
        message: userText,
        resumeContext: formData,
        history: chatHistory.slice(1) // Send history excluding the first greeting
      });
      
      setChatHistory(prev => [...prev, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      console.error("Chat error", error);
      setChatHistory(prev => [...prev, { role: 'ai', text: "Oops, I'm having trouble connecting to my server right now!" }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return {
    isChatOpen,
    setIsChatOpen,
    chatMessage,
    setChatMessage,
    chatHistory,
    isChatLoading,
    handleSendMessage
  };
};
