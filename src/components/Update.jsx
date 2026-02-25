import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearError } = useAuth();

  // ✅ OTP.jsx se { email, otp } aata hai
  const { email, otp } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if email/otp missing
  useEffect(() => {
    if (!email || !otp) {
      console.log("Invalid session, redirecting to forgot-password");
      setMessage("⚠️ Invalid or expired session. Redirecting...");
      setTimeout(() => navigate("/forgot-password"), 2000);
    }
  }, [email, otp, navigate]);

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (password.length === 0) return { text: "", color: "" };
    if (password.length < 6)
      return { text: "Too Short", color: "text-red-600" };
    if (password.length < 8) return { text: "Weak", color: "text-orange-600" };
    if (password.length < 12) return { text: "Good", color: "text-yellow-600" };
    return { text: "Strong", color: "text-green-600" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setMessage("");

    console.log("Submitting new password:", newPassword);

    // Validation
    if (newPassword.length < 6) {
      console.log("Password too short");
      setMessage("❌ Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      setMessage("❌ Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:5002/api"}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            otp, // ✅ Backend expects 'otp', not 'resetToken'
            newPassword,
          }),
        },
      );

      const data = await res.json();
      console.log("Response from reset-password API:", data);

      if (data.success) {
        setMessage("✅ Password updated successfully! Redirecting to login...");
        console.log("Password reset successful, redirecting to login");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message || "Failed to update password."}`);
      }
    } catch (err) {
      console.error("❌ Reset password error:", err);
      setMessage("❌ Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set a New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose a strong password for your account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200">
          {message && (
            <div
              className={`px-4 py-3 rounded-lg text-sm mb-4 flex items-center space-x-2 ${
                message.includes("✅")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}
            >
              <span>{message}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => {
                    console.log("New password changed:", e.target.value);
                    setNewPassword(e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Enter new password (min 6 characters)"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {/* Eye icon here */}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    console.log("Confirm password changed:", e.target.value);
                    setConfirmPassword(e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Re-enter your password"
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !email || !otp}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating Password...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                console.log("Back to login clicked");
                navigate("/login");
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
