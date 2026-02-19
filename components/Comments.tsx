import React, { useState } from 'react';
import { NewsArticle, Comment } from '../types';
import { db } from '../db';

interface CommentsProps {
  articleId: string;
  comments: Comment[] | undefined;
  onCommentAdded: () => void;
  isAuthenticated: boolean;
  currentUserName?: string;
}

const Comments: React.FC<CommentsProps> = ({
  articleId,
  comments,
  onCommentAdded,
  isAuthenticated,
  currentUserName = 'User'
}) => {
  const [commentText, setCommentText] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'mostliked'>('newest');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login to comment');
      return;
    }

    if (!commentText.trim()) {
      alert('Please enter a comment');
      return;
    }

    db.addComment(articleId, {
      userId: 'u1',
      userName: currentUserName,
      content: commentText
    });

    setCommentText('');
    onCommentAdded();
  };

  const displayedComments = comments ? [...comments] : [];

  if (sort === 'newest') {
    displayedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sort === 'oldest') {
    displayedComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (sort === 'mostliked') {
    displayedComments.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  return (
    <section className="mt-12 pt-12 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Comments</h2>
        <p className="text-gray-600">{displayedComments.length} {displayedComments.length === 1 ? 'comment' : 'comments'}</p>
      </div>

      {/* Add Comment Form */}
      {isAuthenticated && (
        <form onSubmit={handleAddComment} className="mb-12 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Comment</h3>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            Post Comment
          </button>
        </form>
      )}

      {!isAuthenticated && (
        <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-blue-900">Please log in to leave a comment</p>
        </div>
      )}

      {/* Comments List */}
      {displayedComments.length > 0 && (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Comments ({displayedComments.length})</h3>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'newest' | 'oldest' | 'mostliked')}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostliked">Most Liked</option>
            </select>
          </div>

          <div className="space-y-6">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="p-6 bg-white rounded-lg border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{comment.userName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{comment.content}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <button className="hover:text-indigo-600 transition flex items-center gap-1">
                    👍 Like {comment.likes ? `(${comment.likes})` : ''}
                  </button>
                  <button className="hover:text-indigo-600 transition">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {displayedComments.length === 0 && isAuthenticated && (
        <div className="text-center py-12 text-gray-600">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </section>
  );
};

export default Comments;
