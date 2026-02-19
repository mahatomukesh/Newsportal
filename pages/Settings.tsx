import React, { useState, useEffect } from 'react';

interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  articlesPerPage: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const Settings: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    fontSize: 'medium',
    articlesPerPage: 12,
    emailNotifications: true,
    pushNotifications: false
  });

  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('user_preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        console.error('Failed to load preferences:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleReset = () => {
    const defaults: UserPreferences = {
      theme: 'light',
      fontSize: 'medium',
      articlesPerPage: 12,
      emailNotifications: true,
      pushNotifications: false
    };
    setPreferences(defaults);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure? This will clear all bookmarks, search history, and preferences.')) {
      localStorage.removeItem('bookmarks');
      localStorage.removeItem('search_history');
      localStorage.removeItem('user_preferences');
      handleReset();
      setShowSaveMessage(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">⚙️ Settings & Preferences</h1>
        <p className="text-gray-600">Customize your reading experience</p>
      </div>

      {/* Success Message */}
      {showSaveMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
          ✓ Preferences saved successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Display Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🎨 Display Settings</h2>

          {/* Theme */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Theme</label>
            <div className="flex gap-4">
              {(['light', 'dark'] as const).map((theme) => (
                <label key={theme} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={theme}
                    checked={preferences.theme === theme}
                    onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' })}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-700 capitalize">{theme} Mode</span>
                </label>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Font Size</label>
            <select
              value={preferences.fontSize}
              onChange={(e) => setPreferences({ ...preferences, fontSize: e.target.value as 'small' | 'medium' | 'large' })}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📄 Content Settings</h2>

          {/* Articles Per Page */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Articles per Page</label>
            <input
              type="number"
              min="6"
              max="50"
              step="6"
              value={preferences.articlesPerPage}
              onChange={(e) => setPreferences({ ...preferences, articlesPerPage: parseInt(e.target.value) })}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">Default: 12 articles</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🔔 Notifications</h2>

          {/* Email Notifications */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
            />
            <label className="ml-3 text-gray-700 cursor-pointer">
              <span className="font-medium">Email Notifications</span>
              <p className="text-sm text-gray-500 mt-1">Receive daily/weekly digest emails</p>
            </label>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.pushNotifications}
              onChange={(e) => setPreferences({ ...preferences, pushNotifications: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
            />
            <label className="ml-3 text-gray-700 cursor-pointer">
              <span className="font-medium">Push Notifications</span>
              <p className="text-sm text-gray-500 mt-1">Get notified about breaking news</p>
            </label>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">👤 Account</h2>
          <button 
            onClick={handleClearAllData}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-medium border border-red-200 rounded-lg hover:bg-red-50 transition">
            Clear All Data
          </button>
          <p className="text-sm text-gray-500 mt-2">This will clear all your bookmarks, search history, and preferences</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            💾 Save Settings
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
          >
            ↻ Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
