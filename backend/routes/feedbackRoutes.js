const express = require("express");
const multer = require("multer");
const { protect } = require("../middlewares/authMiddleware");
const {
  submitFeedback,
  getAllFeedback,
  commentOnFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post("/", protect, upload.single("image"), submitFeedback);
router.get("/", protect, getAllFeedback);
router.put("/:id/comment", protect, commentOnFeedback);

module.exports = router;
