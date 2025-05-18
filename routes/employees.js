const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { isAuth, isAdmin } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(isAuth);

// READ - Show all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('index', { employees });
  } catch (err) {
    req.flash('error', 'Error fetching employees');
    res.redirect('/');
  }
});

// CREATE - Show form (admin only)
router.get('/new', isAdmin, (req, res) => {
  res.render('new');
});

// CREATE - Handle form submit (admin only)
router.post('/', isAdmin, async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;

  if (!firstName || !lastName || !email || !department || !salary) {
    req.flash('error', 'All fields are required');
    return res.redirect('/employees/new');
  }

  try {
    const employee = new Employee({ firstName, lastName, email, department, salary });
    await employee.save();
    req.flash('success', 'Employee added successfully');
    res.redirect('/employees');
  } catch (err) {
    req.flash('error', 'Error adding employee');
    res.redirect('/employees/new');
  }
});

// UPDATE - Show edit form (admin only)
router.get('/edit/:id', isAdmin, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.render('edit', { employee });
  } catch (err) {
    req.flash('error', 'Employee not found');
    res.redirect('/employees');
  }
});

// UPDATE - Handle form submit (admin only)
router.post('/edit/:id', isAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, {
      firstName, lastName, email, department, salary
    });
    req.flash('success', 'Employee updated successfully');
    res.redirect('/employees');
  } catch (err) {
    req.flash('error', 'Error updating employee');
    res.redirect('/employees');
  }
});

// DELETE (admin only)
router.post('/delete/:id', isAdmin, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    req.flash('success', 'Employee deleted successfully');
    res.redirect('/employees');
  } catch (err) {
    req.flash('error', 'Error deleting employee');
    res.redirect('/employees');
  }
});

module.exports = router;
