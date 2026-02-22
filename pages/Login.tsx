
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { db } from '../db';

interface LoginProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = db.getUserByEmail(email);
    // Simple demo password check: all demo accounts use password 'password'
    if (user && password === 'password') {
      onLogin(user);
    } else {
      setError('Invalid credentials. Use demo password: "password" for provided autofill accounts.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-black text-center mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to manage your account</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="e.g. admin@chronicle.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              required
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95">
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-4">Demo Credentials:</p>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => { setEmail('admin@ramblog.com'); setPassword('password'); }}
              className="text-xs text-indigo-600 bg-indigo-50 py-2 rounded-lg hover:bg-indigo-100 transition"
            >
              Autofill Admin
            </button>
            <button 
              onClick={() => { setEmail('jane@example.com'); setPassword('password'); }}
              className="text-xs text-indigo-600 bg-indigo-50 py-2 rounded-lg hover:bg-indigo-100 transition"
            >
              Autofill User
            </button>
          </div>
          <button 
            onClick={onCancel}
            className="mt-6 text-gray-400 hover:text-gray-600 text-sm font-medium"
          >
            Cancel and Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
