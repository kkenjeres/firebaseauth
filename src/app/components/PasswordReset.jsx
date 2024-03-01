"use client";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../firebase";
export default function PasswordReset({ onChangeView }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link has been sent to your email.");
      setError("");
      setEmail("");
    } catch (error) {
      setError("Error sending password reset email: " + error.message);
      setMessage("");
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center p-20 ">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Forgot Password</h2>
      <small className=" text-gray-700 ">
        Enter your registered email to reset your password
      </small>

      <form
        className="my-10 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordReset();
        }}
      >
        {message && (
          <small className="text-center text-green-500 mb-4">{message}</small>
        )}
        {error && (
          <small className="text-center text-red-500 mb-4">{error}</small>
        )}
        <input
          className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700 "
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Continue
        </button>
      </form>
      <div className="flex justify-center">
        <p
          className="text-center text-purple-600 hover:text-purple-800 cursor-pointer"
          onClick={() => onChangeView("signIn")}
        >
          Back to login
        </p>
      </div>
    </section>
  );
}
