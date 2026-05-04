import React from 'react';
import { BsX } from 'react-icons/bs';

const EducationSection = ({ 
  education, 
  handleArrayInputChange, 
  addItem, 
  removeItem 
}) => {
  return (
    <div className="pt-4">
      <h3 className="text-xl font-bold text-white mb-4">Education</h3>
      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="p-4 bg-[#262626] border border-white/10 rounded-lg relative shadow-xl">
            <button 
              onClick={() => removeItem('education', idx)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs border border-white/10 px-2 py-1 rounded-md bg-[#1a1a1a]"
            >
              <BsX size={16} /> Remove
            </button>
            
            <div className="mb-4 pt-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">School / University</label>
              <input 
                type="text" 
                value={edu.school}
                onChange={(e) => handleArrayInputChange('education', idx, 'school', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="University of California, Berkeley"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Degree / Field of Study</label>
              <input 
                type="text" 
                value={edu.degree}
                onChange={(e) => handleArrayInputChange('education', idx, 'degree', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="Bachelor of Computer Science"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                <input 
                  type="text" 
                  value={edu.location}
                  onChange={(e) => handleArrayInputChange('education', idx, 'location', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                  placeholder="Berkeley, CA"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Dates</label>
                <input 
                  type="text" 
                  value={edu.dates}
                  onChange={(e) => handleArrayInputChange('education', idx, 'dates', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                  placeholder="2018 - 2022"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description / GPA / Honors</label>
              <textarea 
                rows="3"
                value={edu.description}
                onChange={(e) => handleArrayInputChange('education', idx, 'description', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="Relevant coursework: Data Structures, Algorithms, MERN Stack. Honors: Dean's List."
              />
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => addItem('education', { school: '', degree: '', location: '', dates: '', description: '' })}
          className="w-full py-3 bg-[#1a1a1a] border-2 border-dashed border-white/10 rounded-lg text-gray-500 hover:border-white/20 hover:text-gray-400 transition font-medium min-h-[44px]"
        >
          + Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationSection;
