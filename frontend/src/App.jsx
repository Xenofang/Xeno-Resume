import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BsRobot } from 'react-icons/bs';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '' // Raw experience added
  });
  
  const [enhancedBullets, setEnhancedBullets] = useState([]);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnhance = async () => {
    if (!formData.experience) {
      alert("Please enter some raw experience to enhance!");
      return;
    }
    
    setIsEnhancing(true);
    try {
      // Calling the backend API we just set up
      const response = await axios.post('http://localhost:5000/api/v1/resume/optimize', {
        rawDescription: formData.experience
      });
      setEnhancedBullets(response.data.data);
    } catch (error) {
      console.error("Error enhancing resume", error);
      alert("Failed to connect to the backend AI endpoint.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col font-sans">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
          <h1 className="text-xl font-bold tracking-tight text-textMain">Resume<span className="text-accentBlue">AI</span></h1>
          <button className="bg-textMain text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-black transition shadow-sm">
            Export PDF
          </button>
        </header>

        {/* Main Workspace (Split Pane) */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Pane: Editor */}
          <div className="w-1/2 overflow-y-auto p-8 border-r border-gray-200 bg-white shadow-[inset_-10px_0_20px_-10px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-semibold mb-6">Personal Details</h2>
            
            {/* Real Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-accentBlue focus:border-accentBlue outline-none transition shadow-sm" placeholder="e.g. John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-accentBlue focus:border-accentBlue outline-none transition shadow-sm" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-accentBlue focus:border-accentBlue outline-none transition shadow-sm" placeholder="(555) 123-4567" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                <textarea rows="3" name="summary" value={formData.summary} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-accentBlue focus:border-accentBlue outline-none transition shadow-sm" placeholder="Brief summary about yourself..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raw Experience Description <span className="text-accentBlue text-xs ml-2">(AI will enhance this)</span></label>
                <textarea rows="4" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-accentBlue focus:border-accentBlue outline-none transition shadow-sm" placeholder="I made a website faster..."></textarea>
              </div>

              <button onClick={handleEnhance} disabled={isEnhancing} className={`w-full ${isEnhancing ? 'bg-blue-400' : 'bg-accentBlue hover:bg-blue-600'} text-white py-3 rounded-md transition font-medium shadow-md flex justify-center items-center`}>
                {isEnhancing ? 'Enhancing with AI...' : 'Save & Enhance with AI'}
              </button>
            </div>
          </div>

          {/* Right Pane: PDF Preview */}
          <div className="w-1/2 bg-gray-50 p-8 overflow-y-auto flex justify-center items-start">
             <div className="w-[8.5in] min-h-[11in] bg-white shadow-xl p-12 border border-gray-200 text-sm transform scale-[0.85] origin-top">
               {/* Dynamic Resume Content */}
               <h1 className="text-4xl font-bold mb-2">{formData.name || 'John Doe'}</h1>
               <p className="text-gray-600 mb-6 border-b pb-4">Software Engineer | San Francisco, CA | {formData.email || 'johndoe@email.com'} | {formData.phone}</p>
               
               <h3 className="text-xl font-semibold mb-3 text-textMain">Summary</h3>
               <p className="mb-6 text-gray-700 leading-relaxed">{formData.summary || 'Passionate engineer with experience in building scalable web applications. Proven ability to leverage AI technologies to streamline business operations and improve user engagement.'}</p>

               <h3 className="text-xl font-semibold mb-3 text-textMain">Experience</h3>
               <div className="mb-4">
                 <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-medium text-lg">Senior Developer</h4>
                   <span className="text-gray-500 text-sm">Jan 2020 - Present</span>
                 </div>
                 <p className="text-accentBlue mb-2">Tech Solutions Inc.</p>
                 <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                   {enhancedBullets.length > 0 ? (
                     enhancedBullets.map((bullet, idx) => (
                       <li key={idx} className="leading-relaxed bg-blue-50/50 p-1 rounded inline-block w-full border-l-2 border-accentBlue pl-2">{bullet}</li>
                     ))
                   ) : (
                     <>
                        <li>Architected a microservices backend reducing latency by 40%.</li>
                        <li>Mentored a team of 5 junior developers, improving code quality scores.</li>
                     </>
                   )}
                 </ul>
               </div>
             </div>
          </div>
        </main>

        {/* Floating Chatbot Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-accentBlue text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer group">
            <BsRobot size={26} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
