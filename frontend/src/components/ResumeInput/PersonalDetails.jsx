import React from 'react';
import { BsMagic } from 'react-icons/bs';

const PersonalDetails = ({ formData, handleInputChange, handleEnhanceSummary, isEnhancingSummary, accentColor }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Details</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-[#262626] border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-opacity-50 outline-none transition shadow-sm" style={{ '--tw-ring-color': accentColor }} placeholder="e.g. John Doe" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#262626] border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-opacity-50 outline-none transition shadow-sm" style={{ '--tw-ring-color': accentColor }} placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#262626] border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-opacity-50 outline-none transition shadow-sm" style={{ '--tw-ring-color': accentColor }} placeholder="(555) 123-4567" />
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-400">Professional Summary</label>
          <button 
            onClick={handleEnhanceSummary}
            disabled={isEnhancingSummary}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:opacity-80 transition disabled:opacity-50 cursor-pointer"
            style={{ color: accentColor }}
          >
            <BsMagic size={12} />
            {isEnhancingSummary ? 'Enhancing...' : 'AI Enhance'}
          </button>
        </div>
        <textarea rows="3" name="summary" value={formData.summary} onChange={handleInputChange} className="w-full bg-[#262626] border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-opacity-50 outline-none transition shadow-sm" style={{ '--tw-ring-color': accentColor }} placeholder="Brief summary about yourself..."></textarea>
      </div>
    </div>
  );
};

export default PersonalDetails;
