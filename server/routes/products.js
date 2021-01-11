const multer = require('multer');
const express = require('express');
const {Product} = require('../models/Product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({storage}).single('file');

router.post('/image', (req, res) => {
  upload(req, res, err => {
    if (err) return res.json({success: false, err});
    res.json({
      success: true,
      filename: res.req.file.filename,
      filepath: res.req.file.path,
    });
  });
});

router.post('/', (req, res) => {
  const product = new Product(req.body);

  product.save(err => {
    if (err) {
      return res.status(400).json({success: false, err});
    }
    res.status(200).json({success: true});
  });
});

module.exports = router;
