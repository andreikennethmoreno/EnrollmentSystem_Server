import express from 'express';
import cors from 'cors';  // Import the cors package
import http from 'http';  // Import http for creating a server
import studentRoutes from './routes/studentRoutes.js';
import registrarHeadRoutes from './routes/registrarHeadRoutes.js';
import departmentHeadRoutes from './routes/departmentHeadRoutes.js';  // Corrected import
import authRoutes from './routes/authRoutes.js';
import programRoutes from './routes/programRoutes.js'; // Import the program routes





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
app.use('/api/registrar', registrarHeadRoutes);
app.use('/api/programs', programRoutes);


// Create the server instance
const server = http.createServer(app);

// Export the server instance for use in tests
export { server };
export default app;
