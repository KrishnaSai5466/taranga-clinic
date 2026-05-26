import React, { useState, useEffect } from 'react';

function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // normal, large, extra-large
  const [contrast, setContrast] = useState('default'); // default, high-dark, high-light, colorblind
  const [keyboardHelper, setKeyboardHelper] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Handle font size change
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-lg', 'text-xl');
    if (fontSize === 'large') {
      root.classList.add('text-lg');
    } else if (fontSize === 'extra-large') {
      root.classList.add('text-xl');
    }
  }, [fontSize]);

  // Handle contrast change
  useEffect(() => {
    const body = document.body;
    body.classList.remove('high-contrast-dark', 'high-contrast-light', 'colorblind-filter');
    if (contrast === 'high-dark') {
      body.classList.add('high-contrast-dark');
    } else if (contrast === 'high-light') {
      body.classList.add('high-contrast-light');
    } else if (contrast === 'colorblind') {
      body.classList.add('colorblind-filter');
    }
  }, [contrast]);

  // Handle keyboard helper
  useEffect(() => {
    const body = document.body;
    if (keyboardHelper) {
      body.classList.add('keyboard-nav-helper');
    } else {
      body.classList.remove('keyboard-nav-helper');
    }
  }, [keyboardHelper]);

  const speakPage = () => {
    if (!synth) return;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    // Extract text from headers and paragraphs
    const elements = document.querySelectorAll('h1, h2, h3, p');
    let textToSpeak = "";
    elements.forEach(el => {
      textToSpeak += el.innerText + ". ";
    });

    if (textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak.slice(0, 1000)); // limit length for sanity
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      synth.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
      setSpeaking(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Left) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-50 text-2xl border border-blue-500/50"
        title="Accessibility Settings"
        aria-label="Accessibility Settings"
      >
        ♿
      </button>

      {/* Widget Panel */}
      {isOpen && (
        <div className="fixed bottom-28 left-6 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in-up">
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span>♿</span> Accessibility Options
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-sm font-semibold"
            >
              Close
            </button>
          </div>
          
          <div className="p-5 space-y-6 text-slate-200">
            {/* Text to Speech */}
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Screen Reader (TTS)</h4>
              <div className="flex gap-2">
                <button 
                  onClick={speakPage}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    speaking ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>🔊</span> {speaking ? 'Stop Reading' : 'Read Page'}
                </button>
                {speaking && (
                  <button 
                    onClick={stopSpeaking}
                    className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
                  >
                    Pause
                  </button>
                )}
              </div>
            </div>

            {/* Font Size Adjustments */}
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Adjust Font Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: '100%' },
                  { id: 'large', label: '125%' },
                  { id: 'extra-large', label: '150%' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFontSize(opt.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      fontSize === opt.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Contrast */}
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Color Contrast</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'default', label: 'Default' },
                  { id: 'high-dark', label: 'Dark High' },
                  { id: 'high-light', label: 'Light High' },
                  { id: 'colorblind', label: 'Colorblind' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setContrast(opt.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                      contrast === opt.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyboard Focus Highlights */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-300">Keyboard Navigation Helper</h4>
                <p className="text-xs text-slate-500">Adds thick outlines to active buttons and inputs</p>
              </div>
              <button
                onClick={() => setKeyboardHelper(!keyboardHelper)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                  keyboardHelper ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  keyboardHelper ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccessibilityWidget;
