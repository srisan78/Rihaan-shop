import React from 'react';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Sports Srihan</h1>
          <p className="text-xl text-gray-600">
            Empowering athletes with premium sports gear since 2015. We believe in quality, performance, and passion for the game.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-auto bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000" 
                alt="Sports Equipment" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded by sports enthusiasts, Sports Srihan started as a small local shop in Venkatarayapuram with a simple mission: to provide high-quality sports equipment accessible to everyone.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Over the years, we've grown into a trusted destination for professional athletes, fitness enthusiasts, and beginners alike. We carefully curate our collection to ensure that every product meets our strict standards for durability and performance.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we serve thousands of customers across India, offering a wide range of gear for cricket, football, badminton, and general fitness.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">We never compromise on the quality of our products. Every item is tested for durability.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">Your satisfaction is our priority. We offer expert advice and excellent after-sales support.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance</h3>
              <p className="text-gray-600">We provide gear that helps you perform at your absolute best, regardless of your skill level.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600">We guarantee 100% genuine products sourced directly from authorized manufacturers.</p>
            </div>
          </div>
        </div>

        {/* Local Presence */}
        <div className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the quality of our products firsthand. Visit our flagship store in Venkatarayapuram for expert advice and exclusive in-store offers.
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="block font-bold">Location</span>
              <span className="text-blue-200">Jubilee Hills, Venkatarayapuram</span>
            </div>
            <div className="bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="block font-bold">Timings</span>
              <span className="text-blue-200">10:00 AM - 9:00 PM (Everyday)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
