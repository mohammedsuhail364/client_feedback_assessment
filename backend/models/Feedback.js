const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String },
  adminComment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
