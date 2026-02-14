'use client';

import { useEffect, useState } from 'react';
import { skillsApi } from '@/lib/api';
import type { Skill } from '@/types';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({});
  const [skillsText, setSkillsText] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await skillsApi.getAll();
      setSkills(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing('new');
    setFormData({ category: '', skills: [], order: 0 });
    setSkillsText('');
  };

  const handleEdit = (skill: Skill) => {
    setEditing(skill._id);
    setFormData(skill);
    setSkillsText(skill.skills.join(', '));
  };

  const handleSave = async () => {
    try {
      const skillsArray = skillsText.split(',').map(s => s.trim()).filter(Boolean);
      const dataToSave = { ...formData, skills: skillsArray };

      if (editing === 'new') {
        await skillsApi.create(dataToSave);
      } else if (editing) {
        await skillsApi.update(editing, dataToSave);
      }
      setEditing(null);
      fetchSkills();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill category?')) return;
    try {
      await skillsApi.delete(id);
      fetchSkills();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          + Add Skill Category
        </button>
      </div>

      {editing && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">{editing === 'new' ? 'New' : 'Edit'} Skill Category</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Category Name</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
                placeholder="e.g. Programming Languages, Frameworks, Tools"
              />
            </div>
            <div>
              <label className="label">Skills (comma-separated)</label>
              <textarea
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="input h-32"
                placeholder="JavaScript, TypeScript, Python, React, Node.js"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter skills separated by commas
              </p>
            </div>
            <div>
              <label className="label">Display Order</label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="input w-32"
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
        {skills.length === 0 && (
          <p className="text-gray-500 text-center py-8">No skills yet. Click "+ Add Skill Category" to get started.</p>
        )}
        {skills.map((skill) => (
          <div key={skill._id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{skill.category}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skill.skills.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(skill._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
