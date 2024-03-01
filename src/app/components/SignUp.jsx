"use client";
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "../firebase";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import Link from "next/link";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (isRegistered) {
      router.push("/");
    }
  }, [isRegistered, router]);
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const validateForm = () => {
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      resetForm();
      setIsRegistered(true);

      await setDoc(doc(getFirestore(), "users", userCredential.user.uid), {
        name,
        email,
      });
    } catch (error) {
      setError("Error signing up: " + error.message);
    }
  };
  return (
    <section className="w-full h-full flex flex-col justify-center p-4 md:p-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign Up</h2>
      <small className="text-gray-700">Create your new account</small>
      <form className="my-10 flex flex-col gap-4" onSubmit={handleSignUp}>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700"
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700"
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700"
            id="password"
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      {isRegistered && (
        <p className="text-green-500">Registration successful!</p>
      )}

      <div className="flex justify-center flex-col items-center gap-4">
        <span>
          Already Joined?{" "}
          <Link href="/" className="text-violet-600 hover:text-violet-800">
            Login
          </Link>
        </span>
        <div className="flex text-[30px] gap-2 cursor-not-allowed text-gray-500">
          <FaGoogle />
          <FaFacebook />
        </div>
      </div>
    </section>
  );
}
