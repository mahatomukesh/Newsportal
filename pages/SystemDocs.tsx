
import React from 'react';

const SystemDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Developer Overview</h1>
        <p className="text-xl text-gray-500 mt-2">Architecture, SQL Schema, and API Endpoints for the News Hub.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm">1</span>
          PostgreSQL Database Schema
        </h2>
        <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-indigo-300 text-sm font-mono leading-relaxed">
{`-- SQL Definition for Chronicle News Hub
CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm">2</span>
          RESTful API Endpoints
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-black text-gray-400 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 font-black text-gray-400 uppercase tracking-widest">Endpoint</th>
                <th className="px-6 py-4 font-black text-gray-400 uppercase tracking-widest">Access</th>
                <th className="px-6 py-4 font-black text-gray-400 uppercase tracking-widest">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded">GET</span></td>
                <td className="px-6 py-4 font-mono">/api/news</td>
                <td className="px-6 py-4">Public</td>
                <td className="px-6 py-4">Fetch all news (with filters)</td>
              </tr>
              <tr>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded">GET</span></td>
                <td className="px-6 py-4 font-mono">/api/news/:id</td>
                <td className="px-6 py-4">Public</td>
                <td className="px-6 py-4">Detailed news view</td>
              </tr>
              <tr>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">POST</span></td>
                <td className="px-6 py-4 font-mono">/api/news</td>
                <td className="px-6 py-4 text-indigo-600 font-bold">Admin</td>
                <td className="px-6 py-4">Create news article</td>
              </tr>
              <tr>
                <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded">PUT</span></td>
                <td className="px-6 py-4 font-mono">/api/news/:id</td>
                <td className="px-6 py-4 text-indigo-600 font-bold">Admin</td>
                <td className="px-6 py-4">Update existing article</td>
              </tr>
              <tr>
                <td className="px-6 py-4"><span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded">DELETE</span></td>
                <td className="px-6 py-4 font-mono">/api/news/:id</td>
                <td className="px-6 py-4 text-indigo-600 font-bold">Admin</td>
                <td className="px-6 py-4">Remove article</td>
              </tr>
              <tr>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">POST</span></td>
                <td className="px-6 py-4 font-mono">/api/auth/login</td>
                <td className="px-6 py-4">Public</td>
                <td className="px-6 py-4">JWT Issuance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold mb-4">Authentication Flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="font-bold text-indigo-600 mb-2">Step 1</div>
            <p className="text-gray-600 leading-relaxed">User sends credentials to <span className="font-mono text-xs">/api/auth/login</span>. Server validates password hash using Bcrypt.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="font-bold text-indigo-600 mb-2">Step 2</div>
            <p className="text-gray-600 leading-relaxed">Server generates a JWT signed with a secret key, including the <span className="font-mono text-xs">user_id</span> and <span className="font-mono text-xs">role</span> in the payload.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="font-bold text-indigo-600 mb-2">Step 3</div>
            <p className="text-gray-600 leading-relaxed">Client stores token in <span className="font-mono text-xs">localStorage</span> or Cookie. Middlewares on server verify JWT for protected routes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemDocs;
