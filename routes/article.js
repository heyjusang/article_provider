const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');

router.get('/', articleController.getNext);

module.exports = router;