import { Router } from 'express';
import {
  getExperiences,
  getCurrentUserExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  reorderExperiences,
} from '../controllers/experienceController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Admin only routes (must come before public routes)
router.get('/', authenticateToken, getCurrentUserExperiences);
router.post('/', authenticateToken, createExperience);
router.put('/reorder', authenticateToken, reorderExperiences);
router.put('/:id', authenticateToken, updateExperience);
router.delete('/:id', authenticateToken, deleteExperience);

// Public route
router.get('/:username', getExperiences);

export default router;
