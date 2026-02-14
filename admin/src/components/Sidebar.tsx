'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { href: '/dashboard/experience', label: 'Experience', icon: '💼' },
    { href: '/dashboard/education', label: 'Education', icon: '🎓' },
    { href: '/dashboard/skills', label: 'Skills', icon: '⚡' },
    { href: '/dashboard/projects', label: 'Projects', icon: '🚀' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <p className="text-gray-400 text-sm mt-1">nexCV Dashboard</p>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors ${
              pathname === item.href ? 'bg-gray-800 border-l-4 border-blue-500' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
