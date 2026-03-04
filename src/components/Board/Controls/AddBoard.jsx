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
    <div>
      <input
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        disabled={loading}
      />
      {errorMsg && <p style={{ color: "red", fontSize: "12px" }}>{errorMsg}</p>}
      <button onClick={handleAddBoard} disabled={loading}>
        {loading ? "Creating..." : "Add Board"}
      </button>
    </div>
  );
};

export default AddBoard;