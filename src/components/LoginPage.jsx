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
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Trello Clone</h1>
      <p className="mb-6 text-gray-700">Login to your account</p>
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col">
        {error && (
          <>
            {console.log("⚠️ Error Displayed:", error)}
            <p className="text-red-500 mb-2">{error}</p>
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
          className="mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            console.log("✏️ Password Changed");
            setPassword(e.target.value);
          }}
          className="mb-4 p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
