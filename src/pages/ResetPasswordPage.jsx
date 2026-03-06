import { useLocation, Link } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPassword/ResetPasswordForm";

const ResetPasswordPage = () => {
  const location = useLocation();
  const { email, otp } = location.state || {};

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-red-400 px-4 animate-fadeIn">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-2xl">
          <h2 className="mt-4 text-2xl font-extrabold text-red-700 drop-shadow-md">
            Invalid Reset Link
          </h2>
          <p className="mt-2 text-gray-600">
            This password reset link is invalid or has expired.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              to="/forgot-password"
              className="w-full inline-flex justify-center py-3 px-4 rounded-xl shadow-lg text-white font-bold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 transition-all"
            >
              Request New Reset Link
            </Link>
            <Link
              to="/login"
              className="w-full inline-flex justify-center py-3 px-4 rounded-xl shadow-md text-gray-700 bg-white hover:bg-gray-100 transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-purple-700 drop-shadow-md">
          Create New Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Set a strong password for{" "}
          <strong className="text-blue-600">{email}</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-10 px-6 shadow-2xl sm:rounded-3xl sm:px-10 transform hover:scale-105 transition-transform duration-300">
        <ResetPasswordForm email={email} otp={otp} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
