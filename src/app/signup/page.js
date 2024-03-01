import React from "react";
import SignUp from "../components/SignUp";
const page = () => {
  return (
    <main className="flex h-screen">
      <div className="w-[60%] bg-purple-500"></div>
      <div className="w-[40%]">
        <SignUp />
      </div>
    </main>
  );
};

export default page;
