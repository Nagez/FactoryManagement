const express = require('express');
const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService'); // Import the service

const router = express.Router();

// Entry Point: http://localhost:3000/auth

router.post('/login', async (req, res) => {
  const { username, mail } = req.body;

  try {
    // Use the service to verify username and mail
    const user = await usersService.findUserByUsernameAndMail(username, mail);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    const SECRET_KEY = 'some_key';
    const token = jwt.sign({ id: user.id, username: user.name }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
