const MessageAlert = ({ message }) => {
  if (!message) return null;

  const isSuccess = message.includes("✅");

  return (
    <div
      className={`px-4 py-3 rounded-xl text-sm mb-4 flex items-center space-x-3 shadow-md transition-all ${
        isSuccess
          ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
          : "bg-gradient-to-r from-pink-100 to-red-100 text-red-700 border border-red-300"
      }`}
    >
      {/* Optional icon for extra flair */}
      <span
        className={`text-lg ${isSuccess ? "text-green-600" : "text-red-600"}`}
      >
        {isSuccess ? "✅" : "⚠️"}
      </span>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default MessageAlert;
