import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';

import Resources from './Resources';
import Booking from './Booking';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AccessibilityWidget from './AccessibilityWidget';
import Chatbot from './Chatbot';

// A small helper component to handle scroll-to-top and SEO Title/Meta updates on route change
function PageController() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic title and meta descriptions for SEO
    let title = "Taranga Speech & Hearing Aid Centre - Tenali";
    let desc = "Premier clinic for hearing loss treatments, digital hearing aids, and pediatric speech therapy in Tenali, AP.";

    if (location.pathname === "/shop") {
      title = "Digital Hearing Aids & Speech Devices Store | Taranga Clinic";
      desc = "Shop premium rechargeable invisible hearing aids, speech boards, and diagnostic accessories online with warranty.";
    } else if (location.pathname === "/resources") {
      title = "Hearing Health Blog & Speech Delayed Resources";
      desc = "Explore our articles, download guides for speech training at home, and take our free Hearing Self-Assessment Quiz.";
    } else if (location.pathname === "/booking") {
      title = "Book an Appointment - Audiology & Speech Therapy | Taranga Clinic";
      desc = "Schedule your soundproof diagnostic hearing test or child articulation consult at our Tenali clinic.";
    }

    document.title = title;
    
    // Attempt to update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }
  }, [location]);

  return null;
}

function AppContent() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);


  // Stripe checkout state
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Open cart drawer when adding item
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };



  const validateCard = () => {
    const errors = {};
    if (!cardDetails.name.trim()) errors.name = "Cardholder name is required";
    if (cardDetails.number.replace(/\s/g, '').length !== 16) errors.number = "Enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) errors.expiry = "Use MM/YY format";
    if (cardDetails.cvc.length !== 3) errors.cvc = "CVC must be 3 digits";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!validateCard()) return;

    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentSuccess(true);
      setCart([]); // Clear cart on success
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <PageController />
      
      {/* Header / Navbar */}
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setCartOpen(true)} 
      />

      {/* Pages Container */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} onOpenCart={() => setCartOpen(true)} />} />

          <Route path="/resources" element={<Resources />} />
          <Route path="/booking" element={<Booking />} />
          {/* Legacy redirect for old devices layout */}
          <Route path="/gadgets" element={<Shop onAddToCart={handleAddToCart} onOpenCart={() => setCartOpen(true)} />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-left mb-8">
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm tracking-wide">Taranga Speech & Hearing Aid Centre</h4>
            <p className="leading-relaxed">
              Restoring communication pathways through state-of-the-art diagnostics, high-fidelity digital audiology, and customized therapy.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm tracking-wide font-sans">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="hover:text-blue-400">D2C Clinic Store</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400">Blog Resources & Self-Check</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm tracking-wide">Accreditation</h4>
            <p className="leading-relaxed">
              Certified Licensed Audiology Pathologists. Fully WCAG 2.1 & HIPAA compliance compliant digital systems.
            </p>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-white" aria-label="Facebook">🌐</a>
              <a href="#" className="hover:text-white" aria-label="Twitter">🐦</a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>
        <p className="border-t border-slate-900 pt-6 font-mono text-[10px]">
          &copy; {new Date().getFullYear()} Taranga Speech & Hearing Aid Centre. All rights reserved. Registered Tenali Clinic.
        </p>
      </footer>

      {/* Shopping Cart Sidebar */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Simulated Global Stripe Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          <div onClick={() => { if(!paymentLoading) setCheckoutOpen(false); }} className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => { setCheckoutOpen(false); setPaymentSuccess(false); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl"
              disabled={paymentLoading}
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div className="text-center py-10 space-y-6 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-4xl text-green-400 animate-bounce">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Payment Confirmed!</h3>
                  <p className="text-xs text-slate-400">Order successfully completed. Our clinic team will contact you shortly to arrange device programming and shipping.</p>
                </div>
                <button 
                  onClick={() => { setCheckoutOpen(false); setPaymentSuccess(false); }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Secure Payment Gateway</span>
                  <h3 className="text-xl font-bold text-white">Credit / Debit Card</h3>
                  <p className="text-xs text-slate-500">Demo Mode: Card Number needs 16 digits.</p>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 mb-1.5 uppercase">Cardholder Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Krishna Prasad"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.name && <span className="text-red-400 text-xs mt-1 block">{formErrors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 mb-1.5 uppercase">Card Number</label>
                    <input 
                      type="text" 
                      required
                      maxLength="19"
                      placeholder="4242 4242 4242 4242"
                      value={cardDetails.number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || '';
                        setCardDetails({...cardDetails, number: val});
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.number && <span className="text-red-400 text-xs mt-1 block">{formErrors.number}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 mb-1.5 uppercase">Expiration (MM/YY)</label>
                      <input 
                        type="text" 
                        required
                        maxLength="5"
                        placeholder="12/28"
                        value={cardDetails.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2,4);
                          setCardDetails({...cardDetails, expiry: val});
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                      {formErrors.expiry && <span className="text-red-400 text-xs mt-1 block">{formErrors.expiry}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 mb-1.5 uppercase">CVC Code</label>
                      <input 
                        type="password" 
                        required
                        maxLength="3"
                        placeholder="•••"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value.replace(/\D/g, '')})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                      {formErrors.cvc && <span className="text-red-400 text-xs mt-1 block">{formErrors.cvc}</span>}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-550 text-white font-bold rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Authorizing Stripe...
                    </>
                  ) : (
                    "Confirm & Pay"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Accessibility options */}
      <AccessibilityWidget />

      {/* Floating AI chatbot assistant */}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
