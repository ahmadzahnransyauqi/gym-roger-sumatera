import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canReset, setCanReset] = useState(false);

  // Step 1: Verify email
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/check-email`,
        { email }
      );

      if (res.data.exists) {
        setCanReset(true);
        setMessage({
          type: "success",
          text: "Email verified! Enter your new password below.",
        });
      } else {
        setMessage({ type: "error", text: "Email not found." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Reset password using the new endpoint
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setMessage({ type: "error", text: "Please enter a new password." });
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/reset-password-email`,
        { email, newPassword } // backend expects email + newPassword
      );

      setMessage({
        type: "success",
        text: "Password has been reset successfully!",
      });
      setNewPassword("");
      setCanReset(false);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to reset password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
      <div className="bg-[#444444] p-8 sm:p-10 lg:p-12 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md border-t-4 border-[#ff1f1f]">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Reset Password</h1>
          <p className="text-gray-400 text-center mt-2">
            {canReset
              ? "Enter your new password below."
              : "Enter the email you used to create your account."}
          </p>
        </div>

        {!canReset ? (
          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#6e6e6e] text-white"
              disabled={isSubmitting}
            />
            {message.text && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.type === "error"
                    ? "bg-red-900/50 text-red-300"
                    : "bg-green-900/50 text-green-300"
                }`}
              >
                {message.text}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#ff1f1f] rounded-lg text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#6e6e6e] text-white"
              disabled={isSubmitting}
            />
            {message.text && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.type === "error"
                    ? "bg-red-900/50 text-red-300"
                    : "bg-green-900/50 text-green-300"
                }`}
              >
                {message.text}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#ff1f1f] rounded-lg text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-[#ff1f1f] hover:text-[#ff4d4d]"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}