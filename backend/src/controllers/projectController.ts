import { Request, Response } from 'express';
import Project from '../models/Project';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Get current user's projects (admin only)
export const getCurrentUserProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ userId: req.userId }).sort({ featured: -1, order: 1 });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch projects',
    });
  }
};

// Get all projects by username (public)
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    const projects = await Project.find({ userId: user._id }).sort({ featured: -1, order: 1 });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch projects',
    });
  }
};

// Create project (admin only)
export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create project',
    });
  }
};

// Update project (admin only)
export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found',
      });
      return;
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update project',
    });
  }
};

// Delete project (admin only)
export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        message: 'Project deleted successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete project',
    });
  }
};
