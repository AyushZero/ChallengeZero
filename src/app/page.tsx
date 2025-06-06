'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface User {
  name: string;
  totalAmount: number;
  streak: number;
  lastContribution: string | null;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/contribution');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleContribution = async (name: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to contribute');
      }

      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Daily Savings Challenge
        </h1>
        
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {users.map((user) => (
            <div
              key={user.name}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{user.name}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Amount:</span>
                  <span className="text-green-400 font-bold">₹{user.totalAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current Streak:</span>
                  <span className="text-yellow-400 font-bold">{user.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last Contribution:</span>
                  <span className="text-blue-400">
                    {user.lastContribution
                      ? format(new Date(user.lastContribution), 'dd MMM yyyy')
                      : 'Never'}
                  </span>
                </div>
                <button
                  onClick={() => handleContribution(user.name)}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? 'Adding...' : 'Add ₹10'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
