import { useLocation, Link } from "react-router-dom";
import UpdatePasswordForm from "../components/UpdatePassword/UpdatePasswordForm";

const UpdatePasswordPage = () => {
  const location = useLocation();
  const { email, otp } = location.state || {};

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-xl font-bold text-gray-900">Invalid session</h2>
        <p className="text-gray-600 mt-2">
          Your session is invalid or expired. Please request a new OTP.
        </p>
        <Link
          to="/forgot-password"
          className="mt-4 inline-flex justify-center py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Request New OTP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Set a New Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose a strong password for your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow-xl sm:rounded-lg border border-gray-200">
        <UpdatePasswordForm email={email} otp={otp} />
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
