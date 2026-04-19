const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST /students - Create a new student
router.post('/', async (req, res) => {
  try {
    const { name, rollNumber, course, age } = req.body;

    // Basic validation
    if (!name || !rollNumber || !course || !age) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const student = new Student({ name, rollNumber, course, age });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    // Duplicate roll number
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Roll number already exists.' });
    }
    res.status(500).json({ message: err.message });
  }
});

// GET /students - Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /students/:id - Update a student
router.put('/:id', async (req, res) => {
  try {
    const { name, rollNumber, course, age } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNumber, course, age },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found.' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Roll number already exists.' });
    }
    res.status(500).json({ message: err.message });
  }
});

// DELETE /students/:id - Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
