import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BsPencilSquare, 
  BsTrash, 
  BsDownload, 
  BsPlusLg, 
  BsClockHistory,
  BsBarChartLine
} from 'react-icons/bs';
import { toast } from 'react-hot-toast';

const SavedResumes = ({ setFormData, setTemplate, setAccentColor }) => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get('/api/v1/resume');
      setResumes(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (resume) => {
    // Load resume data into the builder state
    setFormData(resume.formData);
    setTemplate(resume.settings.template);
    setAccentColor(resume.settings.accentColor);
    // Store current resume ID in session for updates
    sessionStorage.setItem('currentResumeId', resume._id);
    sessionStorage.setItem('currentResumeTitle', resume.title);
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await axios.delete(`/api/v1/resume/${id}`);
      setResumes(resumes.filter(r => r._id !== id));
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#1a1a1a] p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Resumes</h1>
            <p className="text-gray-400 text-sm">Manage and edit your saved resume collections</p>
          </div>
          <button 
            onClick={() => {
              sessionStorage.removeItem('currentResumeId');
              sessionStorage.removeItem('currentResumeTitle');
              navigate('/');
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <BsPlusLg /> Create New
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading your masterpieces...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <BsPencilSquare className="text-gray-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No resumes saved yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm text-center text-sm leading-relaxed">
              Start building your professional profile and save it to access it anytime from your dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="group bg-[#262626] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-blue-500/10 transition-colors"></div>
                
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {resume.title}
                </h3>
                
                <div className="space-y-3 mb-8 relative z-10">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <BsBarChartLine className="text-emerald-500" size={14} />
                    </div>
                    <span>ATS Score: <span className="text-white font-bold">{resume.atsScore}%</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <BsClockHistory className="text-blue-400" size={14} />
                    </div>
                    <span>Modified: <span className="text-gray-300">{formatDate(resume.updatedAt)}</span></span>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  <button 
                    onClick={() => handleEdit(resume)}
                    className="flex-1 bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 text-gray-300 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <BsPencilSquare size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(resume._id)}
                    className="w-11 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-gray-400 py-2.5 rounded-xl transition-all flex items-center justify-center"
                  >
                    <BsTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedResumes;
