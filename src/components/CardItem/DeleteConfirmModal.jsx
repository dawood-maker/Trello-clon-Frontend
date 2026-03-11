import React from "react";
import ReactDOM from "react-dom";

const DeleteConfirmModal = ({ text, onCancel, onConfirm }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-100 mx-4">

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <span className="text-2xl">🗑️</span>
        </div>

        <h3 className="text-xl font-bold text-center text-gray-800 mb-1">
          Delete Card?
        </h3>
        <p className="text-sm text-center text-gray-500 mb-4">
          Yeh action wapas nahi hoga
        </p>

        {/* Card preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-5 text-sm text-gray-700 italic text-center">
          "{text}"
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmModal;