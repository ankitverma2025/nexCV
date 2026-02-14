import { Router } from 'express';
import {
  getProjects,
  getCurrentUserProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Admin only routes (must come before public routes)
router.get('/', authenticateToken, getCurrentUserProjects);
router.post('/', authenticateToken, createProject);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

// Public route
router.get('/:username', getProjects);

export default router;
