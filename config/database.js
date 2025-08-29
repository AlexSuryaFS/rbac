// In-memory user store for demonstration
// In production, this would be replaced with a real database

const bcrypt = require('bcryptjs');

// Simple in-memory user store: { id, username, passwordHash, role, createdAt }
const users = [
  { 
    id: 1, 
    username: 'admin', 
    passwordHash: bcrypt.hashSync('admin123', 10), 
    role: 'admin',
    createdAt: new Date('2024-01-01')
  },
  { 
    id: 2, 
    username: 'user', 
    passwordHash: bcrypt.hashSync('user123', 10), 
    role: 'user',
    createdAt: new Date('2024-01-02')
  }
];

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function createUser(userData) {
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id,
    username: userData.username,
    passwordHash: userData.passwordHash,
    role: userData.role || 'user',
    createdAt: new Date()
  };
  users.push(newUser);
  return newUser;
}

function getAllUsers() {
  return users.map(user => ({
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt
  }));
}

module.exports = {
  findUserByUsername,
  findUserById,
  createUser,
  getAllUsers
};
