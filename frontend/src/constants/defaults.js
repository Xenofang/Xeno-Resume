export const DEFAULT_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  experience: [
    { jobTitle: '', company: '', dates: '', description: '' }
  ],
  projects: [
    { projectName: '', link: '', techStack: '', description: '' }
  ],
  skills: [
    { category: '', items: [] }
  ],
  customSections: {
    links: [],
    awards: [],
    certifications: []
  }
};

export const COLOR_PALETTE = ['#3B82F6', '#10B981', '#8B5CF6', '#F43F5E', '#F97316', '#0F172A', '#FFFFFF'];

export const TEMPLATES = ['modern', 'professional', 'elegant'];
