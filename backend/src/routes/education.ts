import { Router } from 'express';
import {
  getCurrentUserEducation,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get current user's education (admin only)
router.get('/', authenticateToken, getCurrentUserEducation);

// Public route
router.get('/:username', getEducation);

// Admin only routes
router.post('/', authenticateToken, createEducation);
router.put('/:id', authenticateToken, updateEducation);
router.delete('/:id', authenticateToken, deleteEducation);

export default router;
