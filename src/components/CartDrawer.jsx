import React, { useState } from 'react';

function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🛒</span> Shopping Cart
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-6xl text-slate-700">🛒</span>
              <p className="text-slate-400 font-medium">Your shopping cart is empty.</p>
              <button 
                onClick={onClose} 
                className="text-blue-400 hover:text-blue-300 font-semibold underline text-sm"
              >
                Go browse the shop
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
              return (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="w-20 h-20 bg-slate-850 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-white text-sm line-clamp-2">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors text-xs font-semibold"
                          aria-label="Remove Item"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{item.type}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-semibold text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-extrabold text-blue-400 text-sm">
                        ${(itemPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold text-sm">Subtotal</span>
              <span className="text-xl font-black text-white">${total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Shipping & taxes calculated at checkout. Simulated secure payment via Stripe/PayPal.
            </p>
            <button 
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 text-center block text-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
