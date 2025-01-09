const express = require('express');
const usersService = require('../services/usersService');

const router = express.Router();

// Entry Point: 'http://localhost:3000/users'

// Get All Users
router.get('/', async (req, res) => {
  const users = await usersService.getAllUsers();
  res.json(users);
});

module.exports = router;
