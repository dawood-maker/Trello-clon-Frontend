// src/components/Dashboard/ProfileModal/index.jsx
import React, { useState } from "react";
import axios from "axios";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoFields from "./ProfileInfoFields";
import ProfileActions from "./ProfileActions";

const BACKEND_URL = "http://localhost:5002";

// ─── Common Female Names List ───────────────────────────────────────────────
const FEMALE_NAMES = [
  "alisha", "alisha", "ayesha", "fatima", "zara", "sara", "sarah", "maria",
  "hina", "nida", "sana", "rabia", "amina", "amna", "asma", "bushra",
  "fiza", "hira", "iqra", "kiran", "layla", "laila", "maham", "maryam",
  "mehwish", "nadia", "noor", "rida", "rimsha", "robia", "roshni",
  "saima", "samia", "shazia", "sidra", "sobia", "sonia", "sumaira",
  "tayyaba", "umber", "urwa", "uzma", "zainab", "zeba", "zunaira",
  "alice", "emma", "olivia", "sophia", "isabella", "mia", "amelia",
  "harper", "evelyn", "abigail", "emily", "elizabeth", "sofia", "avery",
  "ella", "scarlett", "grace", "chloe", "victoria", "riley", "aria",
  "lily", "aurora", "zoey", "penelope", "layla", "nora", "luna",
  "ellie", "hazel", "violet", "natalie", "isla", "leah", "eleanor",
  "hannah", "lillian", "addison", "aubrey", "anna", "stella", "natalia",
  "zoe", "leila", "savannah", "camila", "yara", "yasmin", "yasmeen",
  "pari", "parisa", "priya", "pooja", "neha", "anjali", "kavya",
  "ananya", "shruti", "divya", "meera", "simran", "jasmine", "jasmin",
  "nina", "clara", "diana", "eva", "kate", "katie", "jessica",
  "jennifer", "linda", "lisa", "mary", "patricia", "barbara", "susan",
  "jessica", "karen", "nancy", "betty", "margaret", "sandra", "ashley",
  "dorothy", "kimberly", "emily", "donna", "michelle", "carol", "amanda",
  "melissa", "deborah", "stephanie", "rebecca", "sharon", "laura",
  "cynthia", "kathleen", "amy", "angela", "shirley", "anna", "brenda",
  "pamela", "emma", "nicole", "helen", "samantha", "katherine",
  "shirin", "reem", "rima", "hana", "hanan", "lina", "dina", "rana",
  "rania", "saba", "sabah", "sabrina", "sahar", "salma", "samira",
  "shaimaa", "shaista", "sharmin", "shirin", "shohreh", "sobia",
];

// ─── Common Male Names List ──────────────────────────────────────────────────
const MALE_NAMES = [
  "ali", "ahmed", "muhammad", "usman", "hassan", "hussain", "ibrahim",
  "ismail", "imran", "kamran", "khalid", "majid", "mansoor", "mohsin",
  "mudassar", "munir", "naeem", "naveed", "omar", "osama", "rashid",
  "salman", "shahid", "shahzad", "shoaib", "sohail", "tariq", "umar",
  "waqar", "waseem", "yasir", "zain", "zubair", "bilal", "faisal",
  "fahad", "farhan", "farooq", "hamza", "haroon", "asad", "asif",
  "aamir", "adil", "adnan", "akbar", "akram", "arif", "amir",
  "dawood", "danish", "daniyal", "ehsan", "fawad", "ghulam",
  "james", "john", "robert", "michael", "william", "david", "richard",
  "joseph", "thomas", "charles", "christopher", "daniel", "matthew",
  "anthony", "mark", "donald", "steven", "paul", "andrew", "joshua",
  "kenneth", "kevin", "brian", "george", "timothy", "ronald", "edward",
  "jason", "jeffrey", "ryan", "jacob", "gary", "nicholas", "eric",
  "jonathan", "stephen", "larry", "justin", "scott", "brandon",
  "benjamin", "samuel", "raymond", "gregory", "frank", "alexander",
  "patrick", "jack", "dennis", "jerry", "tyler", "aaron", "jose",
  "adam", "henry", "nathan", "douglas", "zachary", "peter", "kyle",
  "noah", "liam", "oliver", "elijah", "lucas", "mason", "logan",
  "ethan", "aiden", "jackson", "sebastian", "carter", "owen",
  "caleb", "dylan", "ryan", "leo", "gabriel", "julian", "mateo",
  "rahul", "rajan", "raj", "rohit", "rohan", "arjun", "arun",
  "suresh", "ramesh", "mahesh", "dinesh", "vikas", "vikram",
  "raza", "rehan", "rehman", "rizwan", "rahim", "rafiq",
  "saad", "saeed", "sajid", "sami", "sarfraz", "shafiq", "shakeel",
  "sharjeel", "sufyan", "sultan", "talha", "tanveer", "tauseef",
  "waleed", "waheed", "waqas", "yousuf", "yusuf", "zafar", "zahid",
  "zahir", "zaman", "zeeshan", "zia",
];

// ─── Name-Gender Validation ──────────────────────────────────────────────────
const validateNameGender = (name, gender) => {
  const lowerName = name.trim().toLowerCase().split(" ")[0];

  if (gender === "male" && FEMALE_NAMES.includes(lowerName)) {
    return {
      valid: false,
      message: `"${name}" ek female name lagta hai! Male gender ke saath male name use karein, ya gender Female select karein.`,
    };
  }

  if (gender === "female" && MALE_NAMES.includes(lowerName)) {
    return {
      valid: false,
      message: `"${name}" ek male name lagta hai! Female gender ke saath female name use karein, ya gender Male select karein.`,
    };
  }

  return { valid: true };
};

// ─── ProfileModal Component ──────────────────────────────────────────────────
const ProfileModal = ({ user, onClose, onUserUpdate }) => {
  console.log("🚀 [ProfileModal] Modal opened for user:", user?.name);
  console.log("🚀 [ProfileModal] User data:", user);

  const [isEditing, setIsEditing]   = useState(false);
  const [editName, setEditName]     = useState(user?.name || "");
  const [editGender, setEditGender] = useState(user?.gender || "male");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  const handleSave = async () => {
    console.log("💾 [ProfileModal] Saving profile...");

    if (!editName.trim()) {
      console.warn("⚠️ [ProfileModal] Name is empty, aborting save");
      setError("Name khali nahi ho sakta!");
      return;
    }

    const validation = validateNameGender(editName, editGender);
    if (!validation.valid) {
      console.warn("⚠️ [ProfileModal] Gender-Name mismatch:", validation.message);
      setError(validation.message);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("📡 [ProfileModal] Sending PUT request to:", `${BACKEND_URL}/api/auth/profile`);

      const res = await axios.put(
        `${BACKEND_URL}/api/auth/profile`,
        { name: editName.trim(), gender: editGender },
        { withCredentials: true }
      );

      console.log("✅ [ProfileModal] Profile updated successfully:", res.data);

      if (res.data.success) {
        setSuccess("Profile successfully update ho gaya! ✅");
        setIsEditing(false);
        if (onUserUpdate) {
          console.log("🔄 [ProfileModal] Calling onUserUpdate with:", res.data.user);
          onUserUpdate(res.data.user);
        }
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error("❌ [ProfileModal] Save failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Update failed. Dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("🔙 [ProfileModal] Edit cancelled, reverting changes");
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditGender(user?.gender || "male");
    setError("");
  };

  const handleEdit = () => {
    console.log("✏️ [ProfileModal] Edit mode activated");
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleClose = () => {
    console.log("❎ [ProfileModal] Modal closed");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[110] px-3 sm:px-4 backdrop-blur-sm"
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
        background: "rgba(0,0,0,0.65)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          console.log("🖱️ [ProfileModal] Backdrop clicked, closing modal");
          handleClose();
        }
      }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md shadow-2xl overflow-hidden"
        style={{ animation: "fadeSlideUp 0.25s ease-out" }}
      >
        {/* ── Gradient Header Banner ── */}
        <div
          className="relative px-4 sm:px-5 pt-4 sm:pt-5 pb-12 sm:pb-14"
          style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #4F46E5 100%)" }}
        >
          <div
            className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(30%, -30%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-16 sm:w-20 h-16 sm:h-20 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(-30%, 30%)" }}
          />

          <div className="relative flex justify-between items-start">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                User Profile
              </h3>
              <p className="text-blue-200 text-xs mt-0.5">
                {isEditing ? "Editing your profile..." : "View & manage your account"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-1 sm:p-1.5 text-blue-200 hover:text-white hover:bg-white/20 rounded-lg transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Avatar ── */}
        <div className="-mt-8 sm:-mt-10 flex justify-center relative z-10">
          <ProfileAvatar user={isEditing ? { ...user, gender: editGender } : user} />
        </div>

        {/* ── Body ── */}
        <div className="px-3 sm:px-5 pb-3 sm:pb-5">

          {/* Success Message */}
          {success && (
            <div className="mb-2 sm:mb-3 flex items-center gap-2 p-2 sm:p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs sm:text-sm font-semibold">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-2 sm:mb-3 flex items-center gap-2 p-2 sm:p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm font-semibold">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Info Fields */}
          <ProfileInfoFields
            user={user}
            isEditing={isEditing}
            editName={editName}
            setEditName={setEditName}
            editGender={editGender}
            setEditGender={setEditGender}
          />

          {/* Action Buttons */}
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
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
};

export default ProfileModal;