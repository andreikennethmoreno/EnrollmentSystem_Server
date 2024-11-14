import express from 'express';
import cors from 'cors';  // Import the cors package
import studentRoutes from './routes/studentRoutes.js';
import http from 'http';  // Import http for creating a server
import departmentHeadRoutes from './routes/departmentHeadRoutes.js';  // Corrected import

const app = express();

// Use the CORS middleware to allow cross-origin requests
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Define routes
app.use('/api/students', studentRoutes);
app.use('/api/department-heads', departmentHeadRoutes);

// Create the server instance
const server = http.createServer(app);

// Export the server instance for use in tests
export { server };
export default app;
