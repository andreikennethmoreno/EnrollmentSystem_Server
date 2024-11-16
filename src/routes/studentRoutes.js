// src/routes/studentRoutes.js
import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { login } from '../controllers/authController.js';

const router = express.Router();
router.post('/login', login);

router.use(protect);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router; // Ensure this is exported correctly