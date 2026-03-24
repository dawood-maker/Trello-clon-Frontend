// src/components/Dashboard/ProfileModal/ProfileModal.jsx
import React, { useState, useRef } from "react";
import ProfileInfoFields from "./ProfileInfoFields";
import ProfileActions from "./ProfileActions";
import { useAuth } from "../../../context/AuthContext";

const ProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useAuth();
  console.log("🧩 ProfileModal (AuthContext version) rendered | user:", user);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editGender, setEditGender] = useState(user?.gender || "male");
  const [previewPic, setPreviewPic] = useState(user?.profilePicture || null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // ─── Gender se default avatar emoji ───
  const getGenderEmoji = (gender) => {
    if (gender === "female") return "👩";
    if (gender === "other") return "🧑";
    return "👨";
  };

  // ─── File select (click ya drag-drop) ───
  const handleFileChange = (file) => {
    console.log(
      "📁 handleFileChange called | file:",
      file?.name,
      "| size:",
      file?.size,
      "| type:",
      file?.type,
    );
    if (!file) {
      console.warn("⚠️ No file provided");
      return;
    }
    if (!file.type.startsWith("image/")) {
      console.error("❌ Invalid file type:", file.type);
      setErrorMsg("Sirf image files allowed hain (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      console.error("❌ File too large:", file.size, "bytes");
      setErrorMsg("Image 5MB se chhoti honi chahiye");
      return;
    }
    console.log(". File valid, converting to base64...");
    setErrorMsg("");
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(
        ". base64 conversion complete | length:",
        reader.result?.length,
      );
      setPreviewPic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onInputChange = (e) => {
    console.log("📂 onInputChange triggered");
    handleFileChange(e.target.files[0]);
  };

  // ─── Drag & Drop handlers ───
  const onDragOver = (e) => {
    e.preventDefault();
    console.log("🖱️ onDragOver");
    setIsDragging(true);
  };
  const onDragLeave = () => {
    console.log("🖱️ onDragLeave");
    setIsDragging(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    console.log("📦 onDrop triggered");
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files[0]);
  };

  // ─── Remove photo ───
  const removePhoto = () => {
    console.log("🗑️ removePhoto called");
    setPreviewPic(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Save changes ───
  const handleSave = async () => {
    console.log(
      "💾 handleSave called | editName:",
      editName,
      "| editGender:",
      editGender,
      "| hasPhoto:",
      !!previewPic,
    );
    if (!editName.trim()) {
      console.warn("⚠️ Name is empty");
      setErrorMsg("Naam khali nahi ho sakta");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    console.log("📡 Calling updateProfile from AuthContext...");
    try {
      const result = await updateProfile({
        name: editName.trim(),
        gender: editGender,
        profilePicture: previewPic,
      });
      console.log(". updateProfile result:", result);

      if (result?.success) {
        setSuccessMsg("Profile update ho gaya! .");
        setIsEditing(false);
        console.log(". Profile saved successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        console.warn("⚠️ updateProfile returned failure:", result?.message);
        setErrorMsg(result?.message || "Update fail ho gaya, dobara try karo");
      }
    } catch (err) {
      console.error("❌ handleSave error:", err.message);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
      console.log("🏁 handleSave finished");
    }
  };

  // ─── Cancel editing ───
  const handleCancel = () => {
    console.log("❎ handleCancel called");
    setEditName(user?.name || "");
    setEditGender(user?.gender || "male");
    setPreviewPic(user?.profilePicture || null);
    setErrorMsg("");
    setIsEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Current picture to show ───
  const currentPic = isEditing ? previewPic : user?.profilePicture || null;
  console.log(
    "🖼️ currentPic:",
    currentPic ? "base64 image present" : "null",
    "| isEditing:",
    isEditing,
  );

  return (
    /* ════════ BACKDROP ════════ */
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          console.log("🖱️ Backdrop clicked, closing modal");
          onClose();
        }
      }}
    >
      {/* ════════ MODAL CARD ════════ */}
      <div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          width: "min(460px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* ── Header gradient ── */}
        <div
          className="relative flex items-center justify-between px-5 py-4"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
          }}
        >
          <div>
            <h2 className="text-white font-bold" style={{ fontSize: "18px" }}>
              User Profile
            </h2>
            <p className="text-blue-100" style={{ fontSize: "12px" }}>
              View &amp; manage your account
            </p>
          </div>

          {/* Decorative circles */}
          <div
            className="absolute opacity-20 rounded-full"
            style={{
              width: "80px",
              height: "80px",
              background: "white",
              top: "-20px",
              right: "60px",
            }}
          />
          <div
            className="absolute opacity-10 rounded-full"
            style={{
              width: "50px",
              height: "50px",
              background: "white",
              bottom: "-15px",
              right: "20px",
            }}
          />

          {/* Close button */}
          <button
            onClick={() => {
              console.log("❌ Close button clicked");
              onClose();
            }}
            className="relative z-10 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
          >
            <svg
              style={{ width: "20px", height: "20px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "20px" }}>
          {/* ════════ AVATAR SECTION ════════ */}
          <div
            className="flex flex-col items-center"
            style={{ marginBottom: "18px" }}
          >
            {/* ── Photo circle ── */}
            <div
              className="relative"
              style={{ marginBottom: "10px" }}
              onDragOver={isEditing ? onDragOver : undefined}
              onDragLeave={isEditing ? onDragLeave : undefined}
              onDrop={isEditing ? onDrop : undefined}
            >
              {/* Avatar ring */}
              <div
                className="rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  width: "90px",
                  height: "90px",
                  border: isDragging
                    ? "3px dashed #6366F1"
                    : "3px solid #6366F1",
                  background: currentPic
                    ? "transparent"
                    : "linear-gradient(135deg,#3B82F6,#6366F1)",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                }}
              >
                {currentPic ? (
                  <img
                    src={currentPic}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "42px" }}>
                    {getGenderEmoji(isEditing ? editGender : user?.gender)}
                  </span>
                )}
              </div>

              {/* Edit mode: camera icon overlay + remove button */}
              {isEditing && (
                <>
                  {/* Camera overlay */}
                  <button
                    onClick={() => {
                      console.log("📷 Camera overlay clicked");
                      fileInputRef.current?.click();
                    }}
                    className="absolute inset-0 rounded-full flex flex-col items-center justify-center transition-all"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      opacity: isDragging ? 1 : 0,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = isDragging ? "1" : "0")
                    }
                  >
                    <svg
                      style={{ width: "22px", height: "22px", color: "white" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span
                      style={{
                        color: "white",
                        fontSize: "9px",
                        fontWeight: "700",
                        marginTop: "2px",
                      }}
                    >
                      {isDragging ? "Drop Here" : "Change"}
                    </span>
                  </button>

                  {/* Remove photo — only shown if picture exists */}
                  {currentPic && (
                    <button
                      onClick={removePhoto}
                      className="absolute flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition-all"
                      style={{
                        width: "22px",
                        height: "22px",
                        bottom: "-2px",
                        right: "-2px",
                        border: "2px solid white",
                      }}
                      title="Remove photo"
                    >
                      <svg
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onInputChange}
            />

            {/* Upload button — only in edit mode */}
            {isEditing && (
              <div
                className="flex flex-col items-center"
                style={{ gap: "6px" }}
              >
                <button
                  onClick={() => {
                    console.log("📷 Upload button clicked");
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center font-semibold rounded-full border-2 border-blue-400 text-blue-600 hover:bg-blue-50 transition-all"
                  style={{ gap: "5px", padding: "5px 14px", fontSize: "12px" }}
                >
                  <svg
                    style={{ width: "13px", height: "13px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Photo Upload Karo
                </button>
                <p className="text-gray-400" style={{ fontSize: "10px" }}>
                  JPG, PNG, WEBP • Max 5MB • Drag &amp; Drop bhi kar sakte ho
                </p>
              </div>
            )}

            {/* Gender badge — only in view mode */}
            {!isEditing && (
              <div
                className="flex items-center rounded-full font-semibold text-blue-600 bg-blue-50 border border-blue-200"
                style={{ gap: "4px", padding: "3px 12px", fontSize: "12px" }}
              >
                <span>{getGenderEmoji(user?.gender)}</span>
                <span style={{ textTransform: "capitalize" }}>
                  {user?.gender || "Male"}
                </span>
              </div>
            )}
          </div>

          {/* ════════ SUCCESS / ERROR MESSAGES ════════ */}
          {successMsg && (
            <div
              className="flex items-center rounded-xl font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
              style={{
                gap: "8px",
                padding: "10px 14px",
                marginBottom: "12px",
                fontSize: "13px",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px", flexShrink: 0 }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div
              className="flex items-center rounded-xl font-semibold text-red-700 bg-red-50 border border-red-200"
              style={{
                gap: "8px",
                padding: "10px 14px",
                marginBottom: "12px",
                fontSize: "13px",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px", flexShrink: 0 }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMsg}
            </div>
          )}

          {/* ════════ INFO FIELDS ════════ */}
          <ProfileInfoFields
            user={user}
            isEditing={isEditing}
            editName={editName}
            setEditName={setEditName}
            editGender={editGender}
            setEditGender={setEditGender}
          />

          {/* ════════ ACTION BUTTONS ════════ */}
          <ProfileActions
            isEditing={isEditing}
            loading={loading}
            onEdit={() => {
              console.log("✏️ Edit button clicked");
              setIsEditing(true);
              setSuccessMsg("");
              setErrorMsg("");
            }}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
