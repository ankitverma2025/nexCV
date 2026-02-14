'use client';

import { useEffect, useState } from 'react';
import { profileApi } from '@/lib/api';
import type { Profile } from '@/types';
import ImageUpload from '@/components/ImageUpload';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.get();
        setProfile(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await profileApi.update(profile);
      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {message && (
        <div className={`p-4 rounded mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card max-w-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              value={profile.fullName || ''}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Title</label>
            <input
              type="text"
              value={profile.title || ''}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Phone</label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">LinkedIn URL</label>
            <input
              type="url"
              value={profile.linkedin || ''}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">GitHub URL</label>
            <input
              type="url"
              value={profile.github || ''}
              onChange={(e) => setProfile({ ...profile, github: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Portfolio URL</label>
            <input
              type="url"
              value={profile.portfolio || ''}
              onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Tagline</label>
          <input
            type="text"
            value={profile.tagline || ''}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label className="label">About</label>
          <textarea
            value={profile.about || ''}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            className="input h-32"
            required
          />
        </div>

        <div>
          <label className="label">Profile Image</label>
          <ImageUpload
            value={profile.profileImage || ''}
            onChange={(url) => setProfile({ ...profile, profileImage: url })}
          />
          <p className="text-sm text-gray-500 mt-2">
            Click the button to upload an image from your computer
          </p>
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
