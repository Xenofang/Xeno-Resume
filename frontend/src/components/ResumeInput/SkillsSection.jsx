import React from 'react';
import { BsX } from 'react-icons/bs';

const SkillsSection = ({ skills, handleArrayInputChange, addItem, removeItem, addSkill, removeSkill }) => {
  return (
    <div className="pt-8 pb-20">
      <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
      <div className="space-y-4">
        {skills.map((skillGroup, idx) => (
          <div key={idx} className="p-4 bg-[#262626] border border-white/10 rounded-lg relative shadow-xl">
            <button 
              onClick={() => removeItem('skills', idx)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs border border-white/10 px-2 py-1 rounded-md bg-[#1a1a1a]"
            >
              <BsX size={16} /> Remove
            </button>
            
            <div className="mb-4 pt-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category Name</label>
              <input 
                type="text" 
                value={skillGroup.category}
                onChange={(e) => handleArrayInputChange('skills', idx, 'category', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="e.g. Languages"
              />
            </div>
            
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                id={`skill-input-${idx}`}
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSkill(idx, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.getElementById(`skill-input-${idx}`);
                  addSkill(idx, input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, sIdx) => (
                <span key={sIdx} className="px-3 py-1 bg-[#1a1a1a] text-gray-300 text-xs font-medium rounded-full flex items-center gap-1 border border-white/10">
                  {skill}
                  <button onClick={() => removeSkill(idx, sIdx)} className="text-gray-500 hover:text-red-400">
                    <BsX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => addItem('skills', { category: '', items: [] })}
          className="w-full py-2 bg-[#1a1a1a] border-2 border-dashed border-white/10 rounded-lg text-gray-500 hover:border-white/20 hover:text-gray-400 transition font-medium"
        >
          + Add Skill Category
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;
