import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ ADD 1: Import useAuth

const OTP = ({ email, navigate }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(120);
  const { verifyOTP } = useAuth(); // ✅ ADD 2: verifyOTP nikaalo AuthContext se
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

  const handleVerify = async (e) => {
    e.preventDefault();
    if (isLoading || hasNavigated.current) return;

    if (otp.length !== 6) {
      setMessage("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // ✅ ADD 3: axios hatao, verifyOTP use karo AuthContext se
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
      } else {
        setMessage(result.message || "Invalid OTP. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    setMessage("");
    setCounter(120);
    navigate("/forgot-password");
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Enter Verification Code
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We sent a 6-digit code to
          </p>
          <p className="text-sm font-semibold text-blue-600">{email}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200">
          {message && (
            <div
              className={`px-4 py-3 rounded-lg text-sm mb-4 ${
                message.includes("✅")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                maxLength={6}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="000000"
                autoComplete="off"
                disabled={isLoading || hasNavigated.current}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200">
              <span
                className={`text-lg font-bold ${counter <= 30 ? "text-red-600" : "text-blue-600"}`}
              >
                {formatTime(counter)}
              </span>
              <span className="text-sm text-gray-500">Time remaining</span>
            </div>

            <button
              type="submit"
              disabled={
                isLoading ||
                counter === 0 ||
                otp.length !== 6 ||
                hasNavigated.current
              }
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                "Verify & Continue"
              )}
            </button>

            {counter === 0 && (
              <div className="text-center">
                <p className="text-sm text-red-600 mb-2">⏰ OTP has expired</p>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-gray-600 hover:text-gray-900"
              disabled={isLoading}
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