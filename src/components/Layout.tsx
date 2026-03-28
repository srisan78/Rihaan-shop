import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, MessageCircle, MapPin, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DiscountPopup, RecentPurchasePopup } from './Popups';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Popups */}
      <DiscountPopup />
      <RecentPurchasePopup />

      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 flex justify-between items-center">

        <div className="flex items-center space-x-4">
          <span className="flex items-center"><Phone size={14} className="mr-1" /> +91 98765 43210</span>
          <span className="hidden sm:flex items-center"><MapPin size={14} className="mr-1" /> Hyderabad, India</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline">Free Delivery on orders over ₹999</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-800 tracking-tight flex items-center">
                <span className="text-orange-500 mr-1">SPORTS</span> SRIHAN
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                    location.pathname === link.path ? 'text-orange-500' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-orange-500 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Sports%20Srihan%20Shop,%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center justify-center animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                <span className="text-orange-500">SPORTS</span> SRIHAN
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Your one-stop shop for all high-quality sports gear. Best prices and fast delivery guaranteed.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Shop</Link></li>
                <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/shop?category=Cricket" className="hover:text-orange-500 transition-colors">Cricket</Link></li>
                <li><Link to="/shop?category=Football" className="hover:text-orange-500 transition-colors">Football</Link></li>
                <li><Link to="/shop?category=Gym+Equipment" className="hover:text-orange-500 transition-colors">Gym Equipment</Link></li>
                <li><Link to="/shop?category=Badminton" className="hover:text-orange-500 transition-colors">Badminton</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-orange-500" />
                  <span>123 Sports Avenue, Jubilee Hills, Hyderabad, Telangana 500033</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 flex-shrink-0 text-orange-500" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <MessageCircle size={16} className="mr-2 flex-shrink-0 text-orange-500" />
                  <span>WhatsApp Available</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Sports Srihan Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
