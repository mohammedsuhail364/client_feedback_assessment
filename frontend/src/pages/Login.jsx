import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie"; // 🆕 For cookie handling

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // 🧠 Redirect if already logged in (token exists)
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/feedback");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);

      // ✅ Store token in cookie
      Cookies.set("token", data.token, { expires: 7, secure: true });

      login(data); // Optional context state
      navigate(data.isAdmin ? "/admin" : "/feedback");
    } catch (err) {
      setError("Invalid credentials",err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white px-4">
      <motion.div
        className="bg-gray-800/70 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-400">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold text-white"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
