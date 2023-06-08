import express from 'express';
import authController from '../controllers/authController';
import isAuthenticated from '../controllers/isAuthenticated';
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

router.get('/checklogin', isAuthenticated, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

export default router;
