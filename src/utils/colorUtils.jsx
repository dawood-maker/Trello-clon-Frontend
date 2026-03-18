// =============================================
// Frontend/src/utils/colorUtils.js
// Hex color validate + auto-fix karo
// =============================================

/**
 * Check karo ke color valid 6-digit ya 3-digit hex hai ya nahi
 * Valid: #RRGGBB ya #RGB
 */
export const isValidHex = (color) => {
  if (!color) return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Incomplete ya invalid hex ko auto-fix karo
 *
 * Rules:
 *  - # nahi hai to # lagao
 *  - 3 digit → valid (#ABC → #ABC) 
 *  - 6 digit → valid (#AABBCC → #AABBCC) 
 *  - 1-2 digit → 6 digit banao (pad karo 0 se): #6 → #600000
 *  - 4-5 digit → 6 digit banao (pad karo 0 se): #60A5 → #60A500
 *  - 7+ digit → pehle 6 lo: #60A5FAFF → #60A5FA
 *  - Invalid characters → default color return karo
 *
 * @param {string} color - user ka input
 * @param {string} fallback - agar fix nahi ho saka to ye color use karo
 * @returns {string} - valid 6-digit hex color
 */
export const fixHexColor = (color, fallback = "#6B7280") => {
  if (!color) return fallback;

  // # hata ke sirf hex digits lo
  let hex = color.startsWith("#") ? color.slice(1) : color;

  // Sirf valid hex characters rakhein (A-F, a-f, 0-9)
  hex = hex.replace(/[^A-Fa-f0-9]/g, "");

  // Kuch nahi bacha to fallback
  if (hex.length === 0) return fallback;

  // 3 digit shorthand → valid
  if (hex.length === 3) return `#${hex}`;

  // 6 digit → valid
  if (hex.length === 6) return `#${hex}`;

  // 6 se zyada → pehle 6 lo
  if (hex.length > 6) return `#${hex.slice(0, 6)}`;

  // 6 se kam → right side mein 0 pad karo
  // 1 → 100000, 2 → 120000, 4 → 60A500, 5 → 60A5F0
  const padded = hex.padEnd(6, "0");
  return `#${padded}`;
};

/**
 * Color input ko sanitize karo real-time typing ke liye
 * Sirf valid characters allow karo, # prefix ensure karo
 *
 * @param {string} input - user ka real-time input
 * @returns {string} - sanitized input (max 7 chars including #)
 */
export const sanitizeHexInput = (input) => {
  if (!input) return "#";

  // # nahi hai to lagao
  let val = input.startsWith("#") ? input : `#${input}`;

  // # ke baad sirf hex chars allow karo
  const hexPart = val.slice(1).replace(/[^A-Fa-f0-9]/g, "");

  // Maximum 6 hex digits
  return `#${hexPart.slice(0, 6)}`;
};
