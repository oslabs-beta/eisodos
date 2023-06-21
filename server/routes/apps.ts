import express from 'express';
import isAuthenticated from '../controllers/isAuthenticated';
import appsController from '../controllers/appsController';

const router = express.Router();

router.get('/apps', isAuthenticated, appsController.getPods, (req, res) => {
  return res.status(200).json(res.locals.pods);
});

export default router;
