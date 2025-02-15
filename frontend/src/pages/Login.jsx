import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connectSocket } from "../socket"; // Import WebSocket connection function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("🔄 Sending login request...");
      const res = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      console.log("✅ Response received:", res.data);

      if (res.data.token) {
        // ✅ Store token in localStorage
        localStorage.setItem("token", res.data.token);
        console.log("🔑 Token stored:", res.data.token);

        // ✅ Connect WebSocket after successful login
        connectSocket();

        console.log("➡️ Navigating to dashboard...");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError("❌ Login failed: No token received.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>

        <p className="mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
