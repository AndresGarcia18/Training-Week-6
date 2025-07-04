import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
} from '../api/userApi.js';
import axios from 'axios';
import { ValidationError, NotFoundError } from '../utils/errors.js';

export function getUsers(req, res) {
  res.json(getAllUsers());
}

export function getUser(req, res) {
  const user = getUserById(parseInt(req.params.id));
  if (!user) {
    throw new NotFoundError('User not found');
  }
  res.json(user);
}

export async function addUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new ValidationError('Name and email are required');
  }
  try {
    const newUser = await createUser({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function updateUserInfo(req, res) {
  const { name, email } = req.body;
  try {
    const user = await updateUser(parseInt(req.params.id), { name, email });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function deleteUser(req, res) {
  try {
    const success = await removeUser(parseInt(req.params.id));
    if (!success) {
      throw new NotFoundError('User not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

export async function batchUsers(req, res) {
  const usersArray = req.body;
  if (!Array.isArray(usersArray) || usersArray.length === 0) {
    throw new ValidationError('Request body must be a non-empty array of users');
  }
  const created = [];
  const errors = [];
  for (let i = 0; i < usersArray.length; i++) {
    const { name, email } = usersArray[i];
    if (!name || !email) {
      errors.push({ index: i, error: 'Name and email are required' });
      continue;
    }
    try {
      const newUser = await createUser({ name, email });
      created.push(newUser);
    } catch (err) {
      errors.push({ index: i, error: 'Failed to create user' });
    }
  }
  res.status(201).json({ created, errors });
}

export async function randomUsers(req, res) {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const userData = response.data.results[0];
    const name = `${userData.name.first} ${userData.name.last}`;
    const email = userData.email;
    if (!name || !email) {
      return res.status(500).json({ error: 'Failed to extract user data from randomuser.me' });
    }
    const newUser = await createUser({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch or create random user' });
  }
}