import { Request, Response } from 'express';
import Experience from '../models/Experience';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Get current user's experiences (admin only)
export const getCurrentUserExperiences = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experiences = await Experience.find({ userId: req.userId }).sort({ order: 1, startDate: -1 });

    res.json({
      success: true,
      data: experiences,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch experiences',
    });
  }
};

// Get all experiences by username (public)
export const getExperiences = async (req: Request, res: Response): Promise<void> => {
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

    const experiences = await Experience.find({ userId: user._id }).sort({ order: 1, startDate: -1 });

    res.json({
      success: true,
      data: experiences,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch experiences',
    });
  }
};

// Create experience (admin only)
export const createExperience = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await Experience.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      data: experience,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create experience',
    });
  }
};

// Update experience (admin only)
export const updateExperience = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      res.status(404).json({
        success: false,
        error: 'Experience not found',
      });
      return;
    }

    res.json({
      success: true,
      data: experience,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update experience',
    });
  }
};

// Delete experience (admin only)
export const deleteExperience = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!experience) {
      res.status(404).json({
        success: false,
        error: 'Experience not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        message: 'Experience deleted successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete experience',
    });
  }
};

// Reorder experiences (admin only)
export const reorderExperiences = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items } = req.body; // Array of { id, order }

    if (!Array.isArray(items)) {
      res.status(400).json({
        success: false,
        error: 'Items must be an array',
      });
      return;
    }

    // Update order for each item (only for current user's experiences)
    const updatePromises = items.map(({ id, order }) =>
      Experience.findOneAndUpdate(
        { _id: id, userId: req.userId },
        { order },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    const experiences = await Experience.find({ userId: req.userId }).sort({ order: 1, startDate: -1 });

    res.json({
      success: true,
      data: experiences,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to reorder experiences',
    });
  }
};
