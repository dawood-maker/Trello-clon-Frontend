import React from "react";

const DeleteConfirmModal = ({ text, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-2">Delete Card?</h3>
        <p className="text-sm text-gray-500 mb-4">
          This action cannot be undone
        </p>

        <div className="bg-gray-100 p-2 rounded mb-4 text-sm">"{text}"</div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
