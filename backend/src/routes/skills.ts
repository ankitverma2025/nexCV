import { Router } from 'express';
import {
  getSkills,
  getCurrentUserSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Admin only routes (must come before public routes)
router.get('/', authenticateToken, getCurrentUserSkills);
router.post('/', authenticateToken, createSkill);
router.put('/:id', authenticateToken, updateSkill);
router.delete('/:id', authenticateToken, deleteSkill);

// Public route
router.get('/:username', getSkills);

export default router;
