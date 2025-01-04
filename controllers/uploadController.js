const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('file');

exports.uploadUserImage =  (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ success: false, message: 'Failed to upload image', error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl, imageName : req.file.filename });
  });
};



