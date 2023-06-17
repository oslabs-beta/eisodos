import express from 'express';
import isAuthenticated from '../controllers/isAuthenticated';
import hierarchyController from '../controllers/hierarchyController';

const router = express.Router(); 

router.get('/cluster', isAuthenticated, hierarchyController.showCluster, (req, res) = {
    // return res.status(200).json(res.locals.hierarchy);
});