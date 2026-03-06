import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Profile component mounted");
    console.log("User data:", user);

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
    if (message) setMessage("");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    console.log("Profile update submitted");
    console.log("Form Data:", formData);

    setIsLoading(true);
    setError("");
    setMessage("");

    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
    });

    console.log("Update Profile Result:", result);

    if (result.success) {
      setMessage("Profile updated successfully!");
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    console.log("Password change submitted");
    console.log("Password Data:", formData);

    if (formData.newPassword !== formData.confirmPassword) {
      console.log("Passwords do not match");
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      console.log("Password too short");
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    setTimeout(() => {
      console.log("Password changed successfully (simulated)");
      setMessage("Password changed successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    navigate("/login");
  };

  if (!user) {
    console.log("User not loaded yet");
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-red-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4  border-b-4 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-white font-semibold text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-extrabold mb-6 text-purple-700 drop-shadow-md">
          Your Profile
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "password"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>

        {/* Messages */}
        {error && (
          <p className="text-red-600 font-semibold mb-4 animate-pulse">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 font-semibold mb-4 animate-pulse">
            {message}
          </p>
        )}

        {/* Profile Form */}
        {activeTab === "profile" && (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        )}

        {/* Password Form */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        )}

        <button
          onClick={handleLogout}
          className="mt-8 w-full py-3 bg-red-500 text-white rounded-xl font-bold shadow-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
