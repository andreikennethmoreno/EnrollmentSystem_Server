// src/app.js
import express from 'express';
import cors from 'cors';  // Import the cors package
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import classSectionRoutes from './routes/classSectionRoutes.js';



const app = express();

// Use the CORS middleware to allow crosSSs-origin requests
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Define routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/class-sections', classSectionRoutes);



export default app;
