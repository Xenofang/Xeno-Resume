import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BsCloudCheck, BsCollection, BsBoxArrowRight, BsSave, BsDownload } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { calculateATSScore } from '../utils/atsScore';

const Header = ({ accentColor, handlePrint, formData, template }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save your progress');
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      const currentId = sessionStorage.getItem('currentResumeId');
      const currentTitle = sessionStorage.getItem('currentResumeTitle') || `${formData.name || 'Untitled'}_Resume`;
      
      const payload = {
        id: currentId,
        title: currentTitle,
        formData,
        settings: { template, accentColor },
        atsScore: calculateATSScore(formData)
      };

      const response = await axios.post('/api/v1/resume', payload);
      if (response.data.success) {
        if (!currentId) {
          sessionStorage.setItem('currentResumeId', response.data.data._id);
        }
        toast.success('Resume saved successfully!', {
          icon: '🚀',
          style: {
            borderRadius: '12px',
            background: '#262626',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        });
      }
    } catch (error) {
      toast.error('Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className="h-16 bg-[#1a1a1a] border-b border-white/5 px-6 flex justify-between items-center shadow-md z-20 relative">
      <Link to="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
        Xeno<span style={{ color: accentColor }}>Resume</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard" 
          className={`hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mr-4 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
          <BsCollection /> My Resumes
        </Link>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm font-bold disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <BsSave style={{ color: accentColor }} />
          )}
          Save Progress
        </button>

        <button 
          onClick={handlePrint}
          style={{ backgroundColor: accentColor }}
          className="text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition shadow-lg active:scale-95 flex items-center gap-2"
        >
          <BsDownload /> Export PDF
        </button>

        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all ml-2"
            title="Logout"
          >
            <BsBoxArrowRight size={18} />
          </button>
        ) : (
          <Link 
            to="/login"
            className="text-gray-400 hover:text-white transition-colors text-sm font-medium ml-4"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
