import express from 'express';
import cors from 'cors';  // Import the cors package
import studentRoutes from './routes/studentRoutes.js';
import http from 'http';  // Import http for creating a server
import departmentHeadRoutes from './routes/departmentHeadRoutes.js';  // Corrected import
import authRoutes from './routes/authRoutes.js';



const app = express();

// Use the CORS middleware to allow cross-origin requests
app.use(cors());

// Enable JSON parsing
app.use(express.json());

app.get('/', (req, res) => {
    res.send('EnrollmentSystem_Server'); 
  });

// Define routes
app.use('/api/students', studentRoutes);
app.use('/api/department-heads', departmentHeadRoutes);
app.use('/api/auth', authRoutes);

// Create the server instance
const server = http.createServer(app);

// Export the server instance for use in tests
export { server };
export default app;
