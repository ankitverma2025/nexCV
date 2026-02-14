'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authLib } from '@/lib/auth';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await authLib.register(email, password, name, username);
      } else {
        await authLib.login(email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || (isRegister ? 'Registration failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-gray-600 mt-2">nexCV - Manage Your Profile</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  className="input"
                  placeholder="yourname (lowercase, no spaces)"
                  pattern="[a-z0-9_-]+"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your resume will be available at: yoursite.com/{username || 'yourname'}
                </p>
              </div>
            </>
          )}

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading
              ? (isRegister ? 'Creating Account...' : 'Logging in...')
              : (isRegister ? 'Create Account' : 'Login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isRegister
              ? 'Already have an account? Login'
              : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
