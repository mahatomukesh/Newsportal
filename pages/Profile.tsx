
import React, { useState } from 'react';
import { User, UserRole, NewsArticle } from '../types';
import { db } from '../db';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', categoryId: '1' });
  const isAdmin = user.role === UserRole.ADMIN;
  const categories = db.getCategories();
  const articles = db.getNews();

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    db.createNews({
      ...newArticle,
      authorId: user.id,
      imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`,
      isTrending: false
    });
    setNewArticle({ title: '', content: '', categoryId: '1' });
    setIsEditing(false);
    alert('Article created successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this article?')) {
      db.deleteNews(id);
      window.location.reload(); // Quick way to refresh for mock db
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <div className="h-32 bg-indigo-600 w-full" />
        <div className="px-8 pb-8 flex flex-col items-center -mt-16 sm:flex-row sm:items-end sm:gap-6 sm:px-12">
          <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
            <div className="w-full h-full rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-4xl font-black">
              {user.name.charAt(0)}
            </div>
          </div>
          <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
            <h1 className="text-3xl font-black text-gray-900">{user.name}</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
              {user.role}
            </span>
          </div>
          <button 
            onClick={onLogout}
            className="mt-6 sm:mt-0 px-6 py-2 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isAdmin && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Content Management</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              {isEditing ? 'Cancel' : 'Create Article'}
            </button>
          </div>

          {isEditing && (
            <form onSubmit={handleCreateArticle} className="bg-white p-8 rounded-3xl border border-indigo-200 shadow-xl space-y-4">
              <h3 className="text-xl font-bold mb-4">New Article</h3>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={newArticle.title}
                  onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={newArticle.categoryId}
                    onChange={e => setNewArticle({...newArticle, categoryId: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={newArticle.content}
                  onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition">
                Publish Article
              </button>
            </form>
          )}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Article</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map(art => (
                  <tr key={art.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-bold text-gray-900">{art.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(art.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button className="text-indigo-600 font-bold text-sm">Edit</button>
                        <button onClick={() => handleDelete(art.id)} className="text-red-600 font-bold text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center">
          <p className="text-gray-500 font-medium">You are logged in as a Regular User. You can browse all news articles, but administrative features are restricted.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
