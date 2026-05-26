import React, { useState } from 'react';

function Resources() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Early Indicators of Childhood Speech Delays",
      tag: "Speech Therapy",
      date: "May 22, 2026",
      summary: "Understand the developmental language milestones from ages 1 to 4. Learn how to identify phonetics gaps early and support speech at home.",
      author: "Dr. Arundhati K. (Pediatric Specialist)"
    },
    {
      id: 2,
      title: "How Modern AI-Powered Hearing Aids Suppress Noise",
      tag: "Hearing Health",
      date: "May 15, 2026",
      summary: "Explore how machine learning and deep neural networks in modern digital hearing aids isolate voice signatures in noisy restaurants.",
      author: "Dr. Elena R. (Audiologist)"
    },
    {
      id: 3,
      title: "A Caregiver's Guide to Aphasia & Stroke Recovery",
      tag: "Caregivers",
      date: "May 10, 2026",
      summary: "Practical voice training, pacing methods, and cognitive communication techniques to aid speech rehabilitation at home after a neurological event.",
      author: "Dr. Venkat Rao (Speech Pathologist)"
    },
    {
      id: 4,
      title: "Tinnitus Management: Causes and Clinical Treatments",
      tag: "Hearing Health",
      date: "May 03, 2026",
      summary: "Learn what causes persistent ringing or buzzing in the ears and explore sound therapy, acoustic counseling, and modern masking filters.",
      author: "Dr. Elena R. (Audiologist)"
    }
  ];

  const quizQuestions = [
    { q: "Do you frequently ask others to repeat themselves, especially in crowded settings or restaurants?", weight: 1 },
    { q: "Do family members or friends comment that you turn up the television or radio too loud?", weight: 1 },
    { q: "Do you experience persistent ringing, buzzing, or hissing in one or both ears (tinnitus)?", weight: 1 },
    { q: "Do you find it difficult to follow conversations when multiple people are talking at the same time?", weight: 1 },
    { q: "Do you feel that people are constantly mumbling or not speaking clearly?", weight: 1 }
  ];

  const handleQuizAnswer = (answerVal) => {
    const updatedAnswers = [...quizAnswers, answerVal];
    setQuizAnswers(updatedAnswers);

    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate result
      const yesCount = updatedAnswers.filter(a => a === true).length;
      let diagnosis = "";
      if (yesCount >= 4) {
        diagnosis = "High Risk of Mild-to-Moderate Hearing Loss. We highly recommend booking an audiological soundproof cabin diagnostic test at Taranga Speech & Hearing Centre.";
      } else if (yesCount >= 2) {
        diagnosis = "Moderate Risk. Some hearing threshold changes detected. A baseline hearing screening is advised, especially to establish an audiogram chart.";
      } else {
        diagnosis = "Low Risk. Your hearing indicators look healthy. We recommend wearing custom earplugs in environments exceeding 85dB to preserve hearing.";
      }
      setQuizResult(diagnosis);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  const handleDownload = (filename) => {
    // Simulated PDF download
    const element = document.createElement("a");
    const file = new Blob([`Taranga Clinic Premium Resource: Guide to ${filename}. This is a simulated guide containing diagnostic charts and instructions.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Taranga_Clinic_${filename.replace(/\s+/g, '_')}_Guide.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Filtered Articles
  const filteredArticles = articles
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()))
    .filter(a => tag === "All" || a.tag === tag);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-left space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Resources</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Empowering patients and caregivers with evidence-based guides, daily vocal training checklists, and interactive wellness tools.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
        {/* Left columns: Articles list & search */}
        <section className="lg:col-span-2 space-y-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 bg-slate-900 border border-slate-850 p-6 rounded-[2rem] justify-between items-center">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resource articles..."
              className="w-full sm:max-w-xs bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {["All", "Hearing Health", "Speech Therapy", "Caregivers"].map(t => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    tag === t 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-950 hover:bg-slate-850 text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Articles list */}
          <div className="space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-slate-900 border border-slate-900 rounded-3xl">
                <span className="text-4xl">📚</span>
                <p className="text-slate-500 font-bold mt-4">No resource articles matched your query.</p>
              </div>
            ) : (
              filteredArticles.map(art => (
                <article key={art.id} className="bg-slate-900/60 border border-slate-900 hover:border-slate-800/80 p-8 rounded-[2rem] transition-all space-y-4 text-left">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="bg-blue-950 text-blue-400 px-3 py-1 rounded-full border border-blue-900/20">{art.tag}</span>
                    <span className="text-slate-500">{art.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">{art.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{art.summary}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-850 text-[10px] font-semibold text-slate-500">
                    <span>Written by:</span>
                    <span className="text-slate-350">{art.author}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Right column: Wellness Tool Quiz & Downloads */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Interactive Hearing Quiz widget */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-[2rem] space-y-4">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Hearing Self-Assessment</h3>
            
            {!quizStarted ? (
              <div className="space-y-4 text-left">
                <p className="text-slate-400 text-xs leading-relaxed">
                  Take a quick 5-question clinical evaluation check. Get immediate insights about your hearing risk thresholds.
                </p>
                <button 
                  onClick={() => setQuizStarted(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md text-center"
                >
                  Start Assessment Check
                </button>
              </div>
            ) : quizResult ? (
              <div className="space-y-4 text-left animate-fade-in-up">
                <div className="p-4 bg-blue-950/40 border border-blue-900/30 rounded-xl">
                  <h4 className="font-bold text-white text-xs">Diagnostic Insight:</h4>
                  <p className="text-[11px] text-blue-300 leading-relaxed mt-2">{quizResult}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={resetQuiz}
                    className="py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-800 rounded-xl text-xs font-semibold"
                  >
                    Retake Quiz
                  </button>
                  <button 
                    onClick={() => window.location.href = "/booking"}
                    className="py-2.5 bg-blue-600 hover:bg-blue-505 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Book Diagnostic
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left animate-fade-in-up">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>QUESTION {quizStep + 1} OF {quizQuestions.length}</span>
                  <span>{Math.round(((quizStep) / quizQuestions.length) * 100)}% DONE</span>
                </div>
                <p className="text-white text-xs font-bold leading-relaxed">{quizQuestions[quizStep].q}</p>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => handleQuizAnswer(true)}
                    className="py-3 bg-slate-950 hover:bg-blue-900/30 hover:border-blue-500/30 border border-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Yes, I do
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(false)}
                    className="py-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all"
                  >
                    No, rarely
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Downloadable Guides */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-[2rem] space-y-4 text-left">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Patient PDF Guides</h3>
            <p className="text-[10px] text-slate-500">Download clinic guides detailing instructions for speech exercise drills and hearing aid care.</p>
            
            <div className="space-y-3 pt-2">
              <button 
                onClick={() => handleDownload("Speech Delay Guide")}
                className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-850 hover:border-blue-500/25 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">Speech Therapy Parent Guide</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">PDF • 1.2 MB</p>
                  </div>
                </div>
                <span className="text-blue-400 font-extrabold text-xs">⬇</span>
              </button>

              <button 
                onClick={() => handleDownload("Hearing Aid Care Checklist")}
                className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-850 hover:border-blue-500/25 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">Hearing Aid Care Checklist</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">PDF • 800 KB</p>
                  </div>
                </div>
                <span className="text-blue-400 font-extrabold text-xs">⬇</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Resources;
