import express from 'express';
import {
  getAllRegistrarHeads,
  getRegistrarHeadById,
  createRegistrarHead,
  updateRegistrarHead,
  deleteRegistrarHead,
} from '../controllers/registrarHeadController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { login, logout  } from '../controllers/authController.js';


const router = express.Router();

router.post('/login', login);

// Protect all routes below this, and authorize only "registrar" role for CRUD operations
router.use(protect); // Protect all routes from unauthorized access
router.post('/logout', logout); 


// Public route for getting registrar heads (optional if you want non-registrars to view)
router.get('/', authorize('registrar'), getAllRegistrarHeads); // Route to get all registrar heads
router.get('/:id', authorize('registrar'), getRegistrarHeadById); // Route to get a registrar head by ID

// Routes that require 'registrar' role for CRUD operations
router.post('/', authorize('registrar'), createRegistrarHead); // Route to create a new registrar head
router.put('/:id', authorize('registrar'), updateRegistrarHead); // Route to update a registrar head by ID
router.delete('/:id', authorize('registrar'), deleteRegistrarHead); // Route to delete a registrar head by ID

export default router; // Ensure this is exported correctly
