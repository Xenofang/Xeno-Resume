import React from 'react';
import { BsPaletteFill } from 'react-icons/bs';
import { COLOR_PALETTE, TEMPLATES } from '../../constants/defaults';

const DesignSettings = ({ template, setTemplate, accentColor, setAccentColor }) => {
  return (
    <div className="mb-10 p-6 bg-[#262626] border border-white/5 rounded-xl shadow-xl">
      <div className="flex items-center gap-2 mb-5">
        <BsPaletteFill className="text-gray-400" />
        <h3 className="text-lg font-semibold text-white">Design Settings</h3>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Template Style</label>
        <div className="grid grid-cols-3 gap-3">
          {TEMPLATES.map(t => (
            <button 
              key={t}
              onClick={() => setTemplate(t)}
              className={`py-2 px-3 border rounded-lg text-sm capitalize font-medium transition-all ${template === t ? 'border-white bg-white text-black shadow-md' : 'border-white/10 bg-[#1a1a1a] hover:bg-[#333] text-gray-400'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Accent Color</label>
        <div className="flex flex-wrap gap-4">
          {COLOR_PALETTE.map(color => (
            <button 
              key={color}
              onClick={() => setAccentColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 ${accentColor === color ? 'border-white scale-125 shadow-md' : 'border-transparent hover:scale-110 shadow-sm'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignSettings;
