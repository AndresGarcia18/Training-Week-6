// Entry point for the  hubspot integration API
import './config/env.js';
import express from 'express';
import characterRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', characterRoutes);

// Start the server with error handling
app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`HTTP server running at http://localhost:${PORT}`);
});