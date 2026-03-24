import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  console.log("🔄 Login Component Rendered");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 Auth State Changed:", isAuthenticated);
    if (isAuthenticated) {
      console.log(". User Authenticated → Navigating to /dashboard");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log("🧹 Clearing errors on mount");
    clearError();
  }, []);

  const handleChange = (e) => {
    console.log("✏️ Input Changed:", e.target.name, e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      console.log("⚠️ Clearing existing error");
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    console.log("📩 Login Form Submitted");
    e.preventDefault();

    console.log("⏳ Setting loading true");
    setIsLoading(true);

    console.log("🔐 Sending login request:", formData.email);
    const result = await login(formData.email, formData.password);

    console.log("📬 Login API Result:", result);

    if (result.success) {
      console.log(". Login Successful → Navigating to /dashboard");
      navigate("/dashboard");
    } else {
      console.log("❌ Login Failed");
    }

    console.log("⏳ Setting loading false");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-pink-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-pink-500 hover:text-purple-600"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-xl sm:px-10 border border-purple-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <>
                {console.log("⚠️ Error Displayed:", error)}
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-purple-700"
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
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-purple-300 rounded-xl shadow-md placeholder-purple-400 focus:outline-none focus:ring-pink-400 focus:border-pink-500 sm:text-sm transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-purple-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-purple-300 rounded-xl shadow-md placeholder-purple-400 focus:outline-none focus:ring-pink-400 focus:border-pink-500 sm:text-sm transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-pink-500 hover:text-purple-600"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    {console.log("🔄 Loading Spinner Active")}
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
