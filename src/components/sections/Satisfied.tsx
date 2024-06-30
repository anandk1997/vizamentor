"use client";

import React, { useEffect, useState } from "react";

export const Satisfied = () => {
  const [currentNumber, setCurrentNumber] = useState(500);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber((prevNumber) => prevNumber + 1);
    }, 1);

    if (currentNumber === 1000) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Clean up on unmount
  }, [currentNumber]);

  return (
    <div className="bg-[#000000] h-52 flex flex-col justify-center align-middle items-center">
      <div className="flex flex-col justify-center align-middle items-center  px-3 border-x border-[#6D6363]">
        <p className="text-[#F48220] text-8xl font-extrabold">
          {currentNumber}+
        </p>
        <span className="text-[#FFFFFF] text-2xl font-serif">
          Students Satisfied
        </span>
      </div>
    </div>
  );
};
