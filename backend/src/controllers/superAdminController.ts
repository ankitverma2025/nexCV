import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Profile from '../models/Profile';

/**
 * Super-admin login
 * Uses credentials from environment variables
 */
export const superAdminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check against environment variables
    const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
    const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

    if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
      res.status(500).json({
        success: false,
        error: 'Super-admin credentials not configured',
      });
      return;
    }

    if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
      return;
    }

    // Generate JWT token with super-admin flag
    const token = jwt.sign(
      { isSuperAdmin: true },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        email: SUPER_ADMIN_EMAIL,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Login failed',
    });
  }
};

/**
 * Get all users with their profiles
 */
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find()
      .select('-password') // Exclude password
      .sort({ createdAt: -1 });

    // Fetch profiles for each user
    const usersWithProfiles = await Promise.all(
      users.map(async (user) => {
        const profile = await Profile.findOne({ userId: user._id });
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
          createdAt: user.createdAt,
          hasProfile: !!profile,
          profileData: profile || null,
        };
      })
    );

    res.json({
      success: true,
      data: usersWithProfiles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch users',
    });
  }
};

/**
 * Get specific user details
 */
export const getUserDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    const profile = await Profile.findOne({ userId: user._id });

    res.json({
      success: true,
      data: {
        user,
        profile,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch user details',
    });
  }
};

/**
 * Delete a user and their profile
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    // Delete user's profile
    await Profile.deleteOne({ userId: id });

    // Delete user
    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'User and associated data deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete user',
    });
  }
};

/**
 * Get platform statistics
 */
export const getStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProfiles = await Profile.countDocuments();

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProfiles,
        recentUsers,
        profileCompletionRate:
          totalUsers > 0 ? ((totalProfiles / totalUsers) * 100).toFixed(1) : 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch statistics',
    });
  }
};
