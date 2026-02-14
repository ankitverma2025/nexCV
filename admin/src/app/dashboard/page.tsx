'use client';

import { useEffect, useState } from 'react';
import { experienceApi, educationApi, skillsApi, projectsApi } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    experiences: 0,
    education: 0,
    skills: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [exp, edu, skl, proj] = await Promise.all([
          experienceApi.getAll(),
          educationApi.getAll(),
          skillsApi.getAll(),
          projectsApi.getAll(),
        ]);

        setStats({
          experiences: exp.length,
          education: edu.length,
          skills: skl.length,
          projects: proj.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Work Experiences', value: stats.experiences, href: '/dashboard/experience', icon: '💼', color: 'blue' },
    { label: 'Education Entries', value: stats.education, href: '/dashboard/education', icon: '🎓', color: 'green' },
    { label: 'Skill Categories', value: stats.skills, href: '/dashboard/skills', icon: '⚡', color: 'yellow' },
    { label: 'Projects', value: stats.projects, href: '/dashboard/projects', icon: '🚀', color: 'purple' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/dashboard/profile" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              👤 Edit Profile Information
            </Link>
            <Link href="/dashboard/experience" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              💼 Manage Work Experience
            </Link>
            <Link href="/dashboard/projects" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              🚀 Manage Projects
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>✓ Update your profile information from the Profile page</p>
            <p>✓ Add, edit, or delete work experiences, education, skills, and projects</p>
            <p>✓ All changes are reflected immediately on the public website</p>
            <p>✓ Use the logout button in the sidebar when done</p>
          </div>
        </div>
      </div>
    </div>
  );
}
