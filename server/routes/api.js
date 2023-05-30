const express = require('express');
const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.get('/', exampleController.getMessage, (req, res) => {
  res.status(200).json(res.locals.message);
});

module.exports = router;