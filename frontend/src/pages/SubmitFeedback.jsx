import { useEffect, useState } from "react";
import API from "../api/api";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SubmitFeedback = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("rating", rating);
    if (image) formData.append("image", image);

    try {
      await API.post("/feedback", formData);
      setSuccess(true);
      setText("");
      setRating(0);
      setImage(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting feedback", err);
    }
  };

  // 🔒 Logout function: removes cookie and redirects
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/"); // or navigate("/login") depending on your routes
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.isAdmin) {
        navigate("/admin");
      }
    } else {
      navigate("/"); // or redirect to login if no user
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 text-white">
      {/* 🧭 Logout Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center justify-center">
        <motion.form
          className="bg-gray-800/70 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-lg space-y-5"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center text-indigo-400 mb-2">
            Submit Your Feedback 📝
          </h2>

          <div>
            <label className="block text-sm mb-1">Feedback</label>
            <textarea
              placeholder="Your feedback..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows="4"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Rating (1 to 5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Optional Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="w-full text-sm file:bg-indigo-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-center text-sm"
            >
              Feedback submitted successfully ✅
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold text-white"
          >
            Submit Feedback
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default SubmitFeedback;
