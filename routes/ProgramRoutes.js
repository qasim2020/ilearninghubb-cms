const multer = require("multer");
const path = require("path");

const express = require('express');
const app = express();
const router = express.Router();
const requireLogin = require('../modules/authenticate');
const programController = require('../controllers/programController');

// Set up storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post("/upload-program-image", upload.single("programImage"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    // Return the uploaded image URL
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

router.get("/programs", requireLogin, programController.programs);

module.exports = router;