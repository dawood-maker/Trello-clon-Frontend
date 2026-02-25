import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OTP from "./OTP"; // OTP component

const ForgetPassword = () => {
  console.log("🔄 ForgetPassword Component Rendered");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [debugOtp, setDebugOtp] = useState("");

  const { forgotPassword, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("📩 Form Submitted");
    e.preventDefault();

    console.log("🧹 Clearing previous errors");
    clearError();

    console.log("⏳ Setting loading true");
    setIsLoading(true);

    console.log("📧 Sending forgotPassword request for:", email);
    const result = await forgotPassword(email);

    console.log("📬 API Result:", result);

    if (result.success) {
      console.log("✅ OTP Generated Successfully");
      setOtpSent(true);
      setResetToken(result.resetToken || "");
      setDebugOtp(result.debugOtp || "");
    } else {
      console.log("❌ OTP Generation Failed");
    }

    console.log("⏳ Setting loading false");
    setIsLoading(false);
  };

  // If OTP sent, show OTP component instead of email form
  if (otpSent) {
    console.log("🔐 OTP Screen Rendering");
    return <OTP email={email} navigate={navigate} debugOtp={debugOtp} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            return to login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <>
                {console.log("⚠️ Error Message Displayed:", error)}
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    console.log("✏️ Email Changed:", e.target.value);
                    setEmail(e.target.value);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    {console.log("🔄 Loading Spinner Active")}
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending instructions...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
