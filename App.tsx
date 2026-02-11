
import React, { useState, useEffect, useMemo } from 'react';
import { View, AuthState, User, UserRole, NewsArticle, Category } from './types';
import { db } from './db';

// Components
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SystemDocs from './pages/SystemDocs';
import AboutUs from './pages/AboutUs';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { user: null, token: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLogin = (user: User) => {
    setAuth({
      user,
      token: 'mock-jwt-token-' + Math.random(),
      isAuthenticated: true
    });
    setCurrentView('HOME');
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
    setCurrentView('HOME');
  };

  const navigateToArticle = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('NEWS_DETAIL');
  };

  const navigateToNews = (categoryId?: string) => {
    setSelectedCategoryId(categoryId || null);
    setCurrentView('NEWS');
  };

  // Guarded routing logic
  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onNavigateNews={() => setCurrentView('NEWS')} onNavigateDetail={navigateToArticle} />;
      case 'NEWS':
        return <NewsList categoryId={selectedCategoryId} onNavigateDetail={navigateToArticle} />;
      case 'NEWS_DETAIL':
        return <NewsDetail articleId={selectedArticleId!} onBack={() => setCurrentView('NEWS')} />;
      case 'ABOUT':
        return <AboutUs />;
      case 'PROFILE':
        return auth.isAuthenticated ? (
          <Profile user={auth.user!} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} onCancel={() => setCurrentView('HOME')} />
        );
      case 'LOGIN':
        return <Login onLogin={handleLogin} onCancel={() => setCurrentView('HOME')} />;
      case 'SYSTEM_DOCS':
        return <SystemDocs />;
      default:
        return <Home onNavigateNews={() => setCurrentView('NEWS')} onNavigateDetail={navigateToArticle} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView}
        onNavigateToNews={navigateToNews}
        isAuthenticated={auth.isAuthenticated}
        user={auth.user}
      />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {renderContent()}
      </main>
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">RamjiBlog</h3>
              <p className="text-gray-400">Delivering reliable, unbiased news and insights to your screen since 2024. Stay informed with the latest updates from around the globe.</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-default">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Shankhamul,Lalitpur-11</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@ramblog.com" className="text-sm">teraitimes@gmail.com.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+15550001234" className="text-sm">+9779807149030</a>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.34a4.178 4.178 0 110-8.356 4.178 4.178 0 010 8.356zm4.72-9.035a1.119 1.119 0 112.238 0 1.119 1.119 0 01-2.238 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => setCurrentView('HOME')} className="hover:text-white transition flex items-center gap-2"><span>&bull;</span> Home</button></li>
              <li><button onClick={() => setCurrentView('NEWS')} className="hover:text-white transition flex items-center gap-2"><span>&bull;</span> All News</button></li>
              <li><button onClick={() => setCurrentView('ABOUT')} className="hover:text-white transition flex items-center gap-2"><span>&bull;</span> About Us</button></li>
              <li><button onClick={() => setCurrentView('PROFILE')} className="hover:text-white transition flex items-center gap-2"><span>&bull;</span> User Profile</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6">Get the top headlines delivered daily to your inbox. No spam, just pure journalism.</p>
            <div className="flex">
              <input type="email" placeholder="Your email address" className="bg-gray-800 border-none rounded-l-lg px-4 py-3 w-full focus:ring-1 focus:ring-indigo-500 transition outline-none" />
              <button className="bg-indigo-600 px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition font-bold">Join</button>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest font-bold">Secure & Encrypted</p>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl text-center border-t border-gray-800 pt-6">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} RamjiBlog. All rights reserved.</p>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default App;