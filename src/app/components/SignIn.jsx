"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "../firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaFacebook, FaGoogle } from "react-icons/fa";
export default function SignIn({ onChangeView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setLoggedIn(false);
        setUserEmail(null);
      }
    });
    return unsubscribe;
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (error) {
      setError("Failed to login: " + error.message);
      console.error("Login error: ", error.message);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
  };
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // После успешного входа, можно сохранить данные пользователя в Firestore или выполнить другие действия
      const user = result.user;
      router.push("/");

      await setDoc(doc(getFirestore(), "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });
    } catch (error) {
      setError("Error during sign up with Google: " + error.message);
    }
  };
  return (
    <section className="w-full h-full flex flex-col justify-center p-4 md:p-20 ">
      {loggedIn ? (
        <>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 ">
            Hello <small className="text-gray-400"> {userEmail} 👋</small>
          </h2>
          <p className="text-3xl font-bold ">Welcome to Your App</p>
          <button
            className="bg-purple-500 w-full hover:bg-purple-700 text-white py-2 px-4 rounded mt-8"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900 ">Welcome Back!</h2>
          <small className=" text-gray-700 ">Login to your account</small>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <form className="my-10 flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700 "
                id="email"
                type="email"
                placeholder="Enter email"
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
                className="rounded-md bg-[#E7E9E6] w-full p-4 text-gray-700 "
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <small
              className="cursor-pointer text-violet-600 hover:text-violet-800 text-right"
              onClick={() => onChangeView("passwordReset")}
            >
              Forgot password?
            </small>
            <button
              className="bg-purple-500 w-full hover:bg-purple-700 text-white py-2 px-4 rounded mt-8"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex justify-center flex-col items-center gap-4">
            <span>
              New Memeber?{" "}
              <Link
                href="/signup"
                className="text-violet-600 hover:text-violet-800"
              >
                Sign Up
              </Link>
            </span>
            <small className="text-gray-400">or continue with</small>
            <div className="flex text-[30px] gap-2 ">
              <FaGoogle
                onClick={handleGoogleSignUp}
                className="cursor-pointer"
              />

              <FaFacebook className="cursor-not-allowed text-gray-500" />
            </div>
          </div>
        </>
      )}{" "}
    </section>
  );
}
