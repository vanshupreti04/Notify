import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connectSocket } from "../socket"; // Import WebSocket connection function
import { FaGithub } from "react-icons/fa"; // GitHub icon
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for show/hide password
import LoginImage from "../assets/LoginImage.png"; // Correctly import the image from the assets folder
import { Spotlight } from "../blocks/Spotlight/NewSpotlight"; // Import Spotlight component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility state
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
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Spotlight Effect - Positioned behind everything */}
      <Spotlight className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="flex w-full max-w-4xl p-4 z-10">
        {/* Left Image */}
        <div className="w-1/2 h-120px">
          <img
            src={LoginImage} // Correct path to the imported LoginImage
            alt="Login Image"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Section (Login Form in Purple) */}
        <div
          className="w-1/2 bg-[#2C1A47] text-white p-6 rounded-r-xl shadow-lg flex flex-col justify-center items-center h-full"
        >
          <h2 className="text-4xl font-extrabold mb-4">Login</h2>
          <p className="text-gray-300 mb-6">Get started with just one click.</p>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-3 focus:ring-black"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility based on state
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-3 focus:ring-black"
                  placeholder="Password"
                  required
                />
                {/* Show/Hide Password Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  className="absolute right-3 top-4 text-black"
                >
                  {showPassword ? (
                    <FaEyeSlash /> // Show "hide" icon when password is visible
                  ) : (
                    <FaEye /> // Show "show" icon when password is hidden
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black p-2 rounded mt-6 border border-black hover:border-white hover:bg-black hover:text-white transition-all"
            >
              Login
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-4 text-center text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>

          {/* Line divider */}
          <div className="w-full mt-6 border-t border-gray-400"></div>

          {/* GitHub Login Button */}
          <button
            onClick={() => console.log("Login with GitHub")}
            className="w-full bg-gray-800 text-white p-2 rounded mt-6 flex items-center justify-center hover:bg-gray-700"
          >
            <FaGithub className="mr-2" />
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
