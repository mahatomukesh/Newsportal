import React from 'react';
import { View } from '../types';
import Ad from './Ad';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black text-white mb-4">The Terai Times</h3>
            <p className="text-sm text-gray-400 mb-6">
              Bringing you the latest news, insights, and stories from around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16.5 7.5a2 2 0 100-4 2 2 0 000 4zM6 13l4-5 4 4 7-8" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('HOME')} className="text-gray-400 hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('NEWS')} className="text-gray-400 hover:text-white transition">
                  Browse News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('BLOG')} className="text-gray-400 hover:text-white transition">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ARCHIVE')} className="text-gray-400 hover:text-white transition">
                  Archive
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ABOUT')} className="text-gray-400 hover:text-white transition">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Technology</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Politics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Business</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Sports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Entertainment</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Advertise</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Ads */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="text-center mb-6">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Advertisement</span>
          </div>
          <div className="flex justify-center">
            <Ad size="banner" className="max-w-4xl" />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} The Terai Times. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Made with 💜 for Nepal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
