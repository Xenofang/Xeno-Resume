import React, { forwardRef } from 'react';

const ResumeRenderer = forwardRef(({ formData, template, accentColor }, ref) => {
  const isPro = template === 'professional';
  const isElegant = template === 'elegant';

  return (
    <div 
      ref={ref} 
      className="bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] w-full max-w-[210mm] min-h-[297mm] h-fit p-[20mm] transition-all duration-300 print:shadow-none print:p-0 print:w-[210mm] print:min-h-0"
      style={{
        // Force white background and hide UI elements during print
        '@media print': {
          margin: 0,
          padding: 0,
          boxShadow: 'none',
          backgroundColor: 'white'
        }
      }}
    >
      <style>
        {`
          @media print {
            body {
              background-color: white !important;
            }
            .no-print {
              display: none !important;
            }
            @page {
              size: auto;
              margin: 15mm;
            }
          }
        `}
      </style>
      <div className={`w-full h-full ${isElegant ? 'font-serif' : 'font-sans'} text-gray-800`}>
        {/* Header */}
        <div className={`mb-6 ${!isElegant ? 'border-b border-gray-300 pb-4' : 'pb-2'} ${isPro || isElegant ? 'text-center' : 'text-left'}`}>
          <h1 
            className={`${isPro ? 'text-4xl uppercase tracking-widest' : isElegant ? 'text-5xl mb-3' : 'text-4xl font-bold'} mb-1 transition-all duration-300`}
            style={{ color: accentColor }}
          >
            {formData.name || 'John Doe'}
          </h1>
          <div className={`text-sm text-gray-600 flex ${isPro || isElegant ? 'justify-center' : 'justify-start'} items-center flex-wrap gap-x-3 gap-y-1 ${isPro ? 'tracking-wider text-xs' : ''}`}>
            <span className="transition-all duration-300" style={{ color: isPro ? 'inherit' : accentColor }}>{formData.email || 'johndoe@email.com'}</span>
            
            <span className="text-gray-300 leading-none h-4 flex items-center">|</span>
            <span>{formData.phone || '(555) 123-4567'}</span>

            {formData.customSections?.links?.length > 0 && (
              <>
                {formData.customSections.links.map((link, idx) => {
                  // Advanced clean link logic
                  let displayUrl = link.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
                  const parts = displayUrl.split('/');
                  
                  // If it's a deep link (like linkedin.com/in/user), show the last part or relevant path
                  if (parts.length > 1) {
                    if (link.platform.toLowerCase().includes('linkedin') || link.platform.toLowerCase().includes('github')) {
                      displayUrl = parts.pop() || displayUrl;
                    }
                  }
                  
                  return (
                    <React.Fragment key={idx}>
                      <span className="text-gray-300 leading-none h-4 flex items-center">|</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-medium text-gray-500">{link.platform.toLowerCase()}:</span>
                        <a 
                          href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                          style={{ color: accentColor }}
                        >
                          {displayUrl}
                        </a>
                      </div>
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div className="mb-8">
            <h3 
              className={`text-lg font-bold mb-2 transition-all duration-300 ${isPro ? 'uppercase tracking-widest border-b pb-1 mb-3' : ''}`}
              style={{ 
                color: accentColor,
                borderBottomColor: isPro ? accentColor : 'transparent'
              }}
            >
              Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {formData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {formData.experience.length > 0 && (
          <div className="mb-8">
            <h3 
              className={`text-lg font-bold mb-4 transition-all duration-300 ${isPro ? 'uppercase tracking-widest border-b pb-1 mb-5' : ''}`}
              style={{ 
                color: accentColor,
                borderBottomColor: isPro ? accentColor : 'transparent'
              }}
            >
              Experience
            </h3>
            <div className="space-y-6">
              {formData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-md font-bold">{exp.jobTitle || 'Job Title'}</h4>
                    <span className="text-sm text-gray-500">{exp.dates || 'Dates'}</span>
                  </div>
                  <p className="text-sm font-medium mb-2 transition-all duration-300" style={{ color: accentColor }}>{exp.company || 'Company'}</p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-700">
                    {exp.description.split('\n').filter(line => line.trim()).map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {formData.projects.length > 0 && (
          <div className="mb-8">
            <h3 
              className={`text-lg font-bold mb-4 transition-all duration-300 ${isPro ? 'uppercase tracking-widest border-b pb-1 mb-5' : ''}`}
              style={{ 
                color: accentColor,
                borderBottomColor: isPro ? accentColor : 'transparent'
              }}
            >
              Projects
            </h3>
            <div className="space-y-6">
              {formData.projects.map((project, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-md font-bold">{project.projectName || 'Project Name'}</h4>
                    {project.link && <span className="text-sm text-blue-600 underline">{project.link}</span>}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 transition-all duration-300" style={{ color: accentColor }}>{project.techStack || 'Tech Stack'}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {formData.skills.length > 0 && (
          <div>
            <h3 
              className={`text-lg font-bold mb-3 transition-all duration-300 ${isPro ? 'uppercase tracking-widest border-b pb-1 mb-4' : ''}`}
              style={{ 
                color: accentColor,
                borderBottomColor: isPro ? accentColor : 'transparent'
              }}
            >
              Skills
            </h3>
            <div className="space-y-2">
              {formData.skills.map((skillGroup, idx) => (
                <div key={idx} className="flex gap-2 text-sm">
                  <span className="font-bold min-w-[100px] transition-all duration-300" style={{ color: accentColor }}>{skillGroup.category}:</span>
                  <span className="text-gray-700">{skillGroup.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {formData.customSections?.certifications?.length > 0 && (
          <div className="mt-8">
            <h3 
              className={`text-lg font-bold mb-3 transition-all duration-300 ${isPro ? 'uppercase tracking-widest border-b pb-1 mb-4' : ''}`}
              style={{ 
                color: accentColor,
                borderBottomColor: isPro ? accentColor : 'transparent'
              }}
            >
              Certifications
            </h3>
            <div className="space-y-2">
              {formData.customSections.certifications.map((cert, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-bold">{cert.title || 'Certification Title'}</span>
                    <span className="text-gray-400 mx-2">—</span>
                    <span className="text-gray-600">{cert.organization || 'Organization'}</span>
                  </div>
                  <span className="text-xs text-gray-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {formData.customSections?.awards?.length > 0 && (
          <div className="mt-8">
            <h3 
              className={`text-lg font-bold mb-4 transition-all duration-300 ${isPro ? 'uppercase tracking-widest border-b pb-1 mb-5' : ''}`}
              style={{ 
                color: accentColor,
                borderBottomColor: isPro ? accentColor : 'transparent'
              }}
            >
              Awards & Achievements
            </h3>
            <div className="space-y-4">
              {formData.customSections.awards.map((award, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-md font-bold">{award.title || 'Award Title'}</h4>
                    <span className="text-sm text-gray-500">{award.date}</span>
                  </div>
                  <p className="text-sm font-medium mb-1.5 transition-all duration-300" style={{ color: accentColor }}>{award.issuer}</p>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                    {award.description?.split('\n').filter(line => line.trim()).map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ResumeRenderer.displayName = 'ResumeRenderer';

export default ResumeRenderer;
