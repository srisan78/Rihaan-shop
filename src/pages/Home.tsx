import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Star, Truck, ShieldCheck, RefreshCw, Clock, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=2000" 
            alt="Sports Equipment" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Your One-Stop Shop for All Sports Gear
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-medium">
              High Quality | Best Price | Fast Delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors shadow-lg"
              >
                <ShoppingBag className="mr-2" size={20} />
                Shop Now
              </Link>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-900 bg-white rounded-md hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MessageCircle className="mr-2 text-green-500" size={20} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {[
              { name: 'Cricket', icon: '🏏', path: '/shop?category=Cricket' },
              { name: 'Football', icon: '⚽', path: '/shop?category=Football' },
              { name: 'Gym', icon: '🏋️', path: '/shop?category=Gym+Equipment' },
              { name: 'Badminton', icon: '🏸', path: '/shop?category=Badminton' },
              { name: 'Fitness', icon: '🧘‍♀️', path: '/shop?category=Fitness+Accessories' },
            ].map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-semibold text-gray-800">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offers / Deals Section */}
      <section className="py-12 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start">
                <Clock className="mr-2" /> Limited Time Offer!
              </h2>
              <p className="text-orange-100 text-lg">Get up to 40% off on premium cricket gear.</p>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl font-bold font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs uppercase tracking-wider">Hours</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold font-mono">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs uppercase tracking-wider">Mins</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold font-mono">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs uppercase tracking-wider">Secs</div>
              </div>
            </div>
            
            <Link 
              to="/shop" 
              className="mt-6 md:mt-0 px-6 py-3 bg-white text-orange-600 font-bold rounded-md hover:bg-gray-100 transition-colors shadow-sm"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
            <Link to="/shop" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center hidden sm:flex">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden group flex flex-col">
                <Link to={`/product/${product.id}`} className="relative block h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  {product.stock <= 5 && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      <Clock size={12} className="mr-1" /> Only {product.stock} left
                    </div>
                  )}
                </Link>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm text-gray-600 ml-1 font-medium">{product.rating} ({product.reviews})</span>
                  </div>
                  
                  <Link to={`/product/${product.id}`} className="block mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-blue-900 text-white py-2.5 rounded-md font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag size={18} className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Sports Srihan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={40} className="text-blue-600" />, title: 'Fast Delivery', desc: 'Free shipping on orders over ₹999' },
              { icon: <ShieldCheck size={40} className="text-blue-600" />, title: 'Best Price Guarantee', desc: 'We match prices from competitors' },
              { icon: <RefreshCw size={40} className="text-blue-600" />, title: 'Easy Returns', desc: '7-day hassle-free return policy' },
              { icon: <Star size={40} className="text-blue-600" />, title: 'Trusted by Customers', desc: 'Over 10,000+ happy athletes' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', role: 'Club Cricketer', text: 'Bought the Pro Grade Willow bat. The balance is incredible and the ping is just perfect. Highly recommended!', rating: 5 },
              { name: 'Priya Patel', role: 'Fitness Enthusiast', text: 'The adjustable dumbbells are perfect for my home gym. Great quality and fast delivery to Bangalore.', rating: 5 },
              { name: 'Arjun Reddy', role: 'Football Coach', text: 'Ordered 10 match balls for our academy. Genuine products at the best wholesale price. Will buy again.', rating: 4 },
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 relative">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-lg mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold mb-6">Get Your Sports Gear Today!</h2>
          <p className="text-xl text-blue-100 mb-10">Join thousands of athletes who trust Sports Srihan for their equipment needs.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors shadow-lg"
            >
              Shop Collection
            </Link>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg font-bold text-blue-900 bg-white rounded-md hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
            >
              <MessageCircle className="mr-2 text-green-500" size={24} />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
