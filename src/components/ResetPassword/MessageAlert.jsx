const MessageAlert = ({ message }) => {
  if (!message) return null;

  const success = message.toLowerCase().includes("success");

  return (
    <div
      className={`px-4 py-3 rounded-md text-sm mb-4 ${
        success
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-red-50 text-red-600 border border-red-200"
      }`}
    >
      {message}
    </div>
  );
};

export default MessageAlert;
