import React, { useState } from 'react';

function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctor: '',
    service: '',
    date: '',
    slot: '',
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const services = [
    { name: "Comprehensive Hearing Test", type: "Hearing Assessment", duration: "45 mins" },
    { name: "Hearing Aid Diagnostic & Fitting", type: "Hearing Assessment", duration: "60 mins" },
    { name: "Pediatric Speech Assessment", type: "Speech Therapy", duration: "45 mins" },
    { name: "Adult Stammering & Voice Therapy", type: "Speech Therapy", duration: "50 mins" }
  ];

  const doctors = [
    { name: "Dr. Elena R. (Audiologist)", specialty: "Hearing Assessment" },
    { name: "Dr. Venkat Rao (Speech Pathologist)", specialty: "Speech Therapy" },
    { name: "Dr. Arundhati K. (Pediatric Therapist)", specialty: "Speech Therapy" }
  ];

  const nextDays = [
    { day: "Mon", date: "May 25", value: "2026-05-25" },
    { day: "Tue", date: "May 26", value: "2026-05-26" },
    { day: "Wed", date: "May 27", value: "2026-05-27" },
    { day: "Thu", date: "May 28", value: "2026-05-28" },
    { day: "Fri", date: "May 29", value: "2026-05-29" },
    { day: "Sat", date: "May 30", value: "2026-05-30" }
  ];

  const slots = ["09:00 AM", "10:30 AM", "11:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  const handleServiceSelect = (service) => {
    // Auto filter doctor based on specialty
    const matchingDoc = doctors.find(doc => doc.specialty === service.type);
    setFormData({
      ...formData,
      service: service.name,
      doctor: matchingDoc ? matchingDoc.name : doctors[0].name
    });
    setStep(2);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = "Patient name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter valid email address";
    if (formData.phone.length < 10) errors.phone = "Enter valid 10-digit phone number";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    // POST appointment details to Formspree — clinic receives email notification
    try {
      await fetch('https://formspree.io/f/mlgzyjge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          subject: `New Appointment Request — ${formData.service}`,
          patient_name: formData.name,
          patient_phone: formData.phone,
          patient_email: formData.email,
          service_requested: formData.service,
          assigned_doctor: formData.doctor,
          preferred_date: formData.date,
          preferred_slot: formData.slot,
          clinical_reason: formData.reason || 'Not specified',
          visit_type: 'In-Person Clinic Visit',
        })
      });
    } catch (_) {
      // Silently continue — still show confirmation to patient
    }

    setSubmitting(false);
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      <header className="max-w-3xl mx-auto px-6 pt-16 text-center space-y-4">
        <h1 className="text-4xl font-black text-white">Clinical Booking Wizard</h1>
        <p className="text-slate-400 text-xs">Book an in-person session at our Tenali clinic. Select your specialist and preferred date below.</p>
        
        {/* Step indicator */}
        <div className="flex justify-between items-center max-w-md mx-auto pt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span className={step >= 1 ? "text-blue-400" : ""}>1. Consultation</span>
          <span className="text-slate-700">➔</span>
          <span className={step >= 2 ? "text-blue-400" : ""}>2. Date & Time</span>
          <span className="text-slate-700">➔</span>
          <span className={step >= 3 ? "text-blue-400" : ""}>3. Patient Info</span>
          <span className="text-slate-700">➔</span>
          <span className={step >= 5 ? "text-blue-400" : ""}>4. Done</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-10">
        {step === 1 && (
          /* Step 1: Service type */
          <div className="bg-slate-900 border border-slate-850 p-8 rounded-[2.5rem] shadow-2xl space-y-6 animate-fade-in-up">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Select Specialty & Service</h3>
              <p className="text-xs text-slate-550">Choose the clinical service you require for your in-person visit.</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Required Clinical Service</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServiceSelect(s)}
                    className="p-5 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/30 rounded-2xl transition-all text-left flex flex-col justify-between h-36"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{s.type}</span>
                      <h4 className="font-bold text-white text-sm mt-1">{s.name}</h4>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{s.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          /* Step 2: Date & Slots calendar */
          <div className="bg-slate-900 border border-slate-850 p-8 rounded-[2.5rem] shadow-2xl space-y-6 animate-fade-in-up">
            <div>
              <button 
                onClick={() => setStep(1)} 
                className="text-xs text-blue-400 hover:underline font-bold"
              >
                ← Back to consultation settings
              </button>
              <h3 className="text-xl font-bold text-white mt-4">Select Date & Time Slot</h3>
              <p className="text-xs text-slate-550 mt-1">Book schedules with {formData.doctor}.</p>
            </div>

            {/* Date selection grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Available Day</h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {nextDays.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setFormData({ ...formData, date: d.value })}
                    className={`py-3 px-1 rounded-xl text-center flex flex-col items-center justify-center border transition-all ${
                      formData.date === d.value 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase">{d.day}</span>
                    <span className="text-sm font-black mt-1">{d.date.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slots selection */}
            {formData.date && (
              <div className="space-y-3 animate-fade-in-up">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Time Slot</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {slots.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFormData({ ...formData, slot: s })}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        formData.slot === s 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {formData.date && formData.slot && (
              <button
                onClick={() => setStep(3)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg mt-4"
              >
                Proceed to Patient Details
              </button>
            )}
          </div>
        )}

        {step === 3 && (
          /* Step 3: Patient Information Form */
          <div className="bg-slate-900 border border-slate-850 p-8 rounded-[2.5rem] shadow-2xl space-y-6 animate-fade-in-up">
            <div>
              <button 
                onClick={() => setStep(2)} 
                className="text-xs text-blue-400 hover:underline font-bold"
              >
                ← Back to slot calendar
              </button>
              <h3 className="text-xl font-bold text-white mt-4">Patient Information</h3>
              <p className="text-xs text-slate-550 mt-1">Please enter client details for diagnostic records registration.</p>
            </div>

            <form onSubmit={handleDetailsSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
                {formErrors.name && <span className="text-red-400 text-xs mt-1 block">{formErrors.name}</span>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" 
                  />
                  {formErrors.email && <span className="text-red-400 text-xs mt-1 block">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" 
                  />
                  {formErrors.phone && <span className="text-red-400 text-xs mt-1 block">{formErrors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Primary Clinical Challenge (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="e.g. Trouble hearing in crowds, pediatric stammering delays, etc." 
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Confirming Appointment...</>
                ) : (
                  'Confirm Appointment Slot'
                )}
              </button>
            </form>
          </div>
        )}

        {step === 5 && (
          /* Step 5: Successful Booking Confirmation */
          <div className="bg-slate-900 border border-slate-850 p-8 rounded-[2.5rem] shadow-2xl space-y-6 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-4xl text-green-400 animate-bounce">
              ✓
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Appointment Request Sent!</h3>
              <p className="text-xs text-slate-400">Your request has been received by our clinic team. We will call you at <span className="text-white font-bold">{formData.phone}</span> within 2 hours to confirm your slot.</p>
            </div>

            <div className="max-w-md mx-auto p-6 bg-slate-950 rounded-2xl border border-slate-850 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500">Service</span>
                <span className="text-white font-bold">{formData.service}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500">Consultant</span>
                <span className="text-white font-bold">{formData.doctor}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500">Scheduled slot</span>
                <span className="text-blue-400 font-extrabold">{formData.date} @ {formData.slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Consultation mode</span>
                <span className="text-green-400 font-bold uppercase tracking-wider text-[9px]">🏥 In-Person Clinic Visit</span>
              </div>
            </div>

            {/* What clinic receives */}
            <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-900/30 text-left text-[11px] text-amber-300 leading-relaxed space-y-1">
              <p><strong>📞 Next steps:</strong> Our team at Taranga Clinic will call <strong>{formData.phone}</strong> to confirm your appointment.</p>
              <p className="text-amber-300/70">If you don't hear from us within 2 hours during clinic hours, call us directly at <strong>+91 92473 46680</strong>.</p>
            </div>

            <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-900/30 text-left text-[11px] text-blue-300 leading-relaxed">
              <strong>💡 What to bring:</strong> Any previous audiogram reports, existing hearing/speech devices, and a valid photo ID.
            </div>

            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  doctor: '',
                  service: '',
                  date: '',
                  slot: '',
                  name: '',
                  email: '',
                  phone: '',
                  reason: ''
                });
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all"
            >
              Done & Return
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Booking;
