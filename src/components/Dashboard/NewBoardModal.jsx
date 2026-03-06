import React from "react";
import { COLOR_PALETTE } from "./constants";

const NewBoardModal = ({
  newBoardName,
  setNewBoardName,
  newBoardColor,
  setNewBoardColor,
  onClose,
  onCreate,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md h-[75vh] overflow-y-auto shadow-2xl">

        {/* ---------------- Header ---------------- */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-gray-900">Create New Board</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ---------------- Board Name ---------------- */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Board Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="e.g., Marketing Campaign, Sprint Planning"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
            autoFocus
            maxLength={50}
            onKeyPress={(e) => {
              if (e.key === "Enter" && newBoardName.trim()) onCreate();
            }}
          />
          <p className="mt-1 text-xs text-gray-500">
            {newBoardName.length}/50 characters
          </p>
        </div>

        {/* ---------------- Board Color ---------------- */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Board Color</label>

          {/* Selected Color Display */}
          <div className="flex items-center space-x-3 mb-3">
            <div
              className="w-14 h-14 rounded-xl shadow-md border-2 border-gray-200 flex-shrink-0"
              style={{ backgroundColor: newBoardColor }}
            />
            <div>
              <p className="text-xs text-gray-500">Selected Color</p>
              <p className="text-sm font-mono font-semibold text-gray-900">{newBoardColor}</p>
            </div>
          </div>

          {/* Predefined Color Palette */}
          <div className="grid grid-cols-6 gap-2 mb-3">
            {COLOR_PALETTE.map((color) => (
              <button
                key={color.value}
                onClick={() => setNewBoardColor(color.value)}
                className={`w-full aspect-square rounded-lg transition-all duration-200 ${
                  newBoardColor === color.value
                    ? "ring-4 ring-offset-2 ring-blue-500 scale-110"
                    : "hover:scale-110 hover:shadow-lg"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>

          {/* Custom Hex Color Input */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Or enter custom hex color:
            </label>
            <input
              type="text"
              value={newBoardColor}
              onChange={(e) => {
                const value = e.target.value;
                if (value.startsWith("#") && value.length <= 7) setNewBoardColor(value);
              }}
              placeholder="#60A5FA"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
              maxLength={7}
            />
            <p className="mt-1 text-xs text-gray-500">
              Format: #RRGGBB (e.g., #60A5FA for blue)
            </p>
          </div>
        </div>

        {/* ---------------- Action Buttons ---------------- */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-[#595959] text-gray-700 rounded-lg hover:bg-[#7f7f7f] transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={!newBoardName.trim()}
            className="flex-1 px-4 py-3 bg-[#2a0800] text-white rounded-lg hover:bg-[#775144] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Board
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewBoardModal;