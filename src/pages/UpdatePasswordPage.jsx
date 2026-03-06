import { useLocation, Link } from "react-router-dom";
import UpdatePasswordForm from "../components/UpdatePassword/UpdatePasswordForm";

const UpdatePasswordPage = () => {
  const location = useLocation();
  const { email, otp } = location.state || {};

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-red-400 px-4 animate-fadeIn">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-extrabold text-red-700 drop-shadow-md">
            Invalid session
          </h2>
          <p className="text-gray-600 mt-2">
            Your session is invalid or expired. Please request a new OTP.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-flex justify-center py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Request New OTP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-purple-700 drop-shadow-md">
          Set a New Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose a strong password for your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-10 px-6 shadow-2xl sm:rounded-3xl border border-gray-200 transform hover:scale-105 transition-transform duration-300">
        <UpdatePasswordForm email={email} otp={otp} />
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-purple-700 hover:text-purple-900 font-medium transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
