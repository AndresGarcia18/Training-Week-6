// Express routes for user endpoints
import express from 'express';
import {
  getUsers,
  getUser,
  addUser,
  updateUserInfo,
  deleteUser,
  batchUsers,
  randomUsers
} from '../controllers/userController.js';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// GET /users - Returns a list of users
router.get('/users', getUsers);

// POST /users - Adds a new user to the list
router.post(
  '/users',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    handleValidationErrors
  ],
  addUser
);

// GET /users/:id - Retrieves a single user by ID
router.get(
  '/users/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    handleValidationErrors
  ],
  getUser
);

// PUT /users/:id - Updates a user's information
router.put(
  '/users/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required').normalizeEmail(),
    handleValidationErrors
  ],
  updateUserInfo
);

// DELETE /users/:id - Deletes a user
router.delete(
  '/users/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    handleValidationErrors
  ],
  deleteUser
);

// POST /batch-users - accepts an array of users and adds them in bulk
router.post(
  '/batch-users',
  [
    body().isArray({ min: 1 }).withMessage('Request body must be a non-empty array'),
    body('*.name').trim().notEmpty().withMessage('Name is required'),
    body('*.email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    handleValidationErrors
  ],
  batchUsers
);

// POST /random-user - Fetch random user data from Random User API and add it to your local user list
router.post('/random-user', randomUsers);

export default router; 