import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Toaster } from 'react-hot-toast';

// Hooks
import { useResumeForm } from './hooks/useResumeForm';
import { useAIEnhance } from './hooks/useAIEnhance';
import { useChat } from './hooks/useChat';

// Components
import Header from './components/Header';
import Input from './components/ResumeInput/Input';
import Preview from './components/ResumePreview/Preview';
import Chatbot from './components/Chat/Chatbot';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import SavedResumes from './pages/SavedResumes';

function App() {
  const resumeRef = useRef();
  const printRef = useRef();
  const [isPrinting, setIsPrinting] = React.useState(false);

  // 1. Initialize State & Handlers via Custom Hooks
  const { 
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
  } = useResumeForm();

  const {
    isEnhancing,
    isEnhancingSummary,
    rawExperience,
    setRawExperience,
    handleEnhanceExperience,
    handleEnhanceSummary
  } = useAIEnhance(formData, setFormData);

  const {
    isChatOpen,
    setIsChatOpen,
    chatMessage,
    setChatMessage,
    chatHistory,
    isChatLoading,
    handleSendMessage
  } = useChat(formData);

  // 2. Export Logic
  const triggerPrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${formData.name || 'Resume'}_Document`,
    onAfterPrint: () => setIsPrinting(false),
  });

  const handlePrint = () => {
    setIsPrinting(true);
    // Small delay to ensure DOM is settled and "hidden" renderer is ready
    setTimeout(() => {
      triggerPrint();
    }, 500);
  };

  return (
    <Router>
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col font-sans relative">
          <Toaster position="top-center" />
          
          <Header 
            accentColor={accentColor}
            handlePrint={handlePrint}
            formData={formData}
            template={template}
          />

          <main className="h-[calc(100vh-64px)] overflow-hidden relative">
            <Routes>
              {/* Main Builder Route */}
              <Route path="/" element={
                <div className="h-full flex flex-col md:flex-row">
                  <Input 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleArrayInputChange={handleArrayInputChange}
                    addItem={addItem}
                    removeItem={removeItem}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    handleCustomSectionChange={handleCustomSectionChange}
                    addCustomItem={addCustomItem}
                    removeCustomItem={removeCustomItem}
                    template={template}
                    setTemplate={setTemplate}
                    accentColor={accentColor}
                    setAccentColor={setAccentColor}
                    rawExperience={rawExperience}
                    setRawExperience={setRawExperience}
                    handleEnhanceExperience={handleEnhanceExperience}
                    isEnhancing={isEnhancing}
                    handleEnhanceSummary={handleEnhanceSummary}
                    isEnhancingSummary={isEnhancingSummary}
                  />

                  <Preview 
                    ref={resumeRef}
                    formData={formData}
                    template={template}
                    accentColor={accentColor}
                  />
                </div>
              } />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Dashboard */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={
                  <SavedResumes 
                    setFormData={setFormData}
                    setTemplate={setTemplate}
                    setAccentColor={setAccentColor}
                  />
                } />
              </Route>
            </Routes>
          </main>

          <Chatbot 
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            chatHistory={chatHistory}
            isChatLoading={isChatLoading}
            handleSendMessage={handleSendMessage}
            accentColor={accentColor}
          />

          {/* Shadow Renderer for PDF Export */}
          <div className="fixed -left-[5000px] top-0 pointer-events-none overflow-hidden">
            <Preview 
              ref={printRef}
              formData={formData}
              template={template}
              accentColor={accentColor}
            />
          </div>

          {isPrinting && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
              <div className="bg-[#262626] p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" style={{ borderTopColor: accentColor }}></div>
                <p className="text-white font-bold tracking-wide">Preparing PDF...</p>
                <p className="text-gray-400 text-sm">Optimizing layout and assets</p>
              </div>
            </div>
          )}

        </div>
      </Router>
  );
}

export default App;
