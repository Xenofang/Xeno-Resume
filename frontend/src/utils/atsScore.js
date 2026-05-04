export const calculateATSScore = (formData) => {
  let score = 0;
  
  // 1. Contact Info (20%)
  if (formData.name) score += 10;
  if (formData.email && formData.phone) score += 10;
  
  // 2. Professional Summary (10%)
  if (formData.summary && formData.summary.length > 50) score += 10;
  
  // 3. Experience (30%)
  const validExp = formData.experience.filter(e => e.jobTitle && e.company);
  score += Math.min(validExp.length * 15, 30);
  
  // 4. Experience Bullets (10%)
  const totalBullets = formData.experience.reduce((acc, exp) => acc + (exp.description.split('\n').filter(l => l.trim()).length), 0);
  if (totalBullets >= 2) score += 10;

  // 5. Projects (20%)
  const validProj = formData.projects.filter(p => p.projectName && p.description);
  score += Math.min(validProj.length * 10, 20);

  // 6. Skills Density (10%)
  const totalSkills = formData.skills.reduce((acc, group) => acc + group.items.length, 0);
  if (totalSkills >= 3) score += 10;
  
  // 7. Custom Sections Bonus (up to 10%)
  if (formData.customSections?.links?.length > 0) score += 5;
  if (formData.customSections?.certifications?.length > 0) score += 5;

  return Math.min(score, 100);
};

export const getScoreColor = (score) => {
  if (score < 40) return 'bg-red-500/10 text-red-500 border-red-500/20';
  if (score < 75) return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
  return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
};

export const getScoreStatus = (score) => {
  if (score < 40) return 'Weak';
  if (score < 75) return 'Good';
  return 'Excellent';
};
