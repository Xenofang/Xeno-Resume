import React from 'react';
import { BsX, BsMagic } from 'react-icons/bs';

const ExperienceSection = ({ 
  experience, 
  handleArrayInputChange, 
  addItem, 
  removeItem, 
  rawExperience, 
  setRawExperience, 
  handleEnhance, 
  isEnhancing,
  accentColor 
}) => {
  return (
    <div className="pt-4">
      <h3 className="text-xl font-bold text-white mb-4">Experience</h3>
      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={idx} className="p-4 bg-[#262626] border border-white/10 rounded-lg relative shadow-xl">
            <button 
              onClick={() => removeItem('experience', idx)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs border border-white/10 px-2 py-1 rounded-md bg-[#1a1a1a]"
            >
              <BsX size={16} /> Remove
            </button>
            
            <div className="mb-4 pt-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Job Title</label>
              <input 
                type="text" 
                value={exp.jobTitle}
                onChange={(e) => handleArrayInputChange('experience', idx, 'jobTitle', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="Software Engineer"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Company</label>
                <input 
                  type="text" 
                  value={exp.company}
                  onChange={(e) => handleArrayInputChange('experience', idx, 'company', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Dates</label>
                <input 
                  type="text" 
                  value={exp.dates}
                  onChange={(e) => handleArrayInputChange('experience', idx, 'dates', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                  placeholder="2022 - Present"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Bullet points (one per line)</label>
              <textarea 
                rows="4"
                value={exp.description}
                onChange={(e) => handleArrayInputChange('experience', idx, 'description', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="- Built X that improved Y by Z%"
              />
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => addItem('experience', { jobTitle: '', company: '', dates: '', description: '' })}
          className="w-full py-3 bg-[#1a1a1a] border-2 border-dashed border-white/10 rounded-lg text-gray-500 hover:border-white/20 hover:text-gray-400 transition font-medium min-h-[44px]"
        >
          + Add Experience
        </button>
      </div>

      {/* AI Enhancement Section */}
      <div className="mt-8 p-6 bg-[#262626] border border-white/5 rounded-xl shadow-inner">
        <h4 className="text-sm font-bold text-gray-300 mb-2">Raw experience to enhance with AI</h4>
        <textarea 
          rows="4"
          value={rawExperience}
          onChange={(e) => setRawExperience(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:ring-2 focus:ring-white/10 transition mb-4"
          placeholder="e.g. I made the website faster and helped the team"
        />
        <button 
          onClick={handleEnhance}
          disabled={isEnhancing}
          className="w-full py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 border-2 min-h-[44px]"
          style={{ 
            borderColor: accentColor, 
            color: accentColor,
            backgroundColor: `${accentColor}10`,
            backgroundImage: `linear-gradient(to right, ${accentColor}05, ${accentColor}15)`
          }}
        >
          <BsMagic size={16} />
          {isEnhancing ? 'Enhancing with AI...' : 'Enhance with AI'}
        </button>
      </div>
    </div>
  );
};

export default ExperienceSection;
