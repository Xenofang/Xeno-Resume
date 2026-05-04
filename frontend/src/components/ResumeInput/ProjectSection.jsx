import React from 'react';
import { BsX } from 'react-icons/bs';

const ProjectSection = ({ projects, handleArrayInputChange, addItem, removeItem }) => {
  return (
    <div className="pt-8">
      <h3 className="text-xl font-bold text-white mb-4">Projects</h3>
      <div className="space-y-4">
        {projects.map((project, idx) => (
          <div key={idx} className="p-4 bg-[#262626] border border-white/10 rounded-lg relative shadow-xl">
            <button 
              onClick={() => removeItem('projects', idx)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs border border-white/10 px-2 py-1 rounded-md bg-[#1a1a1a]"
            >
              <BsX size={16} /> Remove
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={project.projectName}
                  onChange={(e) => handleArrayInputChange('projects', idx, 'projectName', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                  placeholder="Project X"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Link (optional)</label>
                <input 
                  type="text" 
                  value={project.link}
                  onChange={(e) => handleArrayInputChange('projects', idx, 'link', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                  placeholder="github.com/..."
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tech Stack</label>
              <input 
                type="text" 
                value={project.techStack}
                onChange={(e) => handleArrayInputChange('projects', idx, 'techStack', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
              <textarea 
                rows="4"
                value={project.description}
                onChange={(e) => handleArrayInputChange('projects', idx, 'description', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-white/30"
                placeholder="What did you build and what impact did it have?"
              />
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => addItem('projects', { projectName: '', link: '', techStack: '', description: '' })}
          className="w-full py-3 bg-[#1a1a1a] border-2 border-dashed border-white/10 rounded-lg text-gray-500 hover:border-white/20 hover:text-gray-400 transition font-medium min-h-[44px]"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectSection;
