// src/components/AddBoard/AddBoard.jsx
import React, { useState } from "react";
import { useBoard } from "../../../context/BoardContext";

const AddBoard = () => {
  const { addBoard } = useBoard();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#14213d");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddBoard = async () => {
    if (!name.trim()) {
      setErrorMsg("Board name required!");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      //  name aur color backend ko jayega, MongoDB mein save hoga
      await addBoard(name.trim(), color);

      setName("");
      setColor("#14213d");
      console.log("Board created:", name, color);
    } catch (err) {
      setErrorMsg(err.message || "Board create karne mein error");
      console.error("AddBoard error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md p-4 space-y-3 w-full max-w-sm hover:shadow-lg transition-all duration-200">

      <input
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />

      <div className="flex items-center justify-between">
        <label className="text-xs text-gray-500 font-medium">
          Board Color
        </label>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={loading}
          className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
        />
      </div>

      {errorMsg && (
        <p className="text-red-500 text-xs font-medium bg-red-50 border border-red-200 px-2 py-1 rounded">
          {errorMsg}
        </p>
      )}

      <button
        onClick={handleAddBoard}
        disabled={loading}
        className="w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : "Add Board"}
      </button>

    </div>
  );
};

export default AddBoard;