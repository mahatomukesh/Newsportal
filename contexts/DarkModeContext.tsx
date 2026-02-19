import React, { createContext, useContext, useState, useEffect } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedPreferences = localStorage.getItem('user_preferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setIsDarkMode(prefs.theme === 'dark');
      } catch (e) {
        console.error('Failed to load preferences:', e);
      }
    }
    
    // Check system preference if no saved preference
    if (!savedPreferences && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      // Update localStorage
      const savedPreferences = localStorage.getItem('user_preferences');
      const prefs = savedPreferences ? JSON.parse(savedPreferences) : {};
      prefs.theme = newValue ? 'dark' : 'light';
      localStorage.setItem('user_preferences', JSON.stringify(prefs));
      return newValue;
    });
  };

  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    // Update localStorage
    const savedPreferences = localStorage.getItem('user_preferences');
    const prefs = savedPreferences ? JSON.parse(savedPreferences) : {};
    prefs.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('user_preferences', JSON.stringify(prefs));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};
