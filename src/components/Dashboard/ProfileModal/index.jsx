// src/components/Dashboard/ProfileModal/index.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import ProfileInfoFields from "./ProfileInfoFields";
import ProfileActions from "./ProfileActions";

const BACKEND_URL = "http://localhost:5002";

const FEMALE_NAMES = ["alisha"];
const MALE_NAMES = ["ali"];

const validateNameGender = (name, gender) => {
  console.log("🔍 validateNameGender called:", { name, gender });
  const lowerName = name.trim().toLowerCase().split(" ")[0];
  if (gender === "male" && FEMALE_NAMES.includes(lowerName)) {
    console.warn("⚠️ Female name with male gender detected:", lowerName);
    return { valid: false, message: `"${name}" ek female name lagta hai! Male gender ke saath male name use karein.` };
  }
  if (gender === "female" && MALE_NAMES.includes(lowerName)) {
    console.warn("⚠️ Male name with female gender detected:", lowerName);
    return { valid: false, message: `"${name}" ek male name lagta hai! Female gender ke saath female name use karein.` };
  }
  console.log("✅ validateNameGender passed");
  return { valid: true };
};

const getGenderEmoji = (gender) => {
  if (gender === "female") return "👩";
  if (gender === "other") return "🧑";
  return "👨";
};

const ProfileModal = ({ user, onClose, onUserUpdate }) => {
  console.log("🧩 ProfileModal rendered | user:", user);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editGender, setEditGender] = useState(user?.gender || "male");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [previewPic, setPreviewPic] = useState(user?.profilePicture || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    console.log(" handleFileChange called | file:", file?.name, "| size:", file?.size, "| type:", file?.type);
    if (!file) { console.warn("⚠️ No file provided"); return; }
    if (!file.type.startsWith("image/")) {
      console.error(" Invalid file type:", file.type);
      setError("Sirf image files allowed hain (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      console.error(" File too large:", file.size, "bytes");
      setError("Image 5MB se chhoti honi chahiye");
      return;
    }
    console.log(" File valid, converting to base64...");
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(" base64 conversion complete | length:", reader.result?.length);
      setPreviewPic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onInputChange = (e) => { console.log("📂 onInputChange triggered"); handleFileChange(e.target.files[0]); };
  const onDragOver  = (e) => { e.preventDefault(); console.log("🖱️ onDragOver"); setIsDragging(true); };
  const onDragLeave = ()  => { console.log("🖱️ onDragLeave"); setIsDragging(false); };
  const onDrop      = (e) => {
    e.preventDefault(); console.log("📦 onDrop triggered");
    setIsDragging(false); handleFileChange(e.dataTransfer.files[0]);
  };
  const removePhoto = () => {
    console.log("🗑️ removePhoto called");
    setPreviewPic(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    console.log("💾 handleSave called | editName:", editName, "| editGender:", editGender, "| hasPhoto:", !!previewPic);
    if (!editName.trim()) { console.warn("⚠️ Name is empty"); setError("Name khali nahi ho sakta!"); return; }
    const validation = validateNameGender(editName, editGender);
    if (!validation.valid) { console.warn("⚠️ Validation failed:", validation.message); setError(validation.message); return; }

    setLoading(true); setError(""); setSuccess("");
    console.log("📡 Sending PUT request to:", `${BACKEND_URL}/api/auth/profile`);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/auth/profile`,
        { name: editName.trim(), gender: editGender, profilePicture: previewPic },
        { withCredentials: true },
      );
      console.log(" PUT response:", res.data);

      if (res.data.success) {
        //  localStorage update — refresh par bhi photo rahegi
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = { ...existingUser, ...res.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log(" localStorage updated | hasPhoto:", !!updatedUser.profilePicture);

        setSuccess("Profile successfully update ho gaya! ");
        setIsEditing(false);
        console.log(" Profile updated | updatedUser:", updatedUser);
        if (onUserUpdate) onUserUpdate(updatedUser);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error(" handleSave error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Update failed. Dobara koshish karein.");
    } finally {
      setLoading(false);
      console.log("🏁 handleSave finished");
    }
  };

  const handleCancel = () => {
    console.log(" handleCancel called");
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditGender(user?.gender || "male");
    setPreviewPic(user?.profilePicture || null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit  = () => { console.log("✏️ handleEdit called"); setIsEditing(true); setError(""); setSuccess(""); };
  const handleClose = () => { console.log("❌ handleClose called"); onClose(); };

  const currentPic    = isEditing ? previewPic : (user?.profilePicture || null);
  const currentGender = isEditing ? editGender : (user?.gender || "male");
  console.log("🖼️ currentPic:", currentPic ? "base64 image present" : "null", "| currentGender:", currentGender);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[110] backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.65)", padding: "10px 8px" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="bg-white rounded-2xl w-full shadow-2xl overflow-hidden flex flex-col"
        style={{ maxWidth: "440px", maxHeight: "calc(100vh - 20px)", animation: "fadeSlideUp 0.25s ease-out" }}
      >
        {/* ── Header ── */}
        <div
          className="relative flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #4F46E5 100%)", padding: "14px 14px 52px 14px" }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-0 w-14 h-14 rounded-full opacity-10" style={{ background: "white", transform: "translate(-30%,30%)" }} />
          <div className="relative flex justify-between items-start">
            <div>
              <h3 className="font-black text-white tracking-tight" style={{ fontSize: "clamp(15px, 4.5vw, 20px)", lineHeight: 1.2 }}>
                User Profile
              </h3>
              <p className="text-blue-200 mt-0.5" style={{ fontSize: "11px" }}>
                {isEditing ? "Editing your profile..." : "View & manage your account"}
              </p>
            </div>
            <button onClick={handleClose} className="text-blue-200 hover:text-white hover:bg-white/20 rounded-lg transition-all flex-shrink-0" style={{ padding: "5px", marginLeft: "8px" }}>
              <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Avatar Section ── */}
        <div className="flex flex-col items-center relative z-10" style={{ marginTop: "-38px", marginBottom: "8px" }}>
          <div
            className="relative" style={{ marginBottom: "8px" }}
            onDragOver={isEditing ? onDragOver : undefined}
            onDragLeave={isEditing ? onDragLeave : undefined}
            onDrop={isEditing ? onDrop : undefined}
          >
            {/* Avatar circle */}
            <div
              className="rounded-full flex items-center justify-center overflow-hidden"
              style={{
                width: "84px", height: "84px",
                border: isDragging ? "3px dashed #6366F1" : "3px solid white",
                background: currentPic ? "transparent" : "linear-gradient(135deg,#3B82F6,#6366F1)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
                transition: "all 0.2s",
              }}
            >
              {currentPic ? (
                <img src={currentPic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "40px" }}>{getGenderEmoji(currentGender)}</span>
              )}
            </div>

            {/* Edit mode overlays */}
            {isEditing && (
              <>
                <button
                  onClick={() => { console.log("📷 Camera overlay clicked"); fileInputRef.current?.click(); }}
                  className="absolute inset-0 rounded-full flex flex-col items-center justify-center transition-all"
                  style={{ background: "rgba(0,0,0,0.50)", opacity: isDragging ? 1 : 0, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = isDragging ? "1" : "0")}
                >
                  <svg style={{ width: "20px", height: "20px", color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: "white", fontSize: "9px", fontWeight: "700", marginTop: "2px" }}>
                    {isDragging ? "Drop!" : "Change"}
                  </span>
                </button>

                {currentPic && (
                  <button
                    onClick={removePhoto}
                    className="absolute flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition-all"
                    style={{ width: "20px", height: "20px", bottom: "0px", right: "0px", border: "2px solid white" }}
                    title="Photo hatao"
                  >
                    <svg style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Hidden file input */}
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onInputChange} />

          {isEditing ? (
            <div className="flex flex-col items-center" style={{ gap: "4px" }}>
              <button
                onClick={() => { console.log("📷 Upload button clicked"); fileInputRef.current?.click(); }}
                className="flex items-center font-semibold rounded-full border-2 border-blue-400 text-blue-600 hover:bg-blue-50 transition-all"
                style={{ gap: "4px", padding: "4px 12px", fontSize: "11px" }}
              >
                <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                📷 photo update
              </button>
         
            </div>
          ) : (
            <div
              className="flex items-center rounded-full font-semibold text-blue-600 bg-blue-50 border border-blue-200"
              style={{ gap: "4px", padding: "2px 10px", fontSize: "11px" }}
            >
              <span>{getGenderEmoji(user?.gender)}</span>
              <span style={{ textTransform: "capitalize" }}>{user?.gender || "male"}</span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="overflow-y-auto flex-1" style={{ padding: "0 12px 12px 12px" }}>
          {success && (
            <div className="mb-2 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-semibold" style={{ padding: "8px 10px", fontSize: "12px" }}>
              <svg className="flex-shrink-0" style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}
          {error && (
            <div className="mb-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold" style={{ padding: "8px 10px", fontSize: "12px" }}>
              <svg className="flex-shrink-0" style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <ProfileInfoFields
            user={user} isEditing={isEditing}
            editName={editName} setEditName={setEditName}
            editGender={editGender} setEditGender={setEditGender}
          />
          <ProfileActions
            isEditing={isEditing} loading={loading}
            onEdit={handleEdit} onCancel={handleCancel} onSave={handleSave}
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