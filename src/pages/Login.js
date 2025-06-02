import React, { useState } from "react";
import { auth } from "../config/firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying errors
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Dummy logic for role-based navigation
      if (user.email === "admin@gmail.com") {
        navigate("/admin");
        // admin password is admin123
      } else if (user.email === "teacher@gmail.com") {
        navigate("/teacher");
        // teacher password is teacher123
      } else {
        navigate("/student");
        // student password is student123
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again."); // Set error message
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      {/* Left Section: LMS Branding and Image */}
      <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 bg-blue-900 text-white p-10">
        <h1 className="text-5xl font-bold text-center mb-4">School Learning Management System</h1>
        <p className="text-xl text-center mb-6">Empowering Students and Teachers for Success</p>
        <img
          src="/path/to/lms-illustration.png" // Replace with your image URL
          alt="LMS Illustration"
          className="w-3/4 max-w-md mb-8"
        />
        <p className="text-sm text-center">A platform to enhance your learning journey. Accessible. Interactive. Seamless.</p>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login to LMS</h2>

          {/* Display error message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full p-3 border-2 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Password visibility toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
