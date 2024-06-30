"use client";

import React, { useEffect, useState, useRef } from "react";

export const Satisfied = () => {
  const satisfiedRef = useRef<HTMLDivElement>(null);

  const [currentNumber, setCurrentNumber] = useState(500);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (
        satisfiedRef.current &&
        window.scrollY + window.innerHeight >= satisfiedRef.current.offsetTop
      ) {
        setStartAnimation(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      const interval = setInterval(() => {
        setCurrentNumber((prevNumber) => prevNumber + 1);
      }, 1);

      if (currentNumber >= 1000) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [startAnimation, currentNumber]);

  return (
    <div
      ref={satisfiedRef}
      className="bg-[#000000] h-52 flex flex-col justify-center align-middle items-center"
    >
      <div className="flex flex-col justify-center align-middle items-center px-3 border-x border-[#6D6363]">
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
