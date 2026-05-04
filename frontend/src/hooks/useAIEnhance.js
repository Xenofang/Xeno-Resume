import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAIEnhance = (formData, setFormData) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhancingSummary, setIsEnhancingSummary] = useState(false);
  const [rawExperience, setRawExperience] = useState('');

  const handleEnhanceExperience = async () => {
    if (!rawExperience) {
      toast.error("Please enter some raw experience to enhance!");
      return;
    }
    
    setIsEnhancing(true);
    try {
      const response = await axios.post('/api/v1/resume/optimize', {
        rawDescription: rawExperience
      });
      const enhancedText = response.data.data.join('\n');
      const updatedExperience = [...formData.experience];
      
      if (updatedExperience.length > 0 && !updatedExperience[0].description) {
        updatedExperience[0].description = enhancedText;
      } else {
        updatedExperience.push({ jobTitle: 'New Role', company: '', dates: '', description: enhancedText });
      }
      setFormData({ ...formData, experience: updatedExperience });
      setRawExperience('');
      toast.success("Experience enhanced!");
    } catch (error) {
      console.error("Error enhancing resume", error);
      toast.error("Failed to connect to the AI endpoint.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleEnhanceSummary = async () => {
    if (!formData.summary) {
      toast.error("Please enter a draft summary to enhance!");
      return;
    }
    
    setIsEnhancingSummary(true);
    try {
      const response = await axios.post('/api/v1/resume/optimize-summary', {
        rawSummary: formData.summary
      });
      setFormData(prev => ({ ...prev, summary: response.data.data }));
      toast.success("Summary optimized!");
    } catch (error) {
      console.error("Error enhancing summary", error);
      toast.error("Failed to connect to the AI summary endpoint.");
    } finally {
      setIsEnhancingSummary(false);
    }
  };

  return {
    isEnhancing,
    isEnhancingSummary,
    rawExperience,
    setRawExperience,
    handleEnhanceExperience,
    handleEnhanceSummary
  };
};
