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

  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  return (
    <Router>
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col font-sans relative overflow-x-hidden">
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
                  {/* Form Container: Full on mobile, 40% on tablet, 55% on desktop */}
                  <div className="w-full md:w-[40%] lg:w-[55%] h-full">
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
                  </div>

                  {/* Preview Container: Hidden on mobile, 60% on tablet, 45% on desktop */}
                  <div className="hidden md:block md:w-[60%] lg:w-[45%] h-full">
                    <Preview 
                      ref={resumeRef}
                      formData={formData}
                      template={template}
                      accentColor={accentColor}
                    />
                  </div>

                  {/* Mobile Preview FAB */}
                  <div className="md:hidden fixed bottom-6 right-6 z-50">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      style={{ backgroundColor: accentColor }}
                      className="w-14 h-14 rounded-full text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile Preview Modal */}
                  {isPreviewOpen && (
                    <div className="md:hidden fixed inset-0 bg-[#f3f4f6] z-[60] flex flex-col">
                      <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between shadow-sm">
                        <span className="font-bold text-gray-800">Resume Preview</span>
                        <button 
                          onClick={() => setIsPreviewOpen(false)}
                          className="p-2 text-gray-500 hover:text-gray-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto bg-[#e5e7eb] p-4">
                        <Preview 
                          ref={resumeRef}
                          formData={formData}
                          template={template}
                          accentColor={accentColor}
                          isMobileModal={true}
                        />
                      </div>
                    </div>
                  )}
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
