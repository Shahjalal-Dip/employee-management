const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const isAuth = require('../middleware/auth');

router.use(isAuth); // Protect all employee routes


// READ - Show all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('index', { employees });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// CREATE - Show form
router.get('/new', (req, res) => {
  res.render('new');
});

// CREATE - Handle form submit
router.post('/', async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;

  if (!firstName || !lastName || !email || !department || !salary) {
    return res.status(400).send("⚠️ All fields are required.");
  }

  try {
    const employee = new Employee({ firstName, lastName, email, department, salary });
    await employee.save();
    req.flash('success_msg', 'Employee added successfully');
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send("❌ Something went wrong.");
  }
});


// UPDATE - Show edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.render('edit', { employee });
  } catch (err) {
    res.status(404).send('Employee not found');
  }
});

// UPDATE - Handle form submit
router.post('/edit/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, {
      firstName, lastName, email, department, salary
    });
    res.redirect('/employees');
  } catch (err) {
    res.status(400).send('Error updating employee');
  }
});

// DELETE
router.post('/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
  } catch (err) {
    res.status(400).send('Error deleting employee');
  }
});

module.exports = router;
