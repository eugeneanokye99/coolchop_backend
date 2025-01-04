const express = require('express');
const { uploadUserImage } = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload_image' ,uploadUserImage);


module.exports = router;
