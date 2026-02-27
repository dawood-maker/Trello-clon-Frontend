import { useState, useEffect } from "react";

const PasswordInput = ({
  label,
  value,
  onChange,
  minLength = 6,
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");

  useEffect(() => {
    if (!showStrength) return;

    if (value.length === 0) setStrength("");
    else if (value.length < 6) setStrength("weak");
    else if (value.length < 8) setStrength("fair");
    else setStrength("strong");
  }, [value, showStrength]);

  const strengthColor = {
    weak: "bg-red-500",
    fair: "bg-yellow-500",
    strong: "bg-green-500",
  };

  const strengthTextColor = {
    weak: "text-red-600",
    fair: "text-yellow-600",
    strong: "text-green-600",
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          minLength={minLength}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {showPassword ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            )}
          </svg>
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-2 flex items-center space-x-2 text-xs">
          <span className="text-gray-500">Strength:</span>
          <div className="flex space-x-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-1 w-8 rounded-full ${
                  strength === "weak" && level === 1
                    ? strengthColor["weak"]
                    : strength === "fair" && level <= 2
                      ? strengthColor["fair"]
                      : strength === "strong" && level <= 3
                        ? strengthColor["strong"]
                        : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <span
            className={`font-medium ${strengthTextColor[strength] || "text-gray-500"}`}
          >
            {strength.charAt(0).toUpperCase() + strength.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
