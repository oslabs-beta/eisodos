const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define route handlers for user routes
router.post('/register', authController.register, (req, res) => {
  res.status(200).send({ message: 'Registration successful.' });
});

router.post('/login', authController.login, (req, res) => {
  res.status(200).send({ message: 'Login successful.' });
});

router.post('/logout', authController.logout, (req, res) => {
  res.status(200).send({ message: 'Logout successful.' });
});

module.exports = router;
