'use client';

import { useEffect, useState } from 'react';
import { experienceApi, educationApi, skillsApi, projectsApi } from '@/lib/api';
import { authLib } from '@/lib/auth';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    experiences: 0,
    education: 0,
    skills: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = authLib.getUsername();
    setUsername(storedUsername);
  }, []);

  const handleCopyLink = () => {
    if (!username) return;
    const profileUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/${username}`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreview = () => {
    if (!username) return;
    const profileUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/${username}`;
    window.open(profileUrl, '_blank');
  };

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

      {/* Share Profile Section */}
      {username && (
        <div className="card mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🔗 Your Public Profile
              </h2>
              <p className="text-sm text-gray-600 mt-1">Share your resume with anyone</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">Your Profile URL:</p>
            <code className="block bg-gray-50 p-3 rounded text-blue-600 font-mono text-sm break-all">
              {`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/${username}`}
            </code>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <span>👁️</span>
              Preview Profile
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 btn bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              <span>{copied ? '✓' : '📋'}</span>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      )}

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
