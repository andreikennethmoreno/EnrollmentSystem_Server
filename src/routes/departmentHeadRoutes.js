// src/routes/departmentHeadRoutes.js
import express from 'express';
import {
  getAllDepartmentHeads,
  getDepartmentHeadById,
  createDepartmentHead,
  updateDepartmentHead,
  deleteDepartmentHead,
} from '../controllers/departmentHeadController.js';

const router = express.Router();

router.get('/', getAllDepartmentHeads);
router.get('/:id', getDepartmentHeadById);
router.post('/', createDepartmentHead);
router.put('/:id', updateDepartmentHead);
router.delete('/:id', deleteDepartmentHead);

export default router; // Ensure this is exported correctly
