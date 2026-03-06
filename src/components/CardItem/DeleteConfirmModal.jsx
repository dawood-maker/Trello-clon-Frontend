import React from "react";
import ReactDOM from "react-dom";

const DeleteConfirmModal = ({ text, onCancel, onConfirm }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-100 transform transition-all duration-300 scale-100 hover:scale-[1.01]">

        <h3 className="text-xl font-bold mb-2 text-gray-800">
          Delete Card?
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          This action cannot be undone
        </p>

        <div className="bg-gray-50 p-3 rounded-lg mb-5 text-sm text-gray-700 border border-gray-200 italic">
          "{text}"
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition duration-200"
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