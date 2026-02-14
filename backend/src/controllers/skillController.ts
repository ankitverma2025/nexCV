import { Request, Response } from 'express';
import Skill from '../models/Skill';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Get current user's skills (admin only)
export const getCurrentUserSkills = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find({ userId: req.userId }).sort({ order: 1 });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch skills',
    });
  }
};

// Get all skills by username (public)
export const getSkills = async (req: Request, res: Response): Promise<void> => {
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

    const skills = await Skill.find({ userId: user._id }).sort({ order: 1 });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch skills',
    });
  }
};

// Create skill category (admin only)
export const createSkill = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const skill = await Skill.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create skill category',
    });
  }
};

// Update skill category (admin only)
export const updateSkill = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      res.status(404).json({
        success: false,
        error: 'Skill category not found',
      });
      return;
    }

    res.json({
      success: true,
      data: skill,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update skill category',
    });
  }
};

// Delete skill category (admin only)
export const deleteSkill = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!skill) {
      res.status(404).json({
        success: false,
        error: 'Skill category not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        message: 'Skill category deleted successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete skill category',
    });
  }
};
