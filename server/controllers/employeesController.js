const express = require('express');
const employeesService = require('../services/employeesService');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Entry Point: 'http://localhost:3000/employees'

// Get All Employees
router.get('/', verifyToken, async (req, res) => {
  const employees = await employeesService.getAllEmployees();
  res.json(employees);
});

// Get a Employee By ID
router.get('/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeesService.getById(id);
    res.json(employee);
  } catch (error) {
    res.json(error);
  }
});

// Add a new Employee
router.post('/',verifyToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await employeesService.addEmployee(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a Employee
router.put('/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await employeesService.updateEmployee(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// DELETE an Employee
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeesService.deleteEmployee(id); // Call the delete method in the service
    if (result) {
      res.json({ message: `Employee with ID ${id} deleted successfully.` });
    } else {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
