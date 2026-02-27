import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get resetToken and email from location state
  const { resetToken, email } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword } = useAuth();

  // Check password strength
  useEffect(() => {
    if (newPassword.length === 0) {
      setPasswordStrength("");
    } else if (newPassword.length < 6) {
      setPasswordStrength("weak");
    } else if (newPassword.length < 8) {
      setPasswordStrength("fair");
    } else if (newPassword.length >= 8) {
      setPasswordStrength("strong");
    }

    console.log("Password strength updated:", passwordStrength);
  }, [newPassword, passwordStrength]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    console.log("Form submitted with:", { newPassword, confirmPassword });

    // Validation
    if (!newPassword || !confirmPassword) {
      setMessage("Both fields are required");
      console.log("Validation failed: Both fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      console.log("Validation failed: Password too short");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      console.log("Validation failed: Passwords do not match");
      return;
    }

    if (!resetToken) {
      setMessage("Invalid reset token. Please request a new OTP.");
      console.log("Validation failed: Invalid reset token");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(resetToken, newPassword);
      console.log("Reset password API result:", result);

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
      console.log("Error during password reset:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check for valid reset token
  if (!resetToken) {
    console.log("No reset token found. Showing invalid reset link UI.");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Invalid Reset Link
          </h2>
          <p className="mt-2 text-gray-600">
            This password reset link is invalid or has expired.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              to="/forgot-password"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request New Reset Link
            </Link>
            <Link
              to="/login"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create New Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Set a strong password for{" "}
          <strong className="text-blue-600">{email}</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div
              className={`px-4 py-3 rounded-md text-sm mb-4 ${
                message.includes("success")
                  ? "bg-green-50 text-green-600 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password (minimum 6 characters)"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    console.log("New password input:", e.target.value);
                  }}
                  required
                  minLength={6}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-500">Strength:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 w-8 rounded-full ${
                            passwordStrength === "weak" && level === 1
                              ? "bg-red-500"
                              : passwordStrength === "fair" && level <= 2
                                ? "bg-yellow-500"
                                : passwordStrength === "strong" && level <= 3
                                  ? "bg-green-500"
                                  : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`font-medium ${
                        passwordStrength === "weak"
                          ? "text-red-600"
                          : passwordStrength === "fair"
                            ? "text-yellow-600"
                            : passwordStrength === "strong"
                              ? "text-green-600"
                              : "text-gray-500"
                      }`}
                    >
                      {passwordStrength &&
                        passwordStrength.charAt(0).toUpperCase() +
                          passwordStrength.slice(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    console.log("Confirm password input:", e.target.value);
                  }}
                  required
                  minLength={6}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                isLoading ||
                newPassword.length < 6 ||
                newPassword !== confirmPassword
              }
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to Login
            </Link>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-xs text-blue-700 text-center">
              <strong>Security Tip:</strong> Use a strong, unique password that
              you don't use for other websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
