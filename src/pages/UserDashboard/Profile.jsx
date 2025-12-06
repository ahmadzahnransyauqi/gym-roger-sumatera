import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  QrCode,
  UserCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const emptyProfile = {
    id: "",
    username: "",
    full_name: "",
    email: "",
    phone: "",
    goal: "",
    profile_photo: null,
    qr_token: "", // add qr_token here
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [editedProfile, setEditedProfile] = useState(emptyProfile);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Fetch user profile and QR token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/edit_profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;

        const sanitizedUser = {
          id: user.id || "",
          username: user.username || "",
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
          goal: user.goal || "",
          profile_photo: user.profile_photo || null,
          qr_token: "", // initialize empty
        };

        setProfile(sanitizedUser);
        setEditedProfile(sanitizedUser);

        setPhotoPreview(
          sanitizedUser.profile_photo
            ? `${import.meta.env.VITE_API_URL}${sanitizedUser.profile_photo}`
            : null
        );

        // Fetch QR token from backend
        if (sanitizedUser.id) {
          const qrRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/qr/generate`,
            { user_id: sanitizedUser.id }
          );

          if (qrRes.data?.data?.qr_token) {
            setProfile((prev) => ({
              ...prev,
              qr_token: qrRes.data.data.qr_token,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load profile or QR token:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(editedProfile).forEach((key) => {
        let value = editedProfile[key];
        if (value === null || value === undefined) value = "";
        formData.append(key, value);
      });

      if (photoFile) formData.append("profile_photo", photoFile);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/edit_profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data.user;

      const sanitizedUpdated = {
        id: updated.id || "",
        username: updated.username || "",
        full_name: updated.full_name || "",
        email: updated.email || "",
        phone: updated.phone || "",
        goal: updated.goal || "",
        profile_photo: updated.profile_photo || null,
        qr_token: profile.qr_token, // keep existing QR token
      };

      setProfile(sanitizedUpdated);
      setEditedProfile(sanitizedUpdated);

      setPhotoPreview(
        sanitizedUpdated.profile_photo
          ? `${import.meta.env.VITE_API_URL}${sanitizedUpdated.profile_photo}`
          : null
      );

      setPhotoFile(null);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setPhotoPreview(
      profile.profile_photo
        ? `${import.meta.env.VITE_API_URL}${profile.profile_photo}`
        : null
    );
    setPhotoFile(null);
    setIsEditing(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl" style={{ color: "#ffffff" }}>Profile</h2>
          <p className="text-sm sm:text-base" style={{ color: "#9CA3AF" }}>
            View and edit your personal information
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PANEL */}
        <div
          className="p-4 sm:p-6 rounded-lg flex flex-col items-center"
          style={{ backgroundColor: "#252525" }}
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
            <div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle size={48} className="sm:w-16 sm:h-16" style={{ color: "#ff1f1f" }} />
              )}
            </div>

            {isEditing && (
              <label
                htmlFor="profilePhotoInput"
                className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer border-2 border-gray-800 hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </label>
            )}

            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <h3 className="text-lg sm:text-xl text-center" style={{ color: "#ffffff" }}>{profile.full_name}</h3>
          <p className="mt-1 text-sm sm:text-base" style={{ color: "#9CA3AF" }}>
            @{profile.username}
          </p>

          {/* QR Code Button */}
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
          >
            <QrCode size={18} />
            {showQRCode ? "Tutup QR Code" : "Tampilkan QR Member"}
          </button>

          {/* QR Code Area */}
          {showQRCode && (
            <div
              className="mt-4 p-4 rounded-lg w-full max-w-xs"
              style={{ backgroundColor: "#ffffff" }}
            >
              <QRCodeSVG
                value={profile.qr_token || profile.id}
                size={150}
                className="w-full max-w-full"
                level="H"
              />
              <p
                className="text-center mt-2 text-xs sm:text-sm"
                style={{
                  color: "#1a1a1a",
                  fontWeight: "bold",
                  wordBreak: "break-all",
                }}
              >
                ID: {profile.id}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profile.qr_token || profile.id);
                  alert("Token berhasil disalin!");
                }}
                className="mt-4 w-full py-2 px-4 rounded-lg text-sm sm:text-base"
                style={{
                  color: "#fff",
                  backgroundColor: "#1a1a1a",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Copy QR Token
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div
          className="lg:col-span-2 p-4 sm:p-6 rounded-lg"
          style={{ backgroundColor: "#252525" }}
        >
          <h3 className="mb-6 text-lg sm:text-xl lg:text-2xl" style={{ color: "#ffffff" }}>
            Personal Information
          </h3>

          <div className="space-y-4">
            {[{ label: "Username", icon: User, key: "username" },
              { label: "Full Name", icon: User, key: "full_name" },
              { label: "Email", icon: Mail, key: "email" },
              { label: "Phone", icon: Phone, key: "phone" },
            ].map(({ label, icon: Icon, key }) => (
              <div key={key}>
                <label
                  className="flex items-center gap-2 mb-2 text-sm sm:text-base"
                  style={{ color: "#9CA3AF" }}
                >
                  <Icon size={18} />
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    value={editedProfile[key] || ""}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        [key]: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg text-sm sm:text-base"
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#ffffff",
                      border: "1px solid #252525",
                    }}
                  />
                ) : (
                  <p className="text-sm sm:text-base" style={{ color: "#ffffff" }}>{profile[key]}</p>
                )}
              </div>
            ))}

            <div>
              <label
                className="flex items-center gap-2 mb-2 text-sm sm:text-base"
                style={{ color: "#9CA3AF" }}
              >
                <Calendar size={18} />
                Fitness Goals
              </label>
              {isEditing ? (
                <textarea
                  placeholder="Describe your fitness goals"
                  value={editedProfile.goal || ""}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, goal: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg text-sm sm:text-base"
                  rows={3}
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    border: "1px solid #252525",
                  }}
                />
              ) : (
                <p className="text-sm sm:text-base" style={{ color: "#ffffff" }}>{profile.goal}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-lg hover:opacity-90 text-sm sm:text-base"
                  style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
                >
                  Save Changes
                </button>

                <button
                  onClick={handleCancel}
                  className="flex-1 py-2 rounded-lg hover:opacity-90 text-sm sm:text-base"
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    border: "1px solid #252525",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
