import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ResetPasswordForm = ({ email, otp }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(email, otp, newPassword);

      if (result.success) {
        setMessage(". Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        setMessage(result.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ---------- Message Alert ---------- */}
      {message && (
        <div
          className={`px-4 py-3 rounded-xl text-sm shadow-md mb-4 transition-all ${
            message.includes(".")
              ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
              : "bg-gradient-to-r from-pink-100 to-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* ---------- Error Alert ---------- */}
      {error && (
        <div className="bg-gradient-to-r from-pink-100 to-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-xl text-sm shadow-md mb-4">
          {error}
        </div>
      )}

      {/* ---------- New Password Input ---------- */}
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-purple-700"
        >
          New Password
        </label>
        <div className="mt-1 relative">
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Enter new password"
            className="appearance-none block w-full px-3 py-2 border border-purple-300 rounded-xl shadow-md placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent sm:text-sm bg-gradient-to-br from-purple-50 to-pink-50 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-400 hover:text-pink-500 transition-colors duration-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* ---------- Confirm Password Input ---------- */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-purple-700"
        >
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Confirm new password"
            className="appearance-none block w-full px-3 py-2 border border-purple-300 rounded-xl shadow-md placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent sm:text-sm bg-gradient-to-br from-purple-50 to-pink-50 transition-all"
          />
        </div>
      </div>

      {/* ---------- Submit Button ---------- */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
