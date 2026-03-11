// src/components/Dashboard/ProfileModal/GenderIcons.js

export const MaleIcon = () => {
  console.log("🎨 [GenderIcons] Rendering MaleIcon");
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="maleBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </radialGradient>
        <radialGradient id="maleSkin" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDDBB4" />
          <stop offset="100%" stopColor="#F0C070" />
        </radialGradient>
        <radialGradient id="maleShirt" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#maleBg)" />
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="60" cy="98" rx="30" ry="22" fill="url(#maleShirt)" />
      <path
        d="M48 82 L60 92 L72 82"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="54" y="68" width="12" height="16" rx="6" fill="url(#maleSkin)" />
      <circle cx="60" cy="52" r="22" fill="url(#maleSkin)" />
      <path
        d="M38 48 Q38 28 60 26 Q82 28 82 48 Q80 38 60 36 Q40 38 38 48Z"
        fill="#3B2314"
      />
      <ellipse cx="38" cy="52" rx="4" ry="5" fill="#F0C070" />
      <ellipse cx="82" cy="52" rx="4" ry="5" fill="#F0C070" />
      <ellipse cx="52" cy="50" rx="4" ry="4.5" fill="white" />
      <ellipse cx="68" cy="50" rx="4" ry="4.5" fill="white" />
      <circle cx="53" cy="51" r="2.5" fill="#1E3A5F" />
      <circle cx="69" cy="51" r="2.5" fill="#1E3A5F" />
      <circle cx="54" cy="50" r="1" fill="white" />
      <circle cx="70" cy="50" r="1" fill="white" />
      <path
        d="M48 44 Q52 42 56 44"
        stroke="#3B2314"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M64 44 Q68 42 72 44"
        stroke="#3B2314"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 53 Q57 58 58 61 Q60 62 62 61 Q63 58 60 53Z"
        fill="#E8A855"
        fillOpacity="0.6"
      />
      <path
        d="M53 65 Q60 70 67 65"
        stroke="#C07850"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export const FemaleIcon = () => {
  console.log("🎨 [GenderIcons] Rendering FemaleIcon");
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="femaleBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#BE185D" />
        </radialGradient>
        <radialGradient id="femaleSkin" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDDBB4" />
          <stop offset="100%" stopColor="#F0C070" />
        </radialGradient>
        <radialGradient id="femaleTop" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#EC4899" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#femaleBg)" />
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="60" cy="100" rx="32" ry="22" fill="url(#femaleTop)" />
      <rect
        x="54"
        y="68"
        width="12"
        height="16"
        rx="6"
        fill="url(#femaleSkin)"
      />
      <circle cx="60" cy="50" r="22" fill="url(#femaleSkin)" />
      <path d="M36 46 Q34 70 36 88 Q44 95 52 92 L52 68" fill="#2D1810" />
      <path d="M84 46 Q86 70 84 88 Q76 95 68 92 L68 68" fill="#2D1810" />
      <path
        d="M38 44 Q38 24 60 22 Q82 24 82 44 Q80 32 60 30 Q40 32 38 44Z"
        fill="#2D1810"
      />
      <path
        d="M36 46 Q33 52 36 58 Q33 64 36 70"
        stroke="#3B1F12"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M84 46 Q87 52 84 58 Q87 64 84 70"
        stroke="#3B1F12"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="38" cy="50" rx="4" ry="5" fill="#F0C070" />
      <ellipse cx="82" cy="50" rx="4" ry="5" fill="#F0C070" />
      <ellipse cx="52" cy="48" rx="4.5" ry="4" fill="white" />
      <ellipse cx="68" cy="48" rx="4.5" ry="4" fill="white" />
      <circle cx="53" cy="49" r="2.5" fill="#1E3A5F" />
      <circle cx="69" cy="49" r="2.5" fill="#1E3A5F" />
      <circle cx="54" cy="48" r="1" fill="white" />
      <circle cx="70" cy="48" r="1" fill="white" />
      <path
        d="M47 45 L46 42 M49 44 L48 41 M51 44 L51 41"
        stroke="#1A0A0A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M63 45 L62 42 M65 44 L65 41 M67 44 L68 41"
        stroke="#1A0A0A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M47 42 Q52 39 57 41"
        stroke="#2D1810"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M63 41 Q68 39 73 42"
        stroke="#2D1810"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 51 Q57 56 58 59 Q60 60 62 59 Q63 56 60 51Z"
        fill="#E8A855"
        fillOpacity="0.5"
      />
      <path
        d="M54 63 Q57 61 60 63 Q63 61 66 63"
        stroke="#E07090"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M54 63 Q60 68 66 63"
        stroke="#E07090"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M54 63 Q60 65.5 66 63" fill="#F48FB1" fillOpacity="0.5" />
      <circle cx="38" cy="56" r="2.5" fill="#FCD34D" />
      <circle cx="82" cy="56" r="2.5" fill="#FCD34D" />
    </svg>
  );
};

export const OtherIcon = () => {
  console.log("🎨 [GenderIcons] Rendering OtherIcon");
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="otherBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#5B21B6" />
        </radialGradient>
        <radialGradient id="otherSkin" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDDBB4" />
          <stop offset="100%" stopColor="#F0C070" />
        </radialGradient>
        <linearGradient id="otherShirt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#otherBg)" />
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M30 85 Q60 55 90 85"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="60" cy="100" rx="30" ry="22" fill="url(#otherShirt)" />
      <rect
        x="54"
        y="68"
        width="12"
        height="16"
        rx="6"
        fill="url(#otherSkin)"
      />
      <circle cx="60" cy="50" r="22" fill="url(#otherSkin)" />
      <path d="M38 44 Q38 24 60 22 Q82 24 82 44" fill="#4C1D95" />
      <path
        d="M38 44 Q41 36 46 40 Q50 32 55 37 Q58 28 60 30 Q62 28 65 37 Q70 32 74 40 Q79 36 82 44"
        fill="#6D28D9"
      />
      <ellipse cx="38" cy="50" rx="4" ry="5" fill="#F0C070" />
      <ellipse cx="82" cy="50" rx="4" ry="5" fill="#F0C070" />
      <ellipse cx="52" cy="48" rx="4.5" ry="4" fill="white" />
      <ellipse cx="68" cy="48" rx="4.5" ry="4" fill="white" />
      <circle cx="53" cy="49" r="2.5" fill="#4C1D95" />
      <circle cx="69" cy="49" r="2.5" fill="#4C1D95" />
      <circle cx="54" cy="48" r="1" fill="white" />
      <circle cx="70" cy="48" r="1" fill="white" />
      <path
        d="M47 43 Q52 40 57 42"
        stroke="#4C1D95"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M63 42 Q68 40 73 43"
        stroke="#4C1D95"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 52 Q57 57 58 60 Q60 61 62 60 Q63 57 60 52Z"
        fill="#E8A855"
        fillOpacity="0.5"
      />
      <path
        d="M53 64 Q60 70 67 64"
        stroke="#9333EA"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M25 30 L26 27 L27 30 L30 31 L27 32 L26 35 L25 32 L22 31Z"
        fill="rgba(255,255,255,0.6)"
      />
      <path
        d="M90 25 L91 23 L92 25 L94 26 L92 27 L91 29 L90 27 L88 26Z"
        fill="rgba(255,255,255,0.6)"
      />
    </svg>
  );
};
