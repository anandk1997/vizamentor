"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

export const VizMentor = () => {
  return (
    <div>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        Know Your Mentors
      </p>

      <div className="flex flex-col md:flex-row items-center md:w-[80%] m-auto overflow-hidden">
        {/* <div className="h-[700px] mt-[-50px] bg-red-700 w-[50%] imm shadow-[-6.0px_8.0px_8.0px_black]"> */}
        {/* <Image src="" height={0} width={0} alt=''/> */}

        {/* kjjnkhkjkjhkj */}
        {/* </div> */}

        <Image
          src="/bg.png"
          height={500}
          width={300}
          className="mt-[-100px] h-[700px] w-[500px]"
          alt=""
        />

        <div className="flex flex-col pt-12 gap-7 w-[80%] md:w-[50%] mb-28">
          <p className="text-[2.125rem] font-bold font-serif">
            Priyanka Bhatia
          </p>

          <p>
            At Viza Mentor, I am Priyanka Bhatia, and I've dedicated my career
            to guiding individuals like you through the complexities of
            immigration.
          </p>

          <p>
            With over
            <b className="mx-2">10 years of experience in Immigration,</b>
            Admission, Career Counselling, and visa filling, I understand the
            challenges and opportunities of starting afresh in a different land.
          </p>
          <p>
            This course isn't just about legal processes; it's about empowering
            you with knowledge and strategies to make informed decisions that
            will shape your future.
          </p>

          <p>
            Whether you're navigating visa applications, understanding cultural
            nuances, or planning your career path abroad, my goal is to equip
            you with practical insights and resources to thrive in your new
            environment.
          </p>

          {/* <p>
            Join me in this workshop and let’s take the first step towards your
            success together.
            </p> */}
          <MultiStepLoaderDemo />
        </div>
      </div>
    </div>
  );
};

const loadingStates = [
  {
    text: "Working Professional",
  },
  {
    text: "Recent Graduates",
  },
  {
    text: "* Immigration Startups",
  },
  {
    text: "* B2B agents",
  },
  {
    text: "* Anyone who wants to learn immigration visa process.",
  },
];

function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center pt-4">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

      {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
      <button
        onClick={() => setLoading(true)}
        className="bg-[black] hover:bg-[black]/90 text-white mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
      >
        Who can join
      </button>

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[12000000]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
