import React from "react";
import "./Landing.css";
import boyImg from "./boyyyyyyy.png";
import oldManImg from "./olddddddd.png";

function Landing() {
  return (
    <div className="bg-[#2E2E2E] text-[#D1D0CB] min-h-screen">
      <nav className="flex justify-between items-center px-8 py-4 bg-[#6E6353]">
        <h1 className="text-xl font-bold text-[#D1D0CB]">Equadator</h1>
        <div className="flex gap-6">
          <a href="#" className="text-[#D1D0CB] hover:underline">Option 1</a>
          <a href="#" className="text-[#D1D0CB] hover:underline">Option 2</a>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-start min-h-[300vh] px-4 text-center pt-32">
        <div className="sticky top-32 flex flex-row items-center justify-between w-full max-w-6xl gap-32">
          <div className="text-left max-w-sm flex flex-col items-center">
            <img src={oldManImg} alt="Old Man" className="w-36 h-36 rounded-full" />
            <h2 className="text-2xl font-semibold text-[#A2A092]">Old Man</h2>
            <p id="old-man-dialog" className="mt-2 text-[#D1D0CB] fade-text"></p>
          </div>
          <div className="text-right max-w-sm flex flex-col items-center">
            <img src={boyImg} alt="Boy" className="w-36 h-36 rounded-full" />
            <h2 className="text-2xl font-semibold text-[#8A887E]">Boy</h2>
            <p id="boy-dialog" className="mt-2 text-[#D1D0CB] fade-text"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
