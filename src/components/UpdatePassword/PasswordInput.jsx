import { useState } from "react";

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  minLength = 6,
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!showStrength) return { text: "", color: "" };
    if (password.length === 0) return { text: "", color: "" };
    if (password.length < 6)
      return { text: "Too Short", color: "text-red-600" };
    if (password.length < 8) return { text: "Weak", color: "text-orange-600" };
    if (password.length < 12) return { text: "Good", color: "text-yellow-600" };
    return { text: "Strong", color: "text-green-600" };
  };

  const strength = getPasswordStrength(value);

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          minLength={minLength}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
      {strength.text && (
        <p className={`mt-1 text-xs font-medium ${strength.color}`}>
          Strength: {strength.text}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
