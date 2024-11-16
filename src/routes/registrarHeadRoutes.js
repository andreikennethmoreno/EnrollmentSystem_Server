import express from 'express';
import {
  getAllRegistrarHeads,
  getRegistrarHeadById,
  createRegistrarHead,
  updateRegistrarHead,
  deleteRegistrarHead,
} from '../controllers/registrarHeadController.js';

const router = express.Router();

router.get('/', getAllRegistrarHeads); // Route to get all registrar heads
router.get('/:id', getRegistrarHeadById); // Route to get a registrar head by ID
router.post('/', createRegistrarHead); // Route to create a new registrar head
router.put('/:id', updateRegistrarHead); // Route to update a registrar head by ID
router.delete('/:id', deleteRegistrarHead); // Route to delete a registrar head by ID

export default router; // Ensure this is exported correctly
