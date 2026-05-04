import React from 'react';
import { BsX, BsPlus, BsLink45Deg, BsAward, BsPatchCheck } from 'react-icons/bs';

const MiscellaneousSection = ({ 
  title, 
  sectionKey, 
  items, 
  handleCustomSectionChange, 
  removeCustomItem,
  addCustomItem,
  type,
  accentColor
}) => {
  const getIcon = () => {
    switch(type) {
      case 'links': return <BsLink45Deg size={20} />;
      case 'awards': return <BsAward size={20} />;
      case 'certifications': return <BsPatchCheck size={20} />;
      default: return null;
    }
  };

  const getEmptyState = () => {
    switch(type) {
      case 'links': return { platform: '', url: '' };
      case 'awards': return { title: '', issuer: '', date: '', description: '' };
      case 'certifications': return { title: '', organization: '', date: '' };
      default: return {};
    }
  };

  return (
    <div className="pt-8 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-white/5 text-gray-400">
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="p-5 bg-[#262626] border border-white/10 rounded-xl relative shadow-2xl transition-all hover:border-white/20 group">
            <button 
              onClick={() => removeCustomItem(sectionKey, idx)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs border border-white/10 px-2 py-1 rounded-md bg-[#1a1a1a] opacity-100 md:opacity-0 md:group-hover:opacity-100 min-h-[32px]"
            >
              <BsX size={16} /> Remove
            </button>

            {type === 'links' && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center pt-2">
                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-full px-4 py-3 sm:py-2 group-hover:border-white/30 transition-all">
                  <div className="flex items-center gap-2">
                    <BsLink45Deg className="text-gray-500" />
                    <input 
                      type="text" 
                      value={item.platform}
                      onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'platform', e.target.value)}
                      className="bg-transparent border-none text-white text-xs font-bold outline-none w-24 placeholder:text-gray-700"
                      placeholder="Platform"
                    />
                  </div>
                  <span className="hidden sm:inline text-gray-800 text-xs">|</span>
                  <input 
                    type="text" 
                    value={item.url}
                    onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'url', e.target.value)}
                    className="bg-transparent border-none text-white text-xs outline-none w-full sm:w-48 placeholder:text-gray-700 mt-2 sm:mt-0"
                    placeholder="URL (e.g. linkedin.com/in/...)"
                  />
                </div>
              </div>
            )}

            {type === 'certifications' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Certification Title</label>
                  <input 
                    type="text" 
                    value={item.title}
                    onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'title', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all"
                    placeholder="AWS Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Organization</label>
                  <input 
                    type="text" 
                    value={item.organization}
                    onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'organization', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all"
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Year</label>
                  <input 
                    type="text" 
                    value={item.date}
                    onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'date', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all"
                    placeholder="2024"
                  />
                </div>
              </div>
            )}

            {type === 'awards' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Award Title</label>
                    <input 
                      type="text" 
                      value={item.title}
                      onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'title', e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all"
                      placeholder="Best Developer"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Issuer</label>
                    <input 
                      type="text" 
                      value={item.issuer}
                      onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'issuer', e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all"
                      placeholder="Google Inc."
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Date</label>
                    <input 
                      type="text" 
                      value={item.date}
                      onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'date', e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all"
                      placeholder="March 2024"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Impact / Description (Bullet points)</label>
                  <textarea 
                    value={item.description}
                    onChange={(e) => handleCustomSectionChange(sectionKey, idx, 'description', e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30 transition-all resize-none font-mono"
                    placeholder="• Reduced system latency by 20%..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <button 
          onClick={() => addCustomItem(sectionKey, getEmptyState())}
          className="w-full py-3 bg-[#1a1a1a] border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:border-white/20 hover:text-gray-400 hover:bg-white/[0.02] transition-all font-bold text-sm flex items-center justify-center gap-2 group"
        >
          <BsPlus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Add {title.slice(0, -1)}
        </button>
      </div>
    </div>
  );
};

export default MiscellaneousSection;
