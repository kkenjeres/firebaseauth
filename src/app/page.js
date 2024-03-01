"use client";
import React, { useState } from "react";
import SignIn from "./components/SignIn";
import PasswordReset from "./components/PasswordReset";

export default function Home() {
  const [currentView, setCurrentView] = useState("signIn");

  return (
    <main className="flex h-screen">
      <div className="w-[60%] bg-purple-500"></div>
      <div className="w-[40%]">
        {currentView === "signIn" && <SignIn onChangeView={setCurrentView} />}
        {currentView === "passwordReset" && (
          <PasswordReset onChangeView={setCurrentView} />
        )}
      </div>
    </main>
  );
}
