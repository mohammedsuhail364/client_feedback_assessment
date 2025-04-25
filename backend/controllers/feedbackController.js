const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  const { text, rating } = req.body;
  const image = req.file?.filename;

  const feedback = new Feedback({ user: req.user._id, text, rating, image });
  await feedback.save();
  res.json(feedback);
};

exports.getAllFeedback = async (req, res) => {
  const { rating, sort = "desc" } = req.query;

  const query = rating ? { rating } : {};
  const sortOrder = sort === "asc" ? "createdAt" : "-createdAt";

  const feedbacks = await Feedback.find(query)
    .populate("user", "username")
    .sort(sortOrder);

  res.json(feedbacks);
};


exports.commentOnFeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).json({ message: "Not found" });

  feedback.adminComment = req.body.comment;
  await feedback.save();
  res.json(feedback);
};
