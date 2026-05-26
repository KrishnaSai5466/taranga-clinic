import React, { useState } from 'react';

function Shop({ onAddToCart, onOpenCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutActive, setCheckoutActive] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [formErrors, setFormErrors] = useState({});

  const products = [
    { 
      id: 1, 
      name: "Oticon Real 1 miniRITE", 
      type: "Hearing Aid", 
      price: "$2,499", 
      description: "Premium receiver-in-canal digital hearing aid with BrainHearing™ technology. Delivers access to the full sound scene, suppresses sudden loud sounds, and streams audio directly from iPhone and Android.",
      image: "/hearing_aid_premium.png",
      rating: 4.9,
      specs: ["BrainHearing™ sound processing", "SuddenSound Stabilizer", "Bluetooth LE Audio streaming", "Rechargeable Li-ion battery"]
    },
    { 
      id: 2, 
      name: "Phonak Audéo Lumity L90", 
      type: "Hearing Aid", 
      price: "$2,650", 
      description: "Top-tier smart hearing aid focusing on speech understanding in background noise. Features StereoZoom 2.0 and SpeechSensor to track speech from 360 degrees.",
      image: "/hearing_aid_premium.png",
      rating: 4.8,
      specs: ["SmartSpeech Technology", "Universal Bluetooth connectivity", "Waterproof and sweatproof", "Health data tracking"]
    },
    { 
      id: 3, 
      name: "Signia Silk Charge&Go 7IX", 
      type: "Hearing Aid", 
      price: "$1,999", 
      description: "The world's only ready-to-wear completely-in-canal (CIC) rechargeable hearing aid. Fits snugly inside the ear canal, practically invisible, with a pocket-sized charging case.",
      image: "/hearing_aid_premium.png",
      rating: 4.7,
      specs: ["Instant-fit ultra compact CIC", "Binaural OneMic directionality", "Inductive pocket charger", "Signia App control"]
    },
    { 
      id: 4, 
      name: "TalkerGo Speech Board", 
      type: "Speech Aid", 
      price: "$349", 
      description: "Electronic speech generating device (SGD) for individuals with vocal impairments, stroke recovery, or aphasia. Clean touchscreen layout with pre-recorded high-fidelity voice output.",
      image: "/speech_therapy_session.png",
      rating: 4.6,
      specs: ["8-inch high contrast screen", "Text-to-speech engine", "Long battery life (12 hours)", "Customizable grid layout"]
    },
    { 
      id: 5, 
      name: "Speech Delay Workbook", 
      type: "Books", 
      price: "$45", 
      description: "A comprehensive, clinic-tested guidebook containing 100+ daily articulation exercises, phonetics cards, and tongue placement tips for parents and therapists.",
      image: "/speech_therapy_session.png",
      rating: 4.9,
      specs: ["Co-written by clinical pathologists", "Color-coded exercises", "Downloadable sound cards", "Ages 2 to 10"]
    },
    { 
      id: 6, 
      name: "Custom Noise-Protection Plug", 
      type: "Accessories", 
      price: "$85", 
      description: "High-fidelity custom earplugs molded from medical-grade silicone. Lowers noise decibels evenly across frequencies, preserving audio quality. Perfect for concerts and noisy workplaces.",
      image: "/hearing_aid_premium.png",
      rating: 4.5,
      specs: ["Custom-molded comfort fit", "-20dB flat attenuation filter", "Medical-grade hypoallergenic silicone", "Removable lanyard cord"]
    }
  ];

  // Filtering logic
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === "All" || p.type === category)
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
      if (sortBy === "price-low-high") return priceA - priceB;
      if (sortBy === "price-high-low") return priceB - priceA;
      return 0;
    });

  // Handle card inputs validation
  const validateCard = () => {
    const errors = {};
    if (!cardDetails.name.trim()) errors.name = "Cardholder name required";
    if (cardDetails.number.replace(/\s/g, '').length !== 16) errors.number = "Enter valid 16-digit card number";
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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-650 pb-16">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-left space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          D2C Devices & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gadgets</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Purchase premium digital hearing aids, therapeutic learning tools, and clinical accessories directly. Includes clinic configuration warranty.
        </p>
      </header>

      {/* Catalog Filters */}
      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-8">
        {/* Left side Filter Panel */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Search bar */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Search Shop</h4>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Oticon, Workbook..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Categories</h4>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {["All", "Hearing Aid", "Speech Aid", "Accessories", "Books"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    category === cat 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'bg-slate-950 hover:bg-slate-850 text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Sort By</h4>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="default">Relevance</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Right side Catalog Grid */}
        <section className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-900">
              <span className="text-5xl">🔍</span>
              <p className="text-slate-400 font-bold mt-4">No devices found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-slate-900 border border-slate-850 rounded-[2rem] overflow-hidden group hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full bg-slate-950 border-b border-slate-850">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-slate-950/80 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-blue-400 border border-slate-800">
                        {product.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-white text-md group-hover:text-blue-400 transition-colors line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-amber-400">
                          <span>★</span>
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-850/50">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Pricing from</span>
                        <span className="text-lg font-black text-white">{product.price}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold transition-colors"
                        >
                          Specs & Details
                        </button>
                        <button 
                          onClick={() => onAddToCart(product)}
                          className="py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-850 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-850 transition-colors"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">{selectedProduct.type}</span>
                  <h3 className="text-2xl font-black text-white mt-1">{selectedProduct.name}</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{selectedProduct.description}</p>
                <div className="text-2xl font-black text-white">{selectedProduct.price}</div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-350 uppercase">Key Specifications</h4>
                  <ul className="space-y-1">
                    {selectedProduct.specs.map((spec, i) => (
                      <li key={i} className="text-slate-450 text-xs flex items-center gap-2">
                        <span className="text-blue-500">•</span> {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => { onAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Checkout Portal Modal */}
      {checkoutActive && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          <div onClick={() => setCheckoutActive(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setCheckoutActive(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl"
              disabled={paymentLoading || paymentSuccess}
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div className="text-center py-10 space-y-6 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-4xl text-green-400 animate-bounce">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Order Confirmed!</h3>
                  <p className="text-xs text-slate-400">A receipt has been sent to your registered email. Our clinic staff will contact you for programming setup.</p>
                </div>
                <button 
                  onClick={() => { setCheckoutActive(false); setPaymentSuccess(false); }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-bold text-white">Simulated Stripe Portal</h3>
                  <p className="text-xs text-slate-500">Provide card information to complete purchase.</p>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">CARDHOLDER NAME</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.name && <span className="text-red-400 text-xs mt-1 block">{formErrors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">CARD NUMBER</label>
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
                      <label className="block text-xs font-semibold text-slate-400 mb-2">EXPIRATION (MM/YY)</label>
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
                      <label className="block text-xs font-semibold text-slate-400 mb-2">CVC CODE</label>
                      <input 
                        type="password" 
                        required
                        maxLength="3"
                        placeholder="123"
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
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    "Authorize & Pay Now"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
