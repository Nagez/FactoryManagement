const express = require('express');
const departmentsService = require('../services/departmentsService');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Entry Point: 'http://localhost:3000/departments'

// Get All Departments with query
router.get('/', verifyToken, async (req, res) => {
  try {
    const filters = req.query;
    const departments = await departmentsService.getAllDepartments(filters);
    res.json(departments);
  } catch (error) {
    res.json(error);
  }
});

// Get a Department By ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentsService.getById(id);
    res.json(department);
  } catch (error) {
    res.json(error);
  }
});

// Add a new Department
router.post('/', verifyToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await departmentsService.addDepartment(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a Department
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await departmentsService.updateDepartment(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// DELETE a Department
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await departmentsService.deleteDepartment(id); // Call the delete method in the service
    if (result) {
      res.json({ message: `Department with ID ${id} deleted successfully.` });
    } else {
      res.status(404).json({ message: `Department with ID ${id} not found.` });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
