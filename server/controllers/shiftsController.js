const express = require('express');
const shiftsService = require('../services/shiftsService');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Entry Point: 'http://localhost:3000/shifts'

// Get All Shifts with query
router.get('/', verifyToken, async (req, res) => {
  try {
    const filters = req.query;
    const shifts = await shiftsService.getAllShifts(filters);
    res.json(shifts);
  } catch (error) {
    res.json(error);
  }
});

// Get a Shift By ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await shiftsService.getById(id);
    res.json(shift);
  } catch (error) {
    res.json(error);
  }
});

// Add a new Shift
router.post('/', verifyToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await shiftsService.addShift(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a Shift
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await shiftsService.updateShift(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
