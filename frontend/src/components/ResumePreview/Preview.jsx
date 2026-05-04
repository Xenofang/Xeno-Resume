import React from 'react';
import ResumeRenderer from './ResumeRenderer';
import { calculateATSScore, getScoreColor, getScoreStatus } from '../../utils/atsScore';

const Preview = React.forwardRef(({ formData, template, accentColor, isMobileModal = false }, ref) => {
  const atsScore = calculateATSScore(formData);

  return (
    <div className={`${isMobileModal ? 'flex w-full' : 'hidden md:flex md:w-full'} h-full bg-[#f3f4f6] flex-col sticky top-0 overflow-hidden`}>
      {/* ATS Score Header - Sticky Bar on Mobile */}
      <div className={`h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-20 ${isMobileModal ? 'sticky top-0' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors duration-500 ${getScoreColor(atsScore)}`}>
            {atsScore}%
          </div>
          <span className="text-sm font-semibold text-gray-700">Resume Score 🧐</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Status: <span className={atsScore < 40 ? 'text-red-500' : atsScore < 75 ? 'text-orange-500' : 'text-emerald-500'}>{getScoreStatus(atsScore)}</span>
          </div>
          {isMobileModal && (
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></div>
          )}
        </div>
      </div>

      {/* Scrollable Paper Container with Scaling */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 flex justify-center bg-[#e5e7eb] custom-scrollbar-light overflow-x-hidden">
        <div className="w-full flex justify-center origin-top transform scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 transition-transform duration-300">
          <ResumeRenderer 
            ref={ref}
            formData={formData}
            template={template}
            accentColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
