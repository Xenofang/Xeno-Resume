import { useState, useEffect } from 'react';
import { DEFAULT_FORM_DATA } from '../constants/defaults';
import { useAuth } from './useAuth';

export const useResumeForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [template, setTemplate] = useState(() => localStorage.getItem('resumeTemplate') || 'modern');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('resumeAccentColor') || '#3B82F6');

  // Persistence for UI settings
  useEffect(() => {
    localStorage.setItem('resumeTemplate', template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem('resumeAccentColor', accentColor);
  }, [accentColor]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayInputChange = (section, index, field, value) => {
    const updatedSection = formData[section].map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addItem = (section, emptyState) => {
    setFormData({ ...formData, [section]: [...formData[section], { ...emptyState }] });
  };

  const removeItem = (section, index) => {
    setFormData({ ...formData, [section]: formData[section].filter((_, i) => i !== index) });
  };

  const addSkill = (categoryIndex, skill) => {
    if (!skill.trim()) return;
    const updatedSkills = formData.skills.map((group, i) => 
      i === categoryIndex ? { ...group, items: [...group.items, skill] } : group
    );
    setFormData({ ...formData, skills: updatedSkills });
  };

  const removeSkill = (categoryIndex, skillIndex) => {
    const updatedSkills = formData.skills.map((group, i) => 
      i === categoryIndex 
        ? { ...group, items: group.items.filter((_, si) => si !== skillIndex) } 
        : group
    );
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleCustomSectionChange = (section, index, field, value) => {
    const updatedSection = formData.customSections[section].map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({
      ...formData,
      customSections: {
        ...formData.customSections,
        [section]: updatedSection
      }
    });
  };

  const addCustomItem = (section, emptyState) => {
    setFormData({
      ...formData,
      customSections: {
        ...formData.customSections,
        [section]: [...formData.customSections[section], emptyState]
      }
    });
  };

  const removeCustomItem = (section, index) => {
    const updatedSection = formData.customSections[section].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      customSections: {
        ...formData.customSections,
        [section]: updatedSection
      }
    });
  };

  return {
    formData,
    setFormData,
    template,
    setTemplate,
    accentColor,
    setAccentColor,
    handleInputChange,
    handleArrayInputChange,
    addItem,
    removeItem,
    addSkill,
    removeSkill,
    handleCustomSectionChange,
    addCustomItem,
    removeCustomItem
  };
};
