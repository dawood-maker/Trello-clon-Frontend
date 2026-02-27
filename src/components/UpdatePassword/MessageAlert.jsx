const MessageAlert = ({ message }) => {
  if (!message) return null;

  const isSuccess = message.includes("✅");

  return (
    <div
      className={`px-4 py-3 rounded-lg text-sm mb-4 flex items-center space-x-2 ${
        isSuccess
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-600 border border-red-200"
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default MessageAlert;
