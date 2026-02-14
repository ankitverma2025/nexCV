'use client';

import { useEffect, useState } from 'react';
import { educationApi } from '@/lib/api';
import type { Education } from '@/types';

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({});

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await educationApi.getAll();
      setEducation(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing('new');
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: null,
      current: false,
      gpa: '',
      achievements: [],
      order: 0,
    });
  };

  const handleEdit = (edu: Education) => {
    setEditing(edu._id);
    setFormData(edu);
  };

  const handleSave = async () => {
    try {
      if (editing === 'new') {
        await educationApi.create(formData);
      } else if (editing) {
        await educationApi.update(editing, formData);
      }
      setEditing(null);
      fetchEducation();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    try {
      await educationApi.delete(id);
      fetchEducation();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Education</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          + Add Education
        </button>
      </div>

      {editing && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">{editing === 'new' ? 'New' : 'Edit'} Education</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Institution</label>
                <input type="text" value={formData.institution || ''} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">Degree</label>
                <input type="text" value={formData.degree || ''} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="input" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Field of Study</label>
                <input type="text" value={formData.field || ''} onChange={(e) => setFormData({ ...formData, field: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">Location</label>
                <input type="text" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Start Date</label>
                <input type="month" value={formData.startDate ? formData.startDate.substring(0, 7) : ''} onChange={(e) => setFormData({ ...formData, startDate: e.target.value + '-01' })} className="input" />
              </div>
              <div>
                <label className="label">End Date</label>
                <input type="month" value={formData.endDate ? formData.endDate.substring(0, 7) : ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value + '-01', current: false })} className="input" disabled={formData.current} />
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" checked={formData.current || false} onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: null })} />
                  <span className="text-sm">Currently Studying</span>
                </label>
              </div>
              <div>
                <label className="label">GPA</label>
                <input type="text" value={formData.gpa || ''} onChange={(e) => setFormData({ ...formData, gpa: e.target.value })} className="input" placeholder="e.g. 3.8/4.0" />
              </div>
            </div>
            <div>
              <label className="label">Achievements (one per line)</label>
              <textarea value={formData.achievements?.join('\n') || ''} onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split('\n').filter(Boolean) })} className="input h-32" placeholder="Dean's List&#10;Scholarship recipient" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-primary">Save</button>
              <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {education.length === 0 && (
          <p className="text-gray-500 text-center py-8">No education entries yet. Click "+ Add Education" to get started.</p>
        )}
        {education.map((edu) => (
          <div key={edu._id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution} - {edu.field}</p>
                <p className="text-sm text-gray-500">{edu.location} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(edu)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(edu._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
