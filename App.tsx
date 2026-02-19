
import React, { useState, useEffect, useMemo } from 'react';
import { View, AuthState, User, UserRole, NewsArticle, Category } from './types';
import { db } from './db';

// Components
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import BreakingNewsBanner from './components/BreakingNewsBanner';
import HeaderAds from './components/HeaderAds';
import Home from './pages/Home';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SystemDocs from './pages/SystemDocs';
import AboutUs from './pages/AboutUs';
import Archive from './pages/Archive';
import Bookmarks from './pages/Bookmarks';
import Settings from './pages/Settings';
import StickyAd from './components/StickyAd';
import PopUpAd from './components/PopUpAd';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
    setSearchQuery('');
    setCurrentView('NEWS');
  };

  const handleSearch = (query: string) => {
    setSelectedCategoryId(null);
    setSearchQuery(query);
    setCurrentView('NEWS');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Guarded routing logic
  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onNavigateNews={() => setCurrentView('NEWS')} onNavigateDetail={navigateToArticle} />;
      case 'NEWS':
        return <NewsList categoryId={selectedCategoryId} initialSearch={searchQuery} onNavigateDetail={navigateToArticle} onSearchChange={handleSearchChange} />;
      case 'NEWS_DETAIL':
        return <NewsDetail articleId={selectedArticleId!} onBack={() => setCurrentView('NEWS')} onNavigateDetail={navigateToArticle} />;
      case 'ARCHIVE':
        return <Archive onNavigateDetail={navigateToArticle} />;
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
      case 'BLOG':
        return <NewsList categoryId={selectedCategoryId} initialSearch={searchQuery} onNavigateDetail={navigateToArticle} onSearchChange={handleSearchChange} />;
      case 'SYSTEM_DOCS':
        return <SystemDocs />;
      case 'BOOKMARKS':
        return <Bookmarks onNavigateDetail={navigateToArticle} />;
      case 'SETTINGS':
        return <Settings />;
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
        onSearch={handleSearch}
        isAuthenticated={auth.isAuthenticated}
        user={auth.user}
      />
      <BreakingNewsBanner onClick={navigateToArticle} />
      <HeaderAds className="px-4 py-4 bg-gray-50" />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl w-full">
        {renderContent()}
      </main>
      {currentView !== 'NEWS_DETAIL' && <Newsletter />}
      <Footer onNavigate={setCurrentView} />
      <ScrollToTopButton />
      <StickyAd />
      <PopUpAd />
    </div>
  );
};

export default App;

