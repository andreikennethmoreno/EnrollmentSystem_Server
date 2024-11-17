import express from 'express';
import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { login, logout } from '../controllers/authController.js';

const router = express.Router();

// Public route for login
router.post('/login', login);

// Protect all routes below this and ensure authenticated access
router.use(protect); 
router.post('/logout', logout);

// Read access for both "department_head" and "registrar"
router.get('/', authorize('department_head', 'registrar'), getAllPrograms); // Get all programs
router.get('/:id', authorize('department_head', 'registrar'), getProgramById); // Get program by ID

// Full CRUD access for "registrar" only
router.post('/', authorize('registrar'), createProgram); // Only registrar can create
router.put('/:id', authorize('registrar'), updateProgram); // Only registrar can update
router.delete('/:id', authorize('registrar'), deleteProgram); // Only registrar can delete

export default router;
