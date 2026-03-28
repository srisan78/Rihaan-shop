import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, CreditCard, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setCheckoutStep('success');
      clearCart();
    }, 1500);
  };

  if (cart.length === 0 && checkoutStep !== 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <ShoppingBag size={80} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any sports gear yet.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-2 text-lg">Thank you for shopping with Sports Srihan.</p>
          <p className="text-gray-500 mb-8">Your order ID is #{Math.floor(Math.random() * 1000000)}</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-blue-900 rounded-md hover:bg-blue-800 transition-colors shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          {checkoutStep === 'cart' ? 'Shopping Cart' : 'Checkout'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {checkoutStep === 'cart' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-xl font-bold text-gray-900">Cart Items ({totalItems})</h2>
                </div>
                
                <ul className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:bg-gray-50/50 transition-colors">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              <Link to={`/product/${item.id}`} className="hover:text-blue-600 transition-colors">{item.name}</Link>
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-extrabold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500 mt-1">₹{item.price.toLocaleString('en-IN')} each</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center border border-gray-300 rounded-md bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 font-bold text-gray-900 border-x border-gray-300 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center text-sm font-medium transition-colors"
                          >
                            <Trash2 size={16} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                  <button 
                    onClick={() => setCheckoutStep('cart')}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Back to Cart
                  </button>
                </div>
                
                <form id="checkout-form" onSubmit={handleCheckout} className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">Delivery Address</label>
                      <textarea 
                        id="address" 
                        name="address" 
                        rows={3} 
                        required 
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="House/Flat No., Street, Landmark"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">City</label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        required 
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="Hyderabad"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                      <input 
                        type="text" 
                        id="pincode" 
                        name="pincode" 
                        required 
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="500033"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Payment Method</h3>
                  <div className="space-y-4">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <Banknote className="ml-4 mr-3 text-green-600" size={24} />
                      <div>
                        <span className="block text-base font-bold text-gray-900">Cash on Delivery (COD)</span>
                        <span className="block text-sm text-gray-500">Pay when you receive the order</span>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'online' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="online" 
                        checked={paymentMethod === 'online'} 
                        onChange={() => setPaymentMethod('online')}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <CreditCard className="ml-4 mr-3 text-blue-600" size={24} />
                      <div>
                        <span className="block text-base font-bold text-gray-900">UPI / Credit / Debit Card</span>
                        <span className="block text-sm text-gray-500">Secure online payment</span>
                      </div>
                    </label>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">Included</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-extrabold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              {checkoutStep === 'cart' ? (
                <button 
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full flex items-center justify-center px-6 py-4 bg-orange-500 text-white text-lg font-bold rounded-md hover:bg-orange-600 transition-colors shadow-md"
                >
                  Proceed to Checkout <ArrowRight size={20} className="ml-2" />
                </button>
              ) : (
                <button 
                  type="submit"
                  form="checkout-form"
                  className="w-full flex items-center justify-center px-6 py-4 bg-green-500 text-white text-lg font-bold rounded-md hover:bg-green-600 transition-colors shadow-md"
                >
                  Place Order
                </button>
              )}
              
              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <ShieldCheck size={16} className="mr-1 text-green-500" />
                <span>Safe and secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
