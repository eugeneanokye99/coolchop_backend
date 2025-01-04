const express = require('express');
const locationController = require('../controllers/locationController');
const router = express.Router();

router.get('/confirm', locationController.confirmLocation);
router.get('/check', locationController.getConfirmLocationById);


module.exports = router;