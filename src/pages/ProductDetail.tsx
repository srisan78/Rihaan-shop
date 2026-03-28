import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, MessageCircle, Truck, ShieldCheck, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-8 text-center">The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="px-6 py-3 bg-blue-900 text-white font-bold rounded-md hover:bg-blue-800 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi Sports Srihan Shop, I want to order:\n\n*${product.name}*\nQuantity: ${quantity}\nPrice: ₹${(product.price * quantity).toLocaleString('en-IN')}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-blue-600">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-blue-600">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Product Image */}
            <div className="relative h-96 md:h-auto bg-gray-100 p-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
              />
              {product.originalPrice > product.price && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md shadow-sm">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wide">
                  {product.category}
                </span>
                {product.stock <= 5 && (
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded flex items-center">
                    <AlertCircle size={12} className="mr-1" /> Only {product.stock} left in stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-gray-600 ml-2 font-medium">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium mt-1">Inclusive of all taxes</p>
              </div>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity and Actions */}
              <div className="mt-auto">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-bold text-gray-900 border-x border-gray-300 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex items-center justify-center px-6 py-4 border-2 border-blue-900 text-blue-900 font-bold rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <ShoppingBag size={20} className="mr-2" /> Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex items-center justify-center px-6 py-4 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
                
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center px-6 py-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors shadow-md"
                >
                  <MessageCircle size={20} className="mr-2" /> Order via WhatsApp
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <Truck size={24} className="text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck size={24} className="text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RefreshCw size={24} className="text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-gray-600">7 Days Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-colors ${activeTab === 'description' ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-colors ${activeTab === 'features' ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-colors ${activeTab === 'reviews' ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </div>
          
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">{product.description}</p>
                <p className="mt-4 text-lg leading-relaxed">
                  At Sports Srihan, we ensure that all our products meet the highest quality standards. 
                  This {product.name.toLowerCase()} is sourced directly from authorized distributors to guarantee authenticity.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-8 bg-gray-50 p-6 rounded-xl">
                  <div className="text-center mr-8">
                    <div className="text-5xl font-extrabold text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex text-yellow-400 justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {product.reviews} reviews</div>
                  </div>
                  <div className="flex-1">
                    {/* Mock rating bars */}
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center mb-1">
                        <span className="text-sm font-medium text-gray-600 w-8">{star} <Star size={12} className="inline text-yellow-400 fill-current" /></span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-10 text-right">
                          {Math.round(product.reviews * (star === 5 ? 0.7 : star === 4 ? 0.2 : star === 3 ? 0.05 : star === 2 ? 0.03 : 0.02))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Mock Reviews */}
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">A</div>
                        <span className="font-bold text-gray-900">Arun Kumar</span>
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                    </div>
                    <p className="text-gray-700">Excellent quality product. Exactly as described. Fast delivery by Sports Srihan.</p>
                  </div>
                  
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold mr-3">S</div>
                        <span className="font-bold text-gray-900">Sneha Reddy</span>
                      </div>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(4)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                      <Star size={16} className="text-gray-300" />
                    </div>
                    <p className="text-gray-700">Very good product for the price. The packaging was secure.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
