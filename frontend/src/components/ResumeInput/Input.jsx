import React from 'react';
import DesignSettings from './DesignSettings';
import PersonalDetails from './PersonalDetails';
import ExperienceSection from './ExperienceSection';
import ProjectSection from './ProjectSection';
import SkillsSection from './SkillsSection';
import MiscellaneousSection from './MiscellaneousSection';
import { BsPlusCircle, BsLink45Deg, BsAward, BsPatchCheck } from 'react-icons/bs';
import { calculateATSScore, getScoreColor } from '../../utils/atsScore';

const Input = ({ 
  formData, 
  handleInputChange, 
  handleArrayInputChange, 
  addItem, 
  removeItem, 
  addSkill, 
  removeSkill,
  handleCustomSectionChange,
  addCustomItem,
  removeCustomItem,
  template,
  setTemplate,
  accentColor,
  setAccentColor,
  rawExperience,
  setRawExperience,
  handleEnhanceExperience,
  isEnhancing,
  handleEnhanceSummary,
  isEnhancingSummary
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const atsScore = calculateATSScore(formData);

  const toggleSection = (section, emptyState) => {
    // Only add if not already present or if multiple are allowed (here we just add an item)
    addCustomItem(section, emptyState);
    setShowMenu(false);
  };
  return (
    <div className="w-full h-full overflow-y-auto bg-[#1a1a1a] text-gray-300 custom-scrollbar z-10 relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
      {/* Mobile Sticky ATS Score */}
      <div className="md:hidden sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreColor(atsScore)}`}>
            {atsScore}%
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ATS Score</span>
        </div>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></div>
      </div>

      <div className="p-6 md:p-10">
        <DesignSettings 
          template={template}
          setTemplate={setTemplate}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />

      <PersonalDetails 
        formData={formData}
        handleInputChange={handleInputChange}
        handleEnhanceSummary={handleEnhanceSummary}
        isEnhancingSummary={isEnhancingSummary}
        accentColor={accentColor}
      />

      <ExperienceSection 
        experience={formData.experience}
        handleArrayInputChange={handleArrayInputChange}
        addItem={addItem}
        removeItem={removeItem}
        rawExperience={rawExperience}
        setRawExperience={setRawExperience}
        handleEnhance={handleEnhanceExperience}
        isEnhancing={isEnhancing}
        accentColor={accentColor}
      />

      <ProjectSection 
        projects={formData.projects}
        handleArrayInputChange={handleArrayInputChange}
        addItem={addItem}
        removeItem={removeItem}
      />

      <SkillsSection 
        skills={formData.skills}
        handleArrayInputChange={handleArrayInputChange}
        addItem={addItem}
        removeItem={removeItem}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />

      {formData.customSections.links.length > 0 && (
        <MiscellaneousSection 
          title="Social Links" 
          sectionKey="links" 
          items={formData.customSections.links}
          handleCustomSectionChange={handleCustomSectionChange}
          removeCustomItem={removeCustomItem}
          addCustomItem={addCustomItem}
          type="links"
          accentColor={accentColor}
        />
      )}

      {formData.customSections.certifications.length > 0 && (
        <MiscellaneousSection 
          title="Certifications" 
          sectionKey="certifications" 
          items={formData.customSections.certifications}
          handleCustomSectionChange={handleCustomSectionChange}
          removeCustomItem={removeCustomItem}
          addCustomItem={addCustomItem}
          type="certifications"
          accentColor={accentColor}
        />
      )}

      {formData.customSections.awards.length > 0 && (
        <MiscellaneousSection 
          title="Awards & Achievements" 
          sectionKey="awards" 
          items={formData.customSections.awards}
          handleCustomSectionChange={handleCustomSectionChange}
          removeCustomItem={removeCustomItem}
          addCustomItem={addCustomItem}
          type="awards"
          accentColor={accentColor}
        />
      )}

      <div className="mt-12 mb-20 relative">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all font-bold shadow-lg"
          style={{ borderColor: showMenu ? accentColor : 'rgba(255,255,255,0.1)' }}
        >
          <BsPlusCircle size={18} style={{ color: accentColor }} />
          Add Additional Section
        </button>

        {showMenu && (
          <div className="absolute bottom-full left-0 mb-4 w-64 bg-[#262626] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
            <button 
              onClick={() => toggleSection('links', { platform: '', url: '' })}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white"
            >
              <BsLink45Deg size={18} className="text-blue-400" /> Social Links
            </button>
            <button 
              onClick={() => toggleSection('certifications', { title: '', organization: '', date: '' })}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white"
            >
              <BsPatchCheck size={18} className="text-emerald-400" /> Certifications
            </button>
            <button 
              onClick={() => toggleSection('awards', { title: '', issuer: '', date: '', description: '' })}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white"
            >
              <BsAward size={18} className="text-amber-400" /> Awards & Achievements
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Input;
