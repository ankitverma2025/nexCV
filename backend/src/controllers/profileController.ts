import { Request, Response } from 'express';
import Profile from '../models/Profile';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Get current user's profile (admin only)
export const getCurrentProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    // Find profile by userId
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      res.status(404).json({
        success: false,
        error: 'Profile not found. Please create your profile first.',
      });
      return;
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch profile',
    });
  }
};

// Get profile by username (public)
export const getProfile = async (req: Request, res: Response): Promise<void> => {
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

    // Find profile by userId
    const profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
      res.status(404).json({
        success: false,
        error: 'Profile not found',
      });
      return;
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch profile',
    });
  }
};

// Update profile (admin only)
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      // Create new profile if none exists
      profile = await Profile.create({
        ...req.body,
        userId,
      });
    } else {
      // Update existing profile
      Object.assign(profile, req.body);
      await profile.save();
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update profile',
    });
  }
};
