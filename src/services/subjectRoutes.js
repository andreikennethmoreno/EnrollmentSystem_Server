// src/routes/subjectRoutes.js
import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';

const router = express.Router();

// Routes for subjects CRUD operations
router.post('/', createSubject);          // Create new subject
router.get('/', getAllSubjects);          // Get all subjects
router.get('/:id', getSubjectById);       // Get subject by ID
router.put('/:id', updateSubject);        // Update subject
router.delete('/:id', deleteSubject);    // Delete subject

export default router;
