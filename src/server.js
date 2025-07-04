// Entry point for the  hubspot integration API
import './config/env.js';
import express from 'express';
import characterRoutes from './routes/userRoutes.js';
import helmet from 'helmet';
import cors from 'cors';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(cors());

// Custom logging middleware
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', characterRoutes);

// Middleware global error handling 
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    name: err.name,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });
  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err.name, message: err.message });
  } else {
    res.status(500).json({ error: 'InternalServerError', message: 'An unexpected error occurred' });
  }
});

// start the server using error handling
app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`HTTP server running at http://localhost:${PORT}`);
});