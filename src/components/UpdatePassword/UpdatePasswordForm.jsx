import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import MessageAlert from "./MessageAlert";
import { useAuth } from "../../context/AuthContext";

const UpdatePasswordForm = ({ email, otp }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
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
          body: JSON.stringify({ email, otp, newPassword }),
        },
      );

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Password updated successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message || "Failed to update password."}`);
      }
    } catch (err) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <MessageAlert message={message} />
      <PasswordInput
        label="New Password"
        value={newPassword}
        onChange={setNewPassword}
        placeholder="Enter new password"
        showStrength
      />
      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Re-enter password"
      />

      <button
        type="submit"
        disabled={isLoading || !email || !otp}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        ) : (
          "Update Password"
        )}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
