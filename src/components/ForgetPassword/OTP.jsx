import React, { useState } from "react";

const OTP = ({ email, navigate, debugOtp }) => {
  console.log("🔐 OTP Component Rendered");

  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    console.log("Debug OTP:", debugOtp);

    if (otp === debugOtp) {
      console.log("✅ OTP Verified");
      navigate("/reset-password");
    } else {
      console.log("❌ Invalid OTP");
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Enter OTP
        </h2>
        <p className="text-center text-sm text-gray-600 mt-2">
          OTP sent to {email}
        </p>
        <p className="text-center text-xs text-gray-400 mt-1">
          (Debug OTP: {debugOtp})
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleVerify}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            required
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
