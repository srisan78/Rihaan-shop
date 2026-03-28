import React, { useState, useEffect } from 'react';
import { X, Gift, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('srihan_has_seen_popup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('srihan_has_seen_popup', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 bg-white/80 rounded-full p-1 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="h-48 bg-orange-500 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <Gift size={80} className="text-white relative z-10 animate-bounce" />
        </div>
        
        <div className="p-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Offer!</h2>
          <p className="text-gray-600 mb-6 text-lg">Get <span className="font-bold text-orange-500">10% OFF</span> on your first purchase. Use code below at checkout.</p>
          
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg py-3 px-6 mb-6 inline-block">
            <span className="text-2xl font-mono font-bold tracking-widest text-gray-900">SRIHAN10</span>
          </div>
          
          <button 
            onClick={closePopup}
            className="w-full py-4 bg-blue-900 text-white font-bold rounded-md hover:bg-blue-800 transition-colors shadow-md"
          >
            Claim Discount
          </button>
          <p className="text-xs text-gray-400 mt-4">Valid for new customers only. T&C apply.</p>
        </div>
      </div>
    </div>
  );
}

export function RecentPurchasePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProduct] = useState({ name: '', time: '' });

  const purchases = [
    { name: 'Pro Grade English Willow Cricket Bat', time: '2 minutes ago' },
    { name: 'Adjustable Dumbbell Set (20kg)', time: '15 minutes ago' },
    { name: 'Official Match Football - Size 5', time: '1 hour ago' },
    { name: 'Yoga Mat with Alignment Lines', time: '3 hours ago' },
  ];

  useEffect(() => {
    // Show first popup after 15 seconds
    const initialTimer = setTimeout(() => {
      showRandomPurchase();
    }, 15000);

    // Then show randomly every 45-90 seconds
    const interval = setInterval(() => {
      showRandomPurchase();
    }, Math.floor(Math.random() * 45000) + 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const showRandomPurchase = () => {
    const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
    setProduct(randomPurchase);
    setIsVisible(true);
    
    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-6 z-40 bg-white rounded-lg shadow-xl border border-gray-100 p-4 max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-300 flex items-start space-x-4">
      <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
        <ShoppingBag size={20} className="text-orange-500" />
      </div>
      <div className="flex-1 pr-6">
        <p className="text-xs text-gray-500 mb-1">Someone recently purchased</p>
        <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{product.name}</p>
        <p className="text-xs text-blue-600">{product.time}</p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={14} />
      </button>
    </div>
  );
}
