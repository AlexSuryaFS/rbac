const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { createUser } = require('../config/database');
const { ensureGuest } = require('../middleware/auth');

const router = express.Router();

// Login route
router.post('/login', ensureGuest, passport.authenticate('local', {
  successRedirect: '/protected.html',
  failureRedirect: '/login.html?error=1'
}));

// Register route
router.post('/register', ensureGuest, async (req, res) => {
  const { username, password, role } = req.body;
  
  if (!username || !password) {
    return res.redirect('/register.html?error=missing');
  }
  
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = {
      username,
      passwordHash,
      role: role === 'admin' ? 'admin' : 'user'
    };
    
    createUser(userData);
    res.redirect('/login.html?registered=1');
  } catch (error) {
    console.error('Registration error:', error);
    res.redirect('/register.html?error=server');
  }
});

// Logout route
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/index.html');
  });
});

module.exports = router;
