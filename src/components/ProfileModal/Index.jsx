// src/components/Dashboard/ProfileModal/index.jsx
import React, { useState } from "react";
import axios from "axios";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoFields from "./ProfileInfoFields";
import ProfileActions from "./ProfileActions";

const BACKEND_URL = "http://localhost:5002";

const FEMALE_NAMES = [
  "alisha"
];

const MALE_NAMES = [
  "ali"
];

const validateNameGender = (name, gender) => {
  const lowerName = name.trim().toLowerCase().split(" ")[0];
  if (gender === "male" && FEMALE_NAMES.includes(lowerName))
    return { valid: false, message: `"${name}" ek female name lagta hai! Male gender ke saath male name use karein, ya gender Female select karein.` };
  if (gender === "female" && MALE_NAMES.includes(lowerName))
    return { valid: false, message: `"${name}" ek male name lagta hai! Female gender ke saath female name use karein, ya gender Male select karein.` };
  return { valid: true };
};

const ProfileModal = ({ user, onClose, onUserUpdate }) => {
  const [isEditing, setIsEditing]   = useState(false);
  const [editName, setEditName]     = useState(user?.name || "");
  const [editGender, setEditGender] = useState(user?.gender || "male");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  const handleSave = async () => {
    if (!editName.trim()) { setError("Name khali nahi ho sakta!"); return; }
    const validation = validateNameGender(editName, editGender);
    if (!validation.valid) { setError(validation.message); return; }

    setLoading(true); setError(""); setSuccess("");
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/auth/profile`,
        { name: editName.trim(), gender: editGender },
        { withCredentials: true }
      );
      if (res.data.success) {
        setSuccess("Profile successfully update ho gaya! ✅");
        setIsEditing(false);
        if (onUserUpdate) onUserUpdate(res.data.user);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed. Dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditGender(user?.gender || "male");
    setError("");
  };

  const handleEdit  = () => { setIsEditing(true); setError(""); setSuccess(""); };
  const handleClose = () => onClose();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[110] backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.65)", padding: "10px 8px" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* ── Modal Box ── */}
      <div
        className="bg-white rounded-2xl w-full shadow-2xl overflow-hidden flex flex-col"
        style={{
          maxWidth: "440px",
          maxHeight: "calc(100vh - 20px)",
          animation: "fadeSlideUp 0.25s ease-out",
        }}
      >
        {/* ── Gradient Header ── */}
        <div
          className="relative flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #4F46E5 100%)",
            padding: "14px 14px 52px 14px",
          }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
               style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-0 w-14 h-14 rounded-full opacity-10"
               style={{ background: "white", transform: "translate(-30%,30%)" }} />

          <div className="relative flex justify-between items-start">
            <div>
              <h3
                className="font-black text-white tracking-tight"
                style={{ fontSize: "clamp(15px, 4.5vw, 20px)", lineHeight: 1.2 }}
              >
                User Profile
              </h3>
              <p className="text-blue-200 mt-0.5" style={{ fontSize: "11px" }}>
                {isEditing ? "Editing your profile..." : "View & manage your account"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-blue-200 hover:text-white hover:bg-white/20 rounded-lg transition-all flex-shrink-0"
              style={{ padding: "5px", marginLeft: "8px" }}
            >
              <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Avatar ── */}
        <div className="flex justify-center relative z-10" style={{ marginTop: "-38px" }}>
          <ProfileAvatar user={isEditing ? { ...user, gender: editGender } : user} />
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1" style={{ padding: "0 12px 12px 12px" }}>

          {success && (
            <div className="mb-2 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-semibold"
                 style={{ padding: "8px 10px", fontSize: "12px" }}>
              <svg className="flex-shrink-0" style={{ width:"16px", height:"16px" }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          {error && (
            <div className="mb-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold"
                 style={{ padding: "8px 10px", fontSize: "12px" }}>
              <svg className="flex-shrink-0" style={{ width:"16px", height:"16px" }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <ProfileInfoFields
            user={user}
            isEditing={isEditing}
            editName={editName}
            setEditName={setEditName}
            editGender={editGender}
            setEditGender={setEditGender}
          />

          <ProfileActions
            isEditing={isEditing}
            loading={loading}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ProfileModal;