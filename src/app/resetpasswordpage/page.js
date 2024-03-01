"use client";
import React, { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");

    const auth = getAuth();
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage(
        "Your password has been reset successfully. You can now login with your new password."
      );
    } catch (error) {
      setError("Failed to reset password. " + error.message);
    }
  };

  return (
    <section className="reset-password-section">
      <h2>Reset Your Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleResetPassword}>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm New Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </section>
  );
}
