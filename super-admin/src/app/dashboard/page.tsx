'use client';

import { useEffect, useState } from 'react';
import { usersApi, statsApi } from '@/lib/api';
import type { User, Stats } from '@/types';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, statsData] = await Promise.all([
        usersApi.getAll(),
        statsApi.get(),
      ]);
      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await usersApi.delete(id);
      alert('User deleted successfully');
      fetchData(); // Refresh the list
    } catch (error: any) {
      alert('Error deleting user: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.totalUsers || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Total Profiles</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.totalProfiles || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Recent Users (7d)</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.recentUsers || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Profile Completion</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.profileCompletionRate || 0}%
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Users</h2>

        {users.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Profile</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        /{user.username}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      {user.hasProfile ? (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          ✓ Complete
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                          ○ Incomplete
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-lg">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-lg">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Username</p>
                  <p className="text-lg">{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Status</p>
                  <p className="text-lg">
                    {selectedUser.hasProfile ? (
                      <span className="text-green-600">✓ Profile Created</span>
                    ) : (
                      <span className="text-gray-600">○ No Profile Yet</span>
                    )}
                  </p>
                </div>

                {selectedUser.profileData && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-lg mb-3">Profile Information</h4>
                    <div className="space-y-2 text-sm">
                      {selectedUser.profileData.fullName && (
                        <p><strong>Full Name:</strong> {selectedUser.profileData.fullName}</p>
                      )}
                      {selectedUser.profileData.title && (
                        <p><strong>Title:</strong> {selectedUser.profileData.title}</p>
                      )}
                      {selectedUser.profileData.email && (
                        <p><strong>Contact Email:</strong> {selectedUser.profileData.email}</p>
                      )}
                      {selectedUser.profileData.phone && (
                        <p><strong>Phone:</strong> {selectedUser.profileData.phone}</p>
                      )}
                      {selectedUser.profileData.location && (
                        <p><strong>Location:</strong> {selectedUser.profileData.location}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600">
                    Joined: {new Date(selectedUser.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/${selectedUser.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 text-center"
                >
                  View Public Profile
                </a>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
