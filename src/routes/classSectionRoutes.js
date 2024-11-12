import express from 'express';
import {
  createClassSection,
  getAllClassSections,
  getClassSectionById,
  updateClassSection,
  deleteClassSection
} from '../controllers/classSectionController.js';

const router = express.Router();

// Define routes for class sections
router.post('/', createClassSection);                 // Create class section
router.get('/', getAllClassSections);                 // Get all class sections
router.get('/:id', getClassSectionById);              // Get class section by ID
router.put('/:id', updateClassSection);               // Update class section by ID
router.delete('/:id', deleteClassSection);            // Delete class section by ID

export default router;
