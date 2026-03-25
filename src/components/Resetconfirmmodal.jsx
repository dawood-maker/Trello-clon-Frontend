import React from "react";
import ReactDOM from "react-dom";

const ResetConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white w-[400px] rounded-2xl p-7 shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Reset Everything?
        </h2>

        {/* Warning Box */}
        <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          ⚠️ All boards and columns will be permanently deleted.
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-7">
          <button
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-sm"
            onClick={onConfirm}
          >
            Reset Everything
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResetConfirmModal;