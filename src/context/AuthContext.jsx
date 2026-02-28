import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = "http://localhost:5002/api";
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);
  //===================================
  // ------------------ REGISTER ------------------
  //===================================
  const register = async (name, email, password) => {
    console.log("Register called with:", { name, email, password });
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Important: for cookies
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      console.log("Register response:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError(data.message || "Registration failed");
      }

      return data;
    } catch (err) {
      console.error("Register frontend error:", err);
      setError("Network error. Please try again.");
      return { success: false, message: err.message };
    }
  };
  //===================================
  // ------------------ LOGIN ------------------
  //===================================
  const login = async (email, password) => {
    console.log("Login called with:", { email, password });
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ for cookies
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError(data.message || "Login failed");
      }

      return data;
    } catch (err) {
      console.error("Login frontend error:", err);
      setError("Network error. Please try again.");
      return { success: false, message: err.message };
    }
  };
  //===================================
  // ------------------ LOGOUT ------------------
  //===================================
  const logout = async () => {
    console.log("Logout called");
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      console.log("Clearing local user data");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  };
  //===================================
  // ------------------ FORGOT PASSWORD ------------------
  //===================================
  const forgotPassword = async (email) => {
    console.log("ForgotPassword called with:", { email });
    try {
      setError(null);
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log("ForgotPassword response:", data);
      if (!data.success) setError(data.message || "Failed to send OTP");
      return data;
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Network error. Please try again.");
      return { success: false, message: err.message };
    }
  };
  //===================================
  // ------------------ VERIFY OTP ------------------
  //===================================
  const verifyOTP = async (email, otp) => {
    console.log("VerifyOTP called with:", { email, otp });
    try {
      setError(null);
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      console.log("VerifyOTP response:", data);
      if (!data.success) setError(data.message || "Invalid OTP");
      return data;
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("Network error. Please try again.");
      return { success: false, message: err.message };
    }
  };
  //===================================
  // ------------------ RESET PASSWORD ------------------
  //===================================
  const resetPassword = async (email, otp, newPassword) => {
    console.log("ResetPassword called with:", { email, otp, newPassword });
    try {
      setError(null);
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      console.log("ResetPassword response:", data);
      if (!data.success) setError(data.message || "Failed to reset password");
      return data;
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Network error. Please try again.");
      return { success: false, message: err.message };
    }
  };
  //===================================
  // Legacy support
  //===================================
  const updatePassword = resetPassword;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
        updatePassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//===================================
// Custom hook
//===================================
export const useAuth = () => useContext(AuthContext);
