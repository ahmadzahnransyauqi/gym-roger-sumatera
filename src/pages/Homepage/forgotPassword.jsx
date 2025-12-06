import React, { useState } from "react";
import { Link } from "react-router-dom";

// This component simulates the layout and styling of a typical login/auth page
// based on the dark theme and red accents used throughout the app.
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle the password reset submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    // Simulate API call for password reset request
    setIsSubmitting(true);
    setMessage("");

    // In a real application, you would call your Firebase/Auth service here.
    // Example with Firebase: sendPasswordResetEmail(auth, email)
    setTimeout(() => {
      setIsSubmitting(false);

      // Simulate success or failure
      if (email.includes("@")) {
        setMessage({
          type: "success",
          text: "If your email is registered, you will receive a password reset link shortly.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Invalid email format. Please try again.",
        });
      }
      // Clear email input only on successful simulated request
      if (message.type === "success") {
        setEmail("");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
      {/* Auth Card Container */}
      <div
        className="
                    bg-[#444444]
                    p-8 sm:p-10 lg:p-12 
                    rounded-xl shadow-2xl 
                    w-full max-w-sm sm:max-w-md 
                    border-t-4 border-[#ff1f1f]
                "
      >
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Reset Password</h1>
          <p className="text-gray-400 text-center mt-2">
            Enter the email address you used to create your account to receive a
            password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                                appearance-none block w-full px-4 py-3 
                                border border-gray-600 rounded-lg 
                                shadow-sm placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-[#ff1f1f] focus:border-[#ff1f1f] 
                                bg-[#6e6e6e] text-white 
                            "
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
          </div>

          {/* Submission Message */}
          {message.text && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                message.type === "error"
                  ? "bg-red-900/50 text-red-300"
                  : "bg-green-900/50 text-green-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="
                                w-full flex justify-center py-3 px-4 border border-transparent 
                                rounded-lg shadow-sm text-lg font-bold text-white 
                                bg-[#ff1f1f] hover:bg-[#ff4d4d] 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff1f1f] 
                                transition duration-150 ease-in-out
                            "
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>

        {/* Back to Login Link */}
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
