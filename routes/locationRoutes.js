const express = require('express');
const locationController = require('../controllers/locationController');
const router = express.Router();

router.put('/confirm', locationController.updateUserLocation);
router.get('/check', locationController.getConfirmLocationById);


module.exports = router;