import React from "react";
import SignUp from "../components/SignUp";
const page = () => {
  return (
    <main className="md:flex h-screen">
      <div className="md:w-[60%] bg-purple-500"></div>
      <div className="md:w-[40%]">
        <SignUp />
      </div>
    </main>
  );
};

export default page;
