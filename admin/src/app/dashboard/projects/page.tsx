'use client';

import { useEffect, useState } from 'react';
import { projectsApi } from '@/lib/api';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing('new');
    setFormData({ title: '', description: '', technologies: [], link: '', github: '', image: '', featured: false, order: 0 });
  };

  const handleEdit = (project: Project) => {
    setEditing(project._id);
    setFormData(project);
  };

  const handleSave = async () => {
    try {
      if (editing === 'new') {
        await projectsApi.create(formData);
      } else if (editing) {
        await projectsApi.update(editing, formData);
      }
      setEditing(null);
      fetchProjects();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsApi.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          + Add Project
        </button>
      </div>

      {editing && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">{editing === 'new' ? 'New' : 'Edit'} Project</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Title</label>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">Image URL</label>
                <input type="url" value={formData.image || ''} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="input" placeholder="https://example.com/image.jpg" />
              </div>
            </div>
            <div>
              <label className="label">Description</label>
              <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input h-24" />
            </div>
            <div>
              <label className="label">Technologies (one per line)</label>
              <textarea value={formData.technologies?.join('\n') || ''} onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split('\n').filter(Boolean) })} className="input h-24" placeholder="React&#10;Node.js&#10;MongoDB" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Live Demo URL</label>
                <input type="url" value={formData.link || ''} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">GitHub URL</label>
                <input type="url" value={formData.github || ''} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="input" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.featured || false} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                <span className="text-sm">Featured Project</span>
              </label>
              <div>
                <label className="label inline mr-2">Order:</label>
                <input type="number" value={formData.order || 0} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="input w-24 inline" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-primary">Save</button>
              <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {projects.length === 0 && (
          <p className="text-gray-500 text-center py-8">No projects yet. Click "+ Add Project" to get started.</p>
        )}
        {projects.map((project) => (
          <div key={project._id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Featured</span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(project._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
