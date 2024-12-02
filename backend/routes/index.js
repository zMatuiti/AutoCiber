const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Ruta principal para API
router.get('/', homeController.getHome);

router.post('/create', homeController.createItem);

module.exports = router;
