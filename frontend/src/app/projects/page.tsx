'use client';

import { useEffect, useState } from 'react';
import { projectsApi } from '@/lib/api';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="section-title">Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-64 bg-gray-200 dark:bg-gray-700"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h1 className="section-title">Projects</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <p>No projects available yet.</p>
            <p className="text-sm mt-2">Add your projects through the admin portal.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
