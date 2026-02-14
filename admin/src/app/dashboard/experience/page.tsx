'use client';

import { useEffect, useState } from 'react';
import { experienceApi } from '@/lib/api';
import type { Experience } from '@/types';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({});

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await experienceApi.getAll();
      setExperiences(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing('new');
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: null,
      current: false,
      description: '',
      achievements: [],
      order: 0,
    });
  };

  const handleEdit = (exp: Experience) => {
    setEditing(exp._id);
    setFormData(exp);
  };

  const handleSave = async () => {
    try {
      if (editing === 'new') {
        await experienceApi.create(formData);
      } else if (editing) {
        await experienceApi.update(editing, formData);
      }
      setEditing(null);
      fetchExperiences();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await experienceApi.delete(id);
      fetchExperiences();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Work Experience</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          + Add Experience
        </button>
      </div>

      {editing && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">{editing === 'new' ? 'New' : 'Edit'} Experience</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Company</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Position</label>
                <input
                  type="text"
                  value={formData.position || ''}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="label">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Start Date</label>
                <input
                  type="month"
                  value={formData.startDate ? formData.startDate.substring(0, 7) : ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value + '-01' })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">End Date</label>
                <input
                  type="month"
                  value={formData.endDate ? formData.endDate.substring(0, 7) : ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value + '-01', current: false })}
                  className="input"
                  disabled={formData.current}
                />
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.current || false}
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: null })}
                  />
                  <span className="text-sm">Current Position</span>
                </label>
              </div>
            </div>

            <div>
              <label className="label">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input h-24"
              />
            </div>

            <div>
              <label className="label">Achievements (one per line)</label>
              <textarea
                value={formData.achievements?.join('\n') || ''}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split('\n').filter(Boolean) })}
                className="input h-32"
                placeholder="Implemented feature X&#10;Led team of Y developers&#10;Improved performance by Z%"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-primary">Save</button>
              <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : new Date(exp.endDate || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(exp._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
