import React, { useState } from 'react';
import { db } from '../db';
import { User, View } from '../types';

interface AdminProps {
  onNavigate: (view: View) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<User[]>(db.getAllUsers());
  const [message, setMessage] = useState<string>('');

  const createSampleArticle = () => {
    const article = db.createNews({
      title: 'Admin: Sample Post',
      content: 'This is a sample article created by admin.',
      categoryId: db.getCategories()[0].id,
      authorId: users[0]?.id || 'u1',
      imageUrl: 'https://picsum.photos/seed/admin/800/400'
    });
    setMessage('Created article: ' + article.title);
    onNavigate('NEWS');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-6">Admin Panel</h1>
      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Users</h2>
        <div className="grid gap-2">
          {users.map(u => (
            <div key={u.id} className="p-3 border rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold">{u.name}</div>
                <div className="text-xs text-gray-500">{u.email} • {u.role}</div>
              </div>
              <div>
                <button className="text-sm text-indigo-600 hover:underline" onClick={() => { navigator.clipboard?.writeText(u.email); setMessage('Copied ' + u.email); }}>
                  Copy Email
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Content</h2>
        <div className="flex gap-3">
          <button onClick={createSampleArticle} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Create Sample Article</button>
          <button onClick={() => onNavigate('HOME')} className="px-4 py-2 border rounded-lg">Back Home</button>
        </div>
      </section>
    </div>
  );
};

export default Admin;
