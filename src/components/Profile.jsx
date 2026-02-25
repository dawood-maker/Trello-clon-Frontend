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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Baqi sara JSX bilkul same hai — koi change nahi kiya */}
    </div>
  );
};

export default Profile;
