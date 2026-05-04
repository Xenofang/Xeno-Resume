export const calculateATSScore = (formData) => {
  let score = 0;
  
  // 1. Contact Info (15%)
  if (formData.name) score += 7;
  if (formData.email && formData.phone) score += 8;
  
  // 2. Professional Summary (10%)
  if (formData.summary && formData.summary.length > 50) score += 10;
  
  // 3. Experience (25%)
  const validExp = formData.experience.filter(e => e.jobTitle && e.company);
  score += Math.min(validExp.length * 15, 25);
  
  // 4. Experience Bullets (10%)
  const totalBullets = formData.experience.reduce((acc, exp) => acc + (exp.description?.split('\n').filter(l => l.trim()).length || 0), 0);
  if (totalBullets >= 2) score += 10;

  // 5. Education (15%)
  const validEdu = formData.education?.filter(e => e.school && e.degree) || [];
  score += Math.min(validEdu.length * 15, 15);

  // 6. Projects (15%)
  const validProj = formData.projects.filter(p => p.projectName && p.description);
  score += Math.min(validProj.length * 10, 15);

  // 7. Skills Density (10%)
  const totalSkills = formData.skills.reduce((acc, group) => acc + group.items.length, 0);
  if (totalSkills >= 3) score += 10;
  
  // 8. Custom Sections Bonus (up to 5%)
  if (formData.customSections?.links?.length > 0) score += 3;
  if (formData.customSections?.certifications?.length > 0) score += 2;

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
