const multer = require('multer');
const express = require('express');
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

module.exports = router;
