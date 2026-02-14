import { Request, Response } from 'express';
import Education from '../models/Education';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Get current user's education (admin only)
export const getCurrentUserEducation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const education = await Education.find({ userId: req.userId }).sort({ order: 1, startDate: -1 });

    res.json({
      success: true,
      data: education,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch education',
    });
  }
};

// Get all education entries by username (public)
export const getEducation = async (req: Request, res: Response): Promise<void> => {
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

    const education = await Education.find({ userId: user._id }).sort({ order: 1, startDate: -1 });

    res.json({
      success: true,
      data: education,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch education',
    });
  }
};

// Create education entry (admin only)
export const createEducation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const education = await Education.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      data: education,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create education entry',
    });
  }
};

// Update education entry (admin only)
export const updateEducation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const education = await Education.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      res.status(404).json({
        success: false,
        error: 'Education entry not found',
      });
      return;
    }

    res.json({
      success: true,
      data: education,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update education entry',
    });
  }
};

// Delete education entry (admin only)
export const deleteEducation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const education = await Education.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!education) {
      res.status(404).json({
        success: false,
        error: 'Education entry not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        message: 'Education entry deleted successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete education entry',
    });
  }
};
