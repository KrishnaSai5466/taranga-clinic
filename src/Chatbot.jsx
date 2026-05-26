import React, { useState, useEffect, useRef } from 'react';

const KB = [
  // ── Timings ──────────────────────────────────────────────────────────
  {
    keys: ["timing", "timings", "time", "hours", "hour", "open", "close", "working", "schedule", "when", "sunday", "weekend", "days"],
    answer: "🕒 We are open Monday to Saturday from 9:00 AM – 8:00 PM. We are closed on Sundays. No prior appointment is needed for a general consultation — walk-ins are welcome!"
  },

  // ── Location / Address ───────────────────────────────────────────────
  {
    keys: ["where", "location", "address", "directions", "find", "reach", "tenali", "map"],
    answer: "📍 We are located at:\n7-1-2/A, Chickens Road, behind Rajaka Cheruvu Road,\nopp. Amma Hospital Road, Ganganamma Peta,\nIthanagar, Tenali, AP – 522201.\n\nYou can also view us on the map at the bottom of our homepage!"
  },

  // ── Phone / Contact ──────────────────────────────────────────────────
  {
    keys: ["phone", "number", "contact", "call", "whatsapp", "reach out"],
    answer: "📞 You can reach us at +91 92473 46680. We are available Monday–Saturday, 9 AM to 8 PM."
  },

  // ── Booking ──────────────────────────────────────────────────────────
  {
    keys: ["book", "appointment", "booking", "schedule", "slot", "visit", "walk-in", "walk in", "register"],
    answer: "📅 You can book an appointment directly on our website — just click **Book Consultation** in the top navbar!\n\nAlternatively, use the **Callback Request** form on our homepage and our scheduler will call you back within 24 hours."
  },

  // ── Hearing Loss / General ───────────────────────────────────────────
  {
    keys: ["hearing loss", "hearing problem", "can't hear", "hard of hearing", "deaf", "loss of hearing", "hearing issue"],
    answer: "🦻 Hearing loss can be mild, moderate, or severe, and is assessed using a clinical audiogram test in our soundproof booth.\n\nCommon causes include:\n• Age-related changes (presbycusis)\n• Prolonged noise exposure\n• Ear infections or wax buildup\n• Genetics or certain medications\n\nWe recommend a diagnostic hearing test as the first step. Book one today!"
  },

  // ── Hearing Test / Audiogram ─────────────────────────────────────────
  {
    keys: ["hearing test", "audiogram", "audiometry", "test", "diagnosis", "check", "assessment", "evaluation"],
    answer: "🔬 A comprehensive hearing test (pure-tone audiometry) is conducted in our soundproof acoustic booth.\n\nIt measures your hearing thresholds across frequencies (250 Hz – 8000 Hz) and takes around 30–45 minutes. Results are charted on an audiogram, which our specialist reviews with you immediately.\n\nNo special preparation is needed — just walk in!"
  },

  // ── Hearing Aids ─────────────────────────────────────────────────────
  {
    keys: ["hearing aid", "hearing aids", "aid", "device", "oticon", "phonak", "signia", "rechargeable", "invisible", "ric", "bte", "cic"],
    answer: "👂 We offer a range of premium digital hearing aids:\n\n• **Oticon Real 1 miniRITE** – BrainHearing™, Bluetooth streaming\n• **Phonak Audéo Lumity L90** – StereoZoom, waterproof\n• **Signia Silk CIC** – World's smallest rechargeable, virtually invisible\n\nAll devices are programmed to your specific audiogram by our specialist. Browse our **Store** page for full specs and pricing!"
  },

  // ── Hearing Aid Cost / Price ─────────────────────────────────────────
  {
    keys: ["price", "cost", "fee", "charge", "expensive", "affordable", "how much", "rates", "pricing"],
    answer: "💰 Hearing aid prices typically range from ₹15,000 to ₹2,50,000+ depending on the model, technology level, and features.\n\nWe offer models across all budgets. Visit our **Store** page to compare options, or call us at +91 92473 46680 for a personalised quote after a free hearing screening."
  },

  // ── Speech Therapy – General ─────────────────────────────────────────
  {
    keys: ["speech therapy", "speech therapist", "speech", "language therapy", "speech pathology", "pathologist", "talk", "talking", "communication"],
    answer: "🗣️ Our licensed speech-language pathologists offer therapy for:\n\n• Children with speech/language delays\n• Stuttering & fluency disorders\n• Articulation and phonological disorders\n• Aphasia (post-stroke recovery)\n• Adult voice & resonance disorders\n\nTherapy sessions are tailored to individual goals and usually 45–60 minutes. Both children and adults are welcome!"
  },

  // ── Child / Pediatric ────────────────────────────────────────────────
  {
    keys: ["child", "children", "kid", "baby", "toddler", "pediatric", "infant", "age", "son", "daughter", "boy", "girl"],
    answer: "👶 We specialise in pediatric speech and hearing care!\n\n**Signs to watch for:**\n• Not babbling by 12 months\n• No single words by 18 months\n• Not using 2-word phrases by age 2\n• Frequently asking to repeat things at school\n\nEarly intervention leads to the best outcomes. We recommend bringing your child in for an assessment if you notice any of these signs."
  },

  // ── Stammering / Stuttering ──────────────────────────────────────────
  {
    keys: ["stammer", "stutter", "fluency", "stuttering", "stammering"],
    answer: "🗣️ Stammering (stuttering) is a fluency disorder we treat in both children and adults.\n\nOur therapists use evidence-based techniques including:\n• Smooth speech training\n• Breathing and pacing exercises\n• Psychological confidence building\n\nMost patients see noticeable improvement within 8–12 sessions. Book a consultation to get started!"
  },

  // ── Tinnitus ─────────────────────────────────────────────────────────
  {
    keys: ["tinnitus", "ringing", "buzzing", "hissing", "noise in ear", "ear noise"],
    answer: "🔔 Tinnitus (ringing/buzzing in the ears) is a condition we evaluate and manage.\n\nTreatment options include:\n• Sound therapy and masking devices\n• Tinnitus Retraining Therapy (TRT)\n• Hearing aids with built-in tinnitus maskers\n• Acoustic counselling\n\nA hearing assessment is the first step. Book one with our audiologist today!"
  },

  // ── Treatments offered ───────────────────────────────────────────────
  {
    keys: ["treatment", "treatments", "service", "services", "offer", "speciality", "specialties", "what do you", "what you"],
    answer: "🏥 Taranga Clinic offers the following services:\n\n**Hearing:**\n• Audiogram & diagnostic testing\n• Hearing aid fitting & programming\n• Tinnitus management\n• Ear wax removal\n\n**Speech:**\n• Pediatric speech & language therapy\n• Adult stuttering / fluency therapy\n• Aphasia & stroke recovery\n• Voice disorders\n\nVisit our homepage to learn more about each specialty!"
  },

  // ── Doctors / Staff ──────────────────────────────────────────────────
  {
    keys: ["doctor", "doctors", "specialist", "audiologist", "therapist", "staff", "who", "team"],
    answer: "👩‍⚕️ Our clinical team includes:\n\n• **Dr. Elena R.** – Senior Audiologist (hearing diagnostics & fittings)\n• **Dr. Venkat Rao** – Speech-Language Pathologist (adult therapy)\n• **Dr. Arundhati K.** – Pediatric Speech Therapist (children's therapy)\n\nAll our specialists are licensed, experienced, and committed to personalised care."
  },

  // ── Duration of therapy ───────────────────────────────────────────────
  {
    keys: ["how long", "duration", "sessions", "many sessions", "results", "improvement"],
    answer: "⏳ The duration depends on the individual's condition and severity:\n\n• **Hearing tests** – Single session (30–45 mins)\n• **Hearing aid fitting** – 1–2 sessions to calibrate\n• **Speech therapy** – Typically 8–24 sessions, depending on diagnosis\n• **Tinnitus therapy** – Usually 6–12 months of sound therapy\n\nOur specialists will give you a personalised plan after the initial assessment."
  },

  // ── Insurance ────────────────────────────────────────────────────────
  {
    keys: ["insurance", "cashless", "mediclaim", "coverage", "ayushman", "esic"],
    answer: "🏦 We currently accept select insurance plans. Please call us at +91 92473 46680 to confirm whether your specific insurer or plan is accepted before your visit."
  },

  // ── Hi / Hello ───────────────────────────────────────────────────────
  {
    keys: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste", "hii", "helo"],
    answer: "👋 Hello! Welcome to Taranga Speech & Hearing Aid Centre.\n\nHow can I help you today? You can ask me about:\n• 🕒 Clinic timings\n• 🦻 Hearing tests & aids\n• 🗣️ Speech therapy treatments\n• 📅 How to book an appointment\n• 📍 Our location"
  },

  // ── Thank you ────────────────────────────────────────────────────────
  {
    keys: ["thank", "thanks", "thank you", "ty", "ok", "okay", "great", "got it"],
    answer: "😊 You're welcome! Feel free to ask if you have any other questions. We're here to help!"
  }
];

function getBotResponse(userMsg) {
  const lower = userMsg.toLowerCase();
  for (const entry of KB) {
    if (entry.keys.some(k => lower.includes(k))) {
      return entry.answer;
    }
  }
  // Genuine fallback — only reached for truly unrecognised queries
  return "🤔 I didn't quite catch that. I can help you with clinic timings, hearing tests, speech therapy, treatments, pricing, or booking an appointment.\n\nFor specific medical advice, feel free to call us at 📞 +91 92473 46680.";
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 Welcome to Taranga Clinic.\n\nAsk me anything — timings, treatments, hearing aids, speech therapy, or how to book an appointment!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { text: getBotResponse(userMsg), isBot: true }]);
    }, 650);
  };

  // Quick suggestion chips
  const suggestions = ["Timings", "Treatments", "Hearing aids", "Book appointment", "Charges"];

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 transition-transform hover:scale-110 z-50 text-2xl"
        aria-label="Open chat assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🏥</div>
              <div>
                <h3 className="font-bold text-white text-sm">Taranga Assistant</h3>
                <p className="text-[10px] text-blue-200 font-medium">● Online — answers instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-[360px] overflow-y-auto space-y-4 bg-slate-900/60 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[88%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-md ${
                    msg.isBot
                      ? 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                      : 'bg-blue-600 text-white rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply chips */}
          <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-slate-800 bg-slate-900">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => {
                  setMessages(prev => [...prev, { text: s, isBot: false }]);
                  setTimeout(() => {
                    setMessages(prev => [...prev, { text: getBotResponse(s), isBot: true }]);
                  }, 650);
                }}
                className="px-3 py-1 bg-slate-800 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-600/50 text-slate-300 hover:text-white rounded-full text-[10px] font-semibold transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-slate-800 border-t border-slate-700 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about timings, treatments..."
              className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
