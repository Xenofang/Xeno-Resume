import React from 'react';
import ResumeRenderer from './ResumeRenderer';
import { calculateATSScore, getScoreColor, getScoreStatus } from '../../utils/atsScore';

const Preview = React.forwardRef(({ formData, template, accentColor }, ref) => {
  const atsScore = calculateATSScore(formData);

  return (
    <div className="hidden md:flex md:w-[45%] h-screen bg-[#f3f4f6] flex-col sticky top-0 overflow-hidden">
      {/* ATS Score Header */}
      <div className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors duration-500 ${getScoreColor(atsScore)}`}>
            {atsScore}%
          </div>
          <span className="text-sm font-semibold text-gray-700">Your resume score 🧐</span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Status: <span className={atsScore < 40 ? 'text-red-500' : atsScore < 75 ? 'text-orange-500' : 'text-emerald-500'}>{getScoreStatus(atsScore)}</span>
        </div>
      </div>

      {/* Scrollable Paper Container */}
      <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-[#e5e7eb] custom-scrollbar-light">
        <ResumeRenderer 
          ref={ref}
          formData={formData}
          template={template}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
