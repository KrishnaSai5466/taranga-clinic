import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import SoundParticleBackground from './components/SoundParticleBackground';

function Home() {
  const [state, handleSubmit] = useForm('mlgzyjge');
  const [activeFaqTab, setActiveFaqTab] = useState('hearing');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const hearingFaqs = [
    { q: "How do I know if I have hearing loss?", a: "Signs include frequently asking others to repeat themselves, turning up the TV volume higher than others prefer, difficulty following conversations in noisy places, and feeling like people are mumbling." },
    { q: "What are the common causes of hearing impairment?", a: "Hearing impairment can be caused by aging (presbycusis), prolonged exposure to loud noises, genetics, ear infections, buildup of earwax, or certain medical conditions and medications." },
    { q: "How long do digital hearing aids last?", a: "Most high-quality digital hearing aids last between 3 to 7 years. Proper maintenance, daily cleaning, and regular checkups at our clinic can maximize their lifespan." },
    { q: "What is the difference between an analog and digital hearing aid?", a: "Analog aids amplify all sounds equally. Digital aids use advanced microprocessors to analyze sound in real-time, amplifying speech while actively suppressing background noise for a clearer experience." }
  ];

  const speechFaqs = [
    { q: "What age should a child start speech therapy?", a: "Early intervention is key. If a child is not babbling by 12 months, speaking simple words by 18 months, or using 2-word phrases by 2 years, we recommend a diagnostic consultation." },
    { q: "How long does speech therapy take to show results?", a: "The duration depends on the individual's diagnosis, severity, frequency of sessions, and home practice. Some patients show improvement in a few weeks, while others require several months of consistent therapy." },
    { q: "Can speech therapy help adults?", a: "Yes. Speech therapy is highly effective for adults recovering from strokes, traumatic brain injuries, vocal strain, stuttering, or cognitive-communication disorders." },
    { q: "What speech issues do you treat?", a: "We treat articulation disorders, phonological disorders, stuttering (disfluency), voice disorders, and language delays in children, and dysphagia/apraxia in adults." }
  ];

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-12">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6 md:px-12 border-b border-slate-900">
        {/* Animated Sound Particles Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-45">
          <SoundParticleBackground />
        </div>
        {/* Background Decorative Blurs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-8 animate-fade-in-up text-left">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-950/50 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide">
              <span>✨</span> Premium Audiology & Speech Care
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-white">
              Hear the World, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400">
                Clear & Loud.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              At Taranga Clinic, we combine state-of-the-art diagnostic testing, luxury digital hearing aids, and empathetic speech therapy to restore communication and transform lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/booking" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-bold transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 text-center">
                Book Free Consultation
              </Link>
              <Link to="/shop" className="px-8 py-4 bg-slate-900 hover:bg-slate-850 rounded-full font-semibold border border-slate-800 hover:border-slate-700 transition-all text-center">
                Explore Digital Hearing Aids
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900">
              <div>
                <p className="text-3xl font-extrabold text-white">15k+</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Patients Treated</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">99%</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">12+</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Years of Care</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative group flex justify-center items-center">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-850 shadow-2xl bg-slate-900 aspect-video md:aspect-[4/3] w-full">
              <img 
                src="/clinic_hero.png" 
                alt="Taranga speech and hearing clinic" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glassmorphism border border-slate-800/80">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">State-of-the-art facility</p>
                <p className="text-sm font-semibold text-white">Located in the heart of Tenali, Andhra Pradesh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white">Clinical Specialties</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-slate-400">
            We provide evidence-based, compassionate diagnostic and rehabilitative therapies for all age groups.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-900 hover:border-slate-800 transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-6 bg-slate-800 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                🎧
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Hearing Assessment & Aids</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Precise audiometric evaluations using soundproof booths. We source and program advanced digital hearing aids (Oticon, Phonak, Signia) tailored to your exact hearing profile.
              </p>
            </div>
            <Link to="/shop" className="text-blue-400 hover:text-blue-300 font-bold text-sm inline-flex items-center gap-2 mt-8">
              Browse Devices <span>→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-900 hover:border-slate-800 transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-6 bg-slate-800 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                🗣️
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Speech & Language Therapy</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Specialized programs for stuttering, speech delay, articulation disorders, and stroke-related aphasia. Our therapists create interactive exercises to build confidence.
              </p>
            </div>
            <Link to="/booking" className="text-blue-400 hover:text-blue-300 font-bold text-sm inline-flex items-center gap-2 mt-8">
              Book Therapy Session <span>→</span>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-900 hover:border-slate-800 transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-6 bg-slate-800 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                🩺
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Diagnostics & Accessories</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Tympanometry, Brainstem Auditory Evoked Response (BAER) testing, custom noise protection earplugs, ear molds, batteries, and clinical grade hearing aid repair.
              </p>
            </div>
            <Link to="/shop" className="text-blue-400 hover:text-blue-300 font-bold text-sm inline-flex items-center gap-2 mt-8">
              Inquire Repair & Custom Plugs <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Callout Section */}
      <section className="py-20 bg-slate-900 border-y border-slate-850">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-video w-full bg-slate-950">
            <img src="/speech_therapy_session.png" alt="Speech therapy session with child" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">Empowering Children and Adults to Connect</h3>
            <p className="text-slate-450 leading-relaxed">
              Communication is fundamental to our human experience. Taranga Clinic is fully equipped with highly experienced licensed pathologists and audiologists who employ custom interactive tools to ensure speech and hearing goals are met with success.
            </p>
            <div className="flex gap-4">
              <Link to="/resources" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all text-sm">
                Take Hearing Health Quiz
              </Link>
              <Link to="/booking" className="px-6 py-3 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 rounded-xl font-bold transition-all text-sm">
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-white">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 max-w-xl mx-auto">
            Get answers to common clinical questions regarding diagnostic assessments, hearing aids, and speech therapy.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => { setActiveFaqTab('hearing'); setExpandedFaq(null); }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
              activeFaqTab === 'hearing' 
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Hearing Loss & Diagnostic FAQs
          </button>
          <button 
            onClick={() => { setActiveFaqTab('speech'); setExpandedFaq(null); }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
              activeFaqTab === 'speech' 
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Speech Therapy FAQs
          </button>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {(activeFaqTab === 'hearing' ? hearingFaqs : speechFaqs).map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div 
                key={index} 
                className="bg-slate-900/60 border border-slate-900 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center font-bold text-lg text-white hover:bg-slate-900/90 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`text-2xl text-blue-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {isExpanded && (
                  <div className="p-6 pt-0 text-slate-400 leading-relaxed text-sm border-t border-slate-850/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Loved by Patients & Caregivers</h2>
            <p className="text-slate-400 text-sm">Read the stories of people who regained their confidence through our clinic.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { text: "My daughter speech delay was a huge worry for us. After 6 months of speech therapy here, she is babbling and speaking in full sentences! The therapists are amazing with children.", author: "Pritha Reddy", role: "Parent of 4yo" },
              { text: "I bought the Premium Invisible Hearing Aid. It really is invisible! Now I can join boardroom meetings and hear conversations clearly. The custom fitting session was top-notch.", author: "Sanjay Kumar", role: "Software Executive" },
              { text: "Taranga Clinic is hands down the best audiologist in Guntur district. Precise diagnostics and honest recommendations. They didn't try to upsell; they helped me choose what suited my lifestyle.", author: "Venkat Rao", role: "Retired Teacher" }
            ].map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-900/40 border border-slate-900/80 flex flex-col justify-between">
                <p className="text-slate-350 italic leading-relaxed text-sm">"{t.text}"</p>
                <div className="mt-6 pt-6 border-t border-slate-850 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center font-bold text-blue-400 text-sm">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.author}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="p-8 md:p-16 rounded-[3rem] bg-gradient-to-tr from-blue-950 to-slate-900 border border-blue-900/30 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <h3 className="text-3xl font-extrabold text-white">Subscribe to Hearing Health News</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Get downloadable PDFs, tips for speech training, and early hearing health alerts directly in your inbox.
          </p>
          {subscribed ? (
            <div className="max-w-md mx-auto pt-4 animate-fade-in-up">
              <div className="bg-green-950/50 border border-green-700/40 rounded-2xl px-8 py-6 flex flex-col items-center gap-3">
                <span className="text-4xl">✅</span>
                <h4 className="text-white font-extrabold text-lg">You're subscribed!</h4>
                <p className="text-green-300/80 text-xs">Thanks for subscribing. Hearing health tips and clinic updates will arrive in your inbox soon.</p>
                <button onClick={() => { setSubscribed(false); setSubscribeEmail(''); }} className="text-xs text-green-400 hover:underline mt-1">Subscribe another email</button>
              </div>
            </div>
          ) : (
            <form
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!subscribeEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscribeEmail)) return;
                
                try {
                  await fetch('https://formspree.io/f/mlgzyjge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                      email: subscribeEmail,
                      subject: 'New Newsletter Subscription Request',
                      message: `A patient has subscribed to the newsletter with email: ${subscribeEmail}`
                    })
                  });
                } catch (err) {
                  console.warn("Newsletter Formspree submission failed: ", err);
                }
                
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 font-bold transition-all text-sm">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 bg-slate-900/30 border border-slate-900 p-12 md:p-20 rounded-[3rem]">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-white">Visit Our Center</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We look forward to helping you or your loved ones. Call us directly or drop by our facility in Tenali. We serve patients from across AP.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-2xl">📍</span>
                <p className="text-slate-300 text-sm">
                  7-1-2/A, CHICKENS ROAD, behind RAJAKA CHERUVU ROAD,<br/>
                  opp. AMMA HOSPITAL ROAD, Ganganamma Peta,<br/>
                  Ithanagar, Tenali, AP 522201
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-2xl">📞</span>
                <p className="text-slate-350 font-bold text-lg">+91 92473 46680</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-2xl">🕒</span>
                <p className="text-slate-300 text-sm">Mon-Sat: 9:00 AM – 8:00 PM (Sunday Closed)</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-850 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Request a Callback</h3>
            <p className="text-slate-400 text-xs mb-6">Leave your details and our clinical scheduler will contact you shortly.</p>
            
            {state.succeeded ? (
              <div className="bg-green-950/40 border border-green-800/30 rounded-2xl p-6 text-center animate-fade-in-up">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-xl font-bold text-green-400 mb-1">Callback Requested!</h4>
                <p className="text-green-300/80 text-xs mb-4">A scheduling counselor will call you within 24 hours.</p>
                <button onClick={() => window.location.reload()} className="text-xs text-green-450 hover:underline">Submit another request</button>
              </div>
            ) : (
              <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Full Name</label>
                  <input type="text" name="name" required placeholder="John Doe" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Phone Number</label>
                  <input type="tel" name="phone" required placeholder="+91 00000 00000" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <button type="submit" disabled={state.submitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 text-sm">
                  {state.submitting ? 'Submitting...' : 'Submit Callback Request'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 rounded-[2.5rem] overflow-hidden border border-slate-900 h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.548274478009!2d80.64935539999999!3d16.2436467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a060e4f992619%3A0x6b91a839fbce596a!2sTARANGA%20SPEECH%20%26%20HEARING%20AID%20CENTRE!5e0!3m2!1sen!2sin!4v1778787271164!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Home;
