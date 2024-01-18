const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventcontroller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}_${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/events', upload.array('images', 10), createEvent);

module.exports = router;
