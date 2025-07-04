import { promises as fs } from 'fs';
const USERS_FILE = new URL('../../data/users.json', import.meta.url);

let users = [];
let nextId = 1;

// Load users from file on startup
async function loadUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    users = JSON.parse(data);
    nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Failed to load users:', err);
    }
    users = [];
    nextId = 1;
  }
}

// Save users to file
async function saveUsers() {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

// Immediately load users on module import
await loadUsers();

export function getAllUsers() {
  return users;
}

export function getUserById(id) {
  return users.find(u => u.id === id);
}

export async function createUser({ name, email }) {
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  await saveUsers();
  return newUser;
}

export async function updateUser(id, { name, email }) {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  if (name) user.name = name;
  if (email) user.email = email;
  await saveUsers();
  return user;
}

export async function removeUser(id) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  await saveUsers();
  return true;
} 