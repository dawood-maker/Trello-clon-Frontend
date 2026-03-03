import { useLocation, Link } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPassword/ResetPasswordForm";

const ResetPasswordPage = () => {
  const location = useLocation();
  const { email, otp } = location.state || {};

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Invalid Reset Link
          </h2>
          <p className="mt-2 text-gray-600">
            This password reset link is invalid or has expired.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              to="/forgot-password"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Request New Reset Link
            </Link>
            <Link
              to="/login"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create New Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Set a strong password for{" "}
          <strong className="text-blue-600">{email}</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <ResetPasswordForm email={email} otp={otp} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;