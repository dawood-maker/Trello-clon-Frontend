import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const OTP = ({ email, navigate }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(120);
  const { verifyOTP, error, clearError } = useAuth();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || hasNavigated.current) return;

    clearError();
    setIsLoading(true);
    setMessage("");

    if (otp.length !== 6) {
      setMessage("OTP must be 6 digits");
      setIsLoading(false);
      return;
    }

    try {
      const result = await verifyOTP(email, otp);

      if (result.success && !hasNavigated.current) {
        hasNavigated.current = true;
        setMessage("✅ OTP verified! Redirecting...");

        setTimeout(() => {
          navigate("/reset-password", {
            state: { email, otp },
            replace: true,
          });
        }, 800);
      } else if (!result.success) {
        setMessage(result.message || "Invalid OTP. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    setMessage("");
    clearError();
    setCounter(120);
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter Verification Code
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">We sent a 6-digit code to</p>
          <p className="text-center text-sm font-semibold text-blue-600">{email}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200">

          {message && (
            <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${
              message.includes("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                maxLength={6}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-bold tracking-widest"
                placeholder="000000"
                autoComplete="off"
                disabled={isLoading || hasNavigated.current}
              />
              <p className="mt-2 text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200">
              <span className={`text-lg font-bold ${counter <= 30 ? "text-red-600" : "text-blue-600"}`}>
                {formatTime(counter)}
              </span>
              <span className="text-sm text-gray-500">Time remaining</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || counter === 0 || otp.length !== 6 || hasNavigated.current}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading
                ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                : "Verify & Continue"
              }
            </button>

            {counter === 0 && (
              <div className="text-center">
                <p className="text-sm text-red-600 mb-2">⏰ OTP has expired</p>
                <button type="button" onClick={handleResendOTP}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Resend OTP
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-gray-600 hover:text-gray-900"
              disabled={isLoading || hasNavigated.current}
            >
              ← Back to email entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;