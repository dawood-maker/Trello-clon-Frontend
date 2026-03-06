// src/Components/LoginPage.jsx
import React, { useState } from "react";
import { useBoard } from "../context/BoardContext";
import axios from "axios";

export default function LoginPage() {
  console.log("🔄 LoginPage Component Rendered");

  const { setUser } = useBoard();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("📩 Login Button Clicked");

    if (!email || !password) {
      console.log("⚠️ Validation Failed - Missing Fields");
      setError("Fill in all fields");
      return;
    }

    console.log("🔐 Sending Login Request:", { email });

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      console.log("✅ Login Success Response:", res.data);
      console.log("👤 Setting User:", res.data.user);

      setUser(res.data.user);
    } catch (err) {
      console.log("❌ Login Failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
        Trello Clone
      </h1>
      <p className="mb-6 text-white text-lg drop-shadow-sm">
        Login to your account
      </p>
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 flex flex-col transform hover:scale-105 transition-transform duration-300">
        {error && (
          <>
            {console.log("⚠️ Error Displayed:", error)}
            <p className="text-red-600 font-semibold mb-2 animate-pulse">
              {error}
            </p>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            console.log("✏️ Email Changed:", e.target.value);
            setEmail(e.target.value);
          }}
          className="mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            console.log("✏️ Password Changed");
            setPassword(e.target.value);
          }}
          className="mb-6 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}
