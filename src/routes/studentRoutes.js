import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Public route for login
router.post('/login', login);

// Protected routes for authenticated users
router.use(protect);

router.get('/', authorize('department_head', 'registrar'), getAllStudents);
router.get('/:id', authorize('department_head', 'registrar'), getStudentById);

// Routes for registrar only
router.post('/', authorize('registrar'), createStudent);
router.put('/:id', authorize('registrar'), updateStudent);
router.delete('/:id', authorize('registrar'), deleteStudent);

export default router;
