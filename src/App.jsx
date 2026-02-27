import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";

import Login from "./components/Login/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import OTP from "./components/OTP/OTP";
import ResetPassword from "./pages/ResetPasswordPage";
import Update from "./components/Update"; // ✅ Import the Update component

// ProtectedRoute with debug logs
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log(
    "ProtectedRoute check. Path:",
    location.pathname,
    "Loading:",
    loading,
    "Authenticated:",
    isAuthenticated,
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: access granted to", location.pathname);
  return children;
};

// PublicRoute with debug logs
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log(
    "PublicRoute check. Path:",
    location.pathname,
    "Loading:",
    loading,
    "Authenticated:",
    isAuthenticated,
  );

  if (loading) return null;

  if (isAuthenticated) {
    console.log(
      "PublicRoute: already authenticated, redirecting to /dashboard",
    );
    return <Navigate to="/dashboard" replace />;
  }

  console.log("PublicRoute: access granted to", location.pathname);
  return children;
};

const App = () => {
  console.log("App initialized");

  return (
    <Router>
      <AuthProvider>
        <BoardProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/verify-otp"
              element={
                <PublicRoute>
                  <OTP />
                </PublicRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update" element={<Update />} />{" "}
            {/* ✅ NEW: Update password route */}
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BoardProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
