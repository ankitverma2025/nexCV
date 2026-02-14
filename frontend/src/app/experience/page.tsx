'use client';

import { useEffect, useState } from 'react';
import { experienceApi } from '@/lib/api';
import { Experience } from '@/types';
import ExperienceCard from '@/components/ExperienceCard';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experienceApi.getExperiences();
        setExperiences(data);
      } catch (err) {
        setError('Failed to load experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="section-title">Work Experience</h1>
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-48 bg-gray-200 dark:bg-gray-700"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h1 className="section-title">Work Experience</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
        )}

        {experiences.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <p>No work experience data available yet.</p>
            <p className="text-sm mt-2">Add your experience through the admin portal.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
