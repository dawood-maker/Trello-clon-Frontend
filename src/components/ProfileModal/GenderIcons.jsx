// src/components/Dashboard/ProfileModal/GenderIcons.js

export const MaleIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle cx="32" cy="32" r="32" fill="#4A90D9" />
    <ellipse cx="32" cy="52" rx="14" ry="10" fill="#5BA3E8" />
    <circle cx="32" cy="24" r="12" fill="#FDDBB4" />
    <ellipse cx="32" cy="14" rx="12" ry="6" fill="#4A3728" />
    <path
      d="M22 42 Q32 46 42 42"
      stroke="#3A7BD5"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const FemaleIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle cx="32" cy="32" r="32" fill="#E91E8C" />
    <ellipse cx="32" cy="54" rx="16" ry="11" fill="#F06292" />
    <circle cx="32" cy="24" r="12" fill="#FDDBB4" />
    <ellipse cx="32" cy="13" rx="13" ry="7" fill="#3E2723" />
    <rect x="19" y="18" width="5" height="14" rx="2" fill="#3E2723" />
    <rect x="40" y="18" width="5" height="14" rx="2" fill="#3E2723" />
  </svg>
);

export const OtherIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle cx="32" cy="32" r="32" fill="#7B1FA2" />
    <circle cx="32" cy="24" r="12" fill="#FDDBB4" />
    <ellipse cx="32" cy="52" rx="14" ry="10" fill="#9C27B0" />
    <ellipse cx="32" cy="14" rx="12" ry="6" fill="#4A3728" />
  </svg>
);
