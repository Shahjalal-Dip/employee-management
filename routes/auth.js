const express = require('express');
const router = express.Router();

const ADMIN = {
  email: 'admin@example.com',
  password: 'admin123'
};

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    req.session.isAuth = true;
    req.flash('success_msg', 'Login successful!');
    return res.redirect('/employees');
  } else {
    req.flash('error_msg', 'Invalid credentials');
    return res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;
