import express from 'express';
import isAuthenticated from '../controllers/isAuthenticated';
import dashboardController from '../controllers/dashBoardController';

const router = express.Router();

router.get('/metrics', isAuthenticated, dashboardController.getClusterData, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.get('/global-metrics', isAuthenticated, dashboardController.getGlobalMetrics, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.get(
  '/count',
  isAuthenticated,
  dashboardController.getNumberOf,
  (req, res) => {
    return res.status(200).json(res.locals.count);
  }
);

export default router;
