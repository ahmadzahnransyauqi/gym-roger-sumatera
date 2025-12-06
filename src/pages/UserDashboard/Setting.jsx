import { Lock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Popup from "../../component/confirmPopup"; // import the reusable popup

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // popup state
  const [popup, setPopup] = useState({ visible: false, message: "", type: "info" });

  const token = localStorage.getItem("token"); // JWT token from login

  const showPopup = (message, type = "info") => {
    setPopup({ visible: true, message, type });
  };

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword) {
      return showPopup("Please fill in all password fields", "error");
    }

    if (newPassword !== confirmPassword) {
      return showPopup("New passwords do not match", "error");
    }

    try {
      const res = await axios.put(
        "/api/user/reset&delete/reset-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        showPopup(res.data.msg || "Password reset successful!", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      showPopup(err.response?.data?.error || "Failed to reset password", "error");
    }
  };

  const handleCloseAccount = async () => {
    if (!showDeleteConfirm) return;
    try {
      const res = await axios.delete("/api/user/reset&delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        showPopup("Account deleted successfully.", "success");
        localStorage.removeItem("token");
        setTimeout(() => (window.location.href = "/"), 1500); // redirect after popup
      }
    } catch (err) {
      console.error(err);
      showPopup(err.response?.data?.error || "Failed to delete account", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 style={{ color: "#ffffff" }}>Settings</h2>
        <p style={{ color: "#9CA3AF" }}>Manage your account preferences and security</p>
      </div>

      <div className="space-y-6">
        {/* Reset Password */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: "#252525" }}>
          <div className="flex items-center gap-2 mb-4">
            <Lock size={24} style={{ color: "#ff1f1f" }} />
            <h3 style={{ color: "#ffffff" }}>Reset Password</h3>
          </div>

          <div className="space-y-4 max-w-md">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#1a1a1a", color: "#ffffff", border: "1px solid #252525" }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#1a1a1a", color: "#ffffff", border: "1px solid #252525" }}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#1a1a1a", color: "#ffffff", border: "1px solid #252525" }}
            />

            <button
              onClick={handleResetPassword}
              className="px-6 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: "#252525", borderColor: "#ff1f1f" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={24} style={{ color: "#ff1f1f" }} />
            <h3 style={{ color: "#ff1f1f" }}>Danger Zone</h3>
          </div>

          <p className="mb-4" style={{ color: "#9CA3AF" }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
            >
              Close Account
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-lg" style={{ backgroundColor: "#1a1a1a" }}>
                <p style={{ color: "#ffffff" }}>Are you absolutely sure you want to close your account?</p>
                <p className="mt-2" style={{ color: "#9CA3AF" }}>
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseAccount}
                  className="px-6 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1a1a1a", color: "#ffffff", border: "1px solid #252525" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      <Popup
        visible={popup.visible}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, visible: false })}
      />
    </div>
  );
}