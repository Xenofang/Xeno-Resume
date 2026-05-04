import React from 'react';
import { BsRobot, BsX, BsSend } from 'react-icons/bs';

const Chatbot = ({ 
  isChatOpen, 
  setIsChatOpen, 
  chatMessage, 
  setChatMessage, 
  chatHistory, 
  isChatLoading, 
  handleSendMessage,
  accentColor 
}) => {
  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      {isChatOpen && (
        <div className="mb-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transform origin-bottom-right transition-all duration-300">
          <div style={{ backgroundColor: accentColor }} className="text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BsRobot size={20} />
              <h3 className="font-semibold text-sm">Career AI Coach</h3>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:text-gray-200 transition">
              <BsX size={24} />
            </button>
          </div>

          <div className="h-64 p-4 overflow-y-auto bg-gray-50 space-y-3 custom-scrollbar flex flex-col">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'text-white self-end rounded-br-none shadow-sm' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm'}`} 
                style={msg.role === 'user' ? { backgroundColor: accentColor } : {}}
              >
                {msg.text}
              </div>
            ))}
            {isChatLoading && (
              <div className="bg-white border border-gray-200 text-gray-500 p-3 rounded-lg text-sm self-start rounded-bl-none shadow-sm flex space-x-1">
                <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask for resume advice..." 
              className="flex-1 text-sm outline-none px-2"
            />
            <button type="submit" disabled={isChatLoading || !chatMessage.trim()} style={{ color: accentColor }} className="hover:opacity-80 disabled:text-gray-400 p-1 transition">
              <BsSend size={18} />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{ backgroundColor: isChatOpen ? '#1F2937' : accentColor }}
        className="text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer"
      >
        {isChatOpen ? <BsX size={26} /> : <BsRobot size={26} />}
      </button>
    </div>
  );
};

export default Chatbot;
