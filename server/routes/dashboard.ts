import express from 'express';
import isAuthenticated from '../controllers/isAuthenticated';
import dashboardController from '../controllers/dashBoardController';

const router = express.Router();

router.get(
  '/metrics',
  isAuthenticated,
  dashboardController.getClusterData,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

export default router;
