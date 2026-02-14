'use client';

import { useEffect, useState } from 'react';
import { profileApi } from '@/lib/api';
import { Profile } from '@/types';
import Hero from '@/components/Hero';
import { useParams } from 'next/navigation';

export default function UserProfile() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getProfile(username);
        setProfile(data);
      } catch (err) {
        setError(`No profile found for username: ${username}`);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              Profile Not Found
            </h2>
            <p className="text-red-600 dark:text-red-300">
              {error || `No profile found for username: ${username}`}
            </p>
            <p className="text-sm text-red-500 dark:text-red-400 mt-2">
              Please check the username and try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <Hero profile={profile} />;
}
