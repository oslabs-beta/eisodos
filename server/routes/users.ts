import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

// TODO: auth routes have to be protected

router.post('/register', authController.register, (req, res) => {
  res.status(200).send({ message: 'Registration successful.' });
});

router.post('/login', authController.login, (req, res) => {
  res.status(200).send({ message: 'Login successful.' });
});

router.post('/logout', authController.logout, (req, res) => {
  res.status(200).send({ message: 'Logout successful.' });
});

export default router;
