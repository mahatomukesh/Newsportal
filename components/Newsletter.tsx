import React, { useState } from 'react';
import { db } from '../db';
import Ad from './Ad';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      db.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
      setError('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Stay Updated with Breaking News
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Get the latest headlines delivered straight to your inbox. No spam, just great journalism.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            
            {error && (
              <p className="text-red-200 text-sm mt-2">{error}</p>
            )}
            
            {subscribed && (
              <p className="text-white text-sm mt-2 font-bold">
                ✓ Successfully subscribed! Check your email.
              </p>
            )}
          </form>

          <p className="text-indigo-100 text-xs mt-6">
            🔒 We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Newsletter Ad */}
        <div className="mt-12 pt-8 border-t border-indigo-500/30">
          <div className="text-center mb-4">
            <span className="text-xs text-indigo-200 uppercase tracking-wide font-medium">Advertisement</span>
          </div>
          <div className="flex justify-center">
            <Ad size="mobile" className="max-w-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
