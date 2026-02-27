import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import MessageAlert from "./MessageAlert";
import { useAuth } from "../../context/AuthContext";

const ResetPasswordForm = ({ resetToken, email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setMessage("Both fields are required");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!resetToken) {
      setMessage("Invalid reset token. Please request a new OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await resetPassword(resetToken, newPassword);
      if (result.success) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(
          () =>
            navigate("/login", {
              state: {
                message:
                  "Password reset successfully! Please login with your new password.",
              },
            }),
          2000,
        );
      } else {
        setMessage(result.message || "Failed to reset password");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
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
        showStrength={true}
      />
      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      {confirmPassword && newPassword !== confirmPassword && (
        <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
      )}

      <button
        type="submit"
        disabled={
          isLoading || newPassword.length < 6 || newPassword !== confirmPassword
        }
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        {isLoading ? "Updating Password..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
