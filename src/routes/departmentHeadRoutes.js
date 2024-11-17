import express from 'express';
import {
  getAllDepartmentHeads,
  getDepartmentHeadById,
  createDepartmentHead,
  updateDepartmentHead,
  deleteDepartmentHead,
} from '../controllers/departmentHeadController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { login, logout  } from '../controllers/authController.js';


const router = express.Router();

router.post('/login', login);

// Protect all routes below this, requiring authentication
router.use(protect); 
router.post('/logout', logout); 


// Read access (both department_head and registrar can access)
router.get('/', authorize('registrar', 'department_head'), getAllDepartmentHeads); // Get all department heads
router.get('/:id', authorize('registrar', 'department_head'), getDepartmentHeadById); // Get department head by ID

// CRUD access for registrar, only read and update for department head
router.post('/', authorize('registrar'), createDepartmentHead); // Only registrars can create
router.put('/:id', authorize('registrar', 'department_head'), updateDepartmentHead); // Both can update
router.delete('/:id', authorize('registrar'), deleteDepartmentHead); // Only registrars can delete

export default router; 
