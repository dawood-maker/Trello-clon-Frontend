import React from "react";

/* ---------- Icons ---------- */
const ShareIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.235-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.031 3c-4.938 0-8.96 4.022-8.96 8.96 0 1.551.411 3.016 1.144 4.316l-1.18 4.307 4.41-1.166c1.233.684 2.622 1.043 4.58 1.043 4.938 0 8.96-4.022 8.96-8.96s-4.022-8.96-8.96-8.96zm4.78 12.493c-.114.31-.228.444-.456.444-.228 0-.456-.076-.684-.228-.228-.152-.647-.228-1.026-.228s-.798.152-1.026.456c-.228.304-.456.444-.836.444-.38 0-.684-.152-1.026-.456s-.456-.76-.456-1.14-.076-.684.152-1.026.684-.798 1.026-1.14c.342-.342.342-.647.342-.989s-.456-.836-.608-.989-.342-.228-.57-.228-.304 0-.456.152-.57.684-.836.878-.456.228-.798.228-.684-.152-.912-.38c-.228-.228-.798-.798-.798-1.558 0-.76.38-1.14.456-1.292.076-.152.152-.304.228-.456s.228-.304.342-.38c.114-.076.228-.152.342-.152.038 0 .076 0 .152 0 .076 0 .152 0 .228 0s.152.076.228.152.19.342.342.76c.152.38.228.76.228.798s.076.38 0 .532c-.076.152-.342.456-.456.608-.114.152-.228.228-.38.38-.152.152-.152.228-.076.38s.494.684.722.912.456.342.647.418c.19.076.38.152.57.152.19 0 .418 0 .57-.076.152-.076.38-.228.532-.38.152-.152.304-.304.532-.304.228 0 .456.152.684.342s.342.494.418.722c.076.19.152.418.152.647 0 .19 0 .304-.076.532z" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.829.091-.64.351-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.949 0-1.092.39-1.983 1.029-2.682-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.022A9.632 9.632 0 0112 5.093c.85.004 1.705.115 2.504.337 1.909-1.29 2.748-1.022 2.748-1.022.546 1.379.202 2.398.1 2.65.64.699 1.028 1.59 1.028 2.682 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.577.688.484C20.137 20.198 23 16.443 23 12.017 23 6.484 18.522 2 13 2z"
      clipRule="evenodd"
    />
  </svg>
);

const CopyIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v10a2 2 0 01-2 2h-2"
    />
  </svg>
);

/* ---------- ShareMenu Component ---------- */
const ShareMenu = ({
  showShareMenu,
  setShowShareMenu,
  onShare,
  currentBoard,
}) => {
  return (
    <div className="relative share-menu-container">
      {/* ---------------- Toggle Button ---------------- */}
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!currentBoard}
      >
        <ShareIcon className="w-5 h-5" />
      </button>

      {/* ---------------- Dropdown Menu ---------------- */}
      {showShareMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 overflow-hidden z-[100]">
          {/* Header */}
          <p className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
            Share Board Link
          </p>

          {/* Share Options */}
          <div className="grid grid-cols-4 gap-1 p-2">
            {/* Copy URL */}
            <button
              onClick={() => onShare("copy")}
              className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
              title="Copy Board URL"
            >
              <CopyIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition" />
              <span className="text-xs mt-1">Copy URL</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => onShare("linkedin")}
              className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
              title="Share on LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6 text-[#0A66C2] transition" />
              <span className="text-xs mt-1">LinkedIn</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => onShare("whatsapp")}
              className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
              title="Share on WhatsApp"
            >
              <WhatsAppIcon className="w-6 h-6 text-[#25D366] transition" />
              <span className="text-xs mt-1">WhatsApp</span>
            </button>

            {/* GitHub */}
            <button
              onClick={() => onShare("github")}
              className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
              title="GitHub (URL Copy)"
            >
              <GitHubIcon className="w-6 h-6 text-[#181717] transition" />
              <span className="text-xs mt-1">GitHub</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
