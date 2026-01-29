import React, { useState } from 'react';
import { ProposalView } from './components/ProposalView';
import { PLACEHOLDER_PROPOSAL } from './constants';
import { ProposalData } from './types';
import { generateProposalContent } from './services/geminiService';
import { Sparkles, Printer, X, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<ProposalData>(PLACEHOLDER_PROPOSAL);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [clientName, setClientName] = useState('');
  const [projectTopic, setProjectTopic] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const newData = await generateProposalContent(clientName, projectTopic);
      setProposalData(newData);
      setIsGeneratorOpen(false);
    } catch (error) {
      console.error("Failed to generate", error);
      alert("Ошибка генерации. Проверьте API Key или попробуйте позже.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative font-sans antialiased bg-gray-50">
      {/* The Proposal Itself */}
      <ProposalView data={proposalData} />

      {/* Floating Action Buttons (Hidden when printing) */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 no-print z-50">
        <button 
          onClick={handlePrint}
          className="bg-white border border-gray-200 w-12 h-12 rounded-xl shadow-lg text-gray-600 hover:text-modern-black hover:scale-105 transition-all duration-200 flex items-center justify-center"
          title="Распечатать"
        >
          <Printer size={20} />
        </button>
        <button 
          onClick={() => setIsGeneratorOpen(true)}
          className="bg-modern-black w-12 h-12 rounded-xl shadow-lg shadow-gray-400/20 text-white hover:bg-gray-900 hover:scale-105 transition-all duration-200 flex items-center justify-center"
          title="AI Generator"
        >
          <Sparkles size={20} />
        </button>
      </div>

      {/* AI Generator Modal - Modern Styling */}
      {isGeneratorOpen && (
        <div className="fixed inset-0 bg-modern-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in ring-1 ring-gray-200">
            <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-display font-bold text-lg text-modern-black flex items-center gap-2">
                <Sparkles size={18} className="text-modern-accent" />
                AI Generator
              </h3>
              <button onClick={() => setIsGeneratorOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleGenerate} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Клиент</label>
                <input 
                  type="text" 
                  required
                  placeholder="Название компании..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-modern-accent focus:ring-1 focus:ring-modern-accent outline-none transition-all font-medium text-modern-black placeholder:text-gray-400"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Задача</label>
                <textarea 
                  required
                  placeholder="Суть проекта..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-modern-accent focus:ring-1 focus:ring-modern-accent outline-none transition-all font-medium text-modern-black h-32 resize-none placeholder:text-gray-400"
                  value={projectTopic}
                  onChange={(e) => setProjectTopic(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className="w-full bg-modern-accent text-white py-3.5 rounded-lg font-bold hover:bg-modern-accentDark active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-white" />
                      Генерация...
                    </>
                  ) : (
                    "Сгенерировать предложение"
                  )}
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
                  Powered by Google Gemini
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;