'use client';

import { useEffect, useState } from 'react';
import { educationApi } from '@/lib/api';
import { Education } from '@/types';
import EducationCard from '@/components/EducationCard';

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await educationApi.getEducation();
        setEducation(data);
      } catch (err) {
        setError('Failed to load education');
        console.error('Error fetching education:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="section-title">Education</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map((i) => (
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
        <h1 className="section-title">Education</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
        )}

        {education.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <p>No education data available yet.</p>
            <p className="text-sm mt-2">Add your education through the admin portal.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {education.map((edu) => (
              <EducationCard key={edu._id} education={edu} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
