const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuth } = require('../middleware/auth');

// Show login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Show register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Show dashboard
router.get('/dashboard', isAuth, (req, res) => {
  res.render('dashboard');
});

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/register');
    }

    // Create new user with role based on isAdmin checkbox
    const user = new User({ 
      email, 
      password,
      role: isAdmin ? 'admin' : 'user'
    });
    await user.save();

    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', 'Registration failed');
    res.redirect('/register');
  }
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }

    // Set session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };
    
    req.flash('success', 'Login successful!');
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error', 'Login failed');
    res.redirect('/login');
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
