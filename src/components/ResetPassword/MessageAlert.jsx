const MessageAlert = ({ message }) => {
  if (!message) return null;

  const success = message.toLowerCase().includes("success");

  return (
    <div
      className={`px-4 py-3 rounded-xl text-sm mb-4 shadow-md transition-all ${
        success
          ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
          : "bg-gradient-to-r from-pink-100 to-red-100 text-red-700 border border-red-300"
      }`}
    >
      {message}
    </div>
  );
};

export default MessageAlert;