import express from 'express';
import isAuthenticated from '../controllers/isAuthenticated';
import dashboardController from '../controllers/dashBoardController';

const router = express.Router();

router.get(
  '/dashboard',
  isAuthenticated,
  dashboardController.getClusterData,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

export default router;
