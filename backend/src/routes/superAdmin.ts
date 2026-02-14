import { Router } from 'express';
import {
  superAdminLogin,
  getAllUsers,
  getUserDetails,
  deleteUser,
  getStats,
} from '../controllers/superAdminController';
import { verifySuperAdmin } from '../middleware/superAdminAuth';

const router = Router();

// Public route - super-admin login
router.post('/auth/login', superAdminLogin);

// Protected routes - require super-admin authentication
router.get('/users', verifySuperAdmin, getAllUsers);
router.get('/users/:id', verifySuperAdmin, getUserDetails);
router.delete('/users/:id', verifySuperAdmin, deleteUser);
router.get('/stats', verifySuperAdmin, getStats);

export default router;
