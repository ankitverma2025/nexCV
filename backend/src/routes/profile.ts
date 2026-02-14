import { Router } from 'express';
import { getProfile, getCurrentProfile, updateProfile } from '../controllers/profileController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public route - must come AFTER admin routes to avoid conflict
router.get('/:username', getProfile);

// Admin only routes
router.get('/', authenticateToken, getCurrentProfile);
router.put('/', authenticateToken, updateProfile);

export default router;
