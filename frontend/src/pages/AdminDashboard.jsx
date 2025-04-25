import { useEffect, useState } from "react";
import API from "../api/api";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return navigate("/");

    const user = JSON.parse(userData);
    if (!user?.isAdmin) navigate("/feedback");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();
      if (filter) queryParams.append("rating", filter);
      if (sortOrder) queryParams.append("sort", sortOrder);

      const { data } = await API.get(`/feedback?${queryParams.toString()}`);
      setFeedbacks(data);
    };

    fetchData();
  }, [filter, sortOrder]);

  const comment = async (id) => {
    if (commentText.trim()) {
      await API.put(`/feedback/${id}/comment`, { comment: commentText });
      alert("Comment added");
      setCommentText("");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-6 text-white">
      {/* 🔓 Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>

      <motion.div
        className="w-full max-w-4xl mx-auto bg-gray-800/70 backdrop-blur-md p-8 rounded-lg shadow-lg space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl text-center font-semibold text-indigo-400">
          Admin Dashboard
        </h2>

        <div className="flex justify-between items-center gap-4">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="py-2 px-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Feedback</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="py-2 px-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <motion.div
              key={fb._id}
              className="bg-gray-700 p-6 rounded-lg shadow-md space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{fb.user.username}</p>
                  <p className="text-gray-300">{fb.text}</p>
                  <p className="mt-2 text-yellow-400">⭐ {fb.rating}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(fb.createdAt).toLocaleString()}
                  </p>
                </div>
                {fb.image && (
                  <img
                    src={`http://localhost:5000/uploads/${fb.image}`}
                    alt="Feedback"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 mt-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => comment(fb._id)}
                  className="mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
                >
                  Submit Comment
                </button>
              </div>

              {fb.adminComment && (
                <p className="text-sm text-gray-400 mt-2">
                  <strong>Admin Comment:</strong> {fb.adminComment}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
