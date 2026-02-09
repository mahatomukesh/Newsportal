
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Our Mission</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          At Chronicle, we believe in the power of truth and the importance of staying informed. 
          Our mission is to deliver high-quality, unbiased journalism to a global audience.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800" alt="Newsroom" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Integrity First</h2>
          <p className="text-gray-600 leading-relaxed">
            In an era of rapid information exchange, accuracy is our highest priority. 
            Our team of dedicated reporters works tirelessly to verify sources and provide 
            context to every story we publish.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Verified Sources</h4>
                <p className="text-sm text-gray-500">Every claim is backed by multi-point verification.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Unbiased Reporting</h4>
                <p className="text-sm text-gray-500">We present the facts, leaving the conclusions to you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
        <h2 className="text-3xl font-bold mb-12">Meet the Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=1" alt="CEO" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Marcus Chen</h4>
              <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">Editor in Chief</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=2" alt="CTO" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Sarah Jenkins</h4>
              <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">Head of Content</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=3" alt="COO" />
            </div>
            <div>
              <h4 className="font-bold text-lg">David Miller</h4>
              <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">Lead Journalist</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
