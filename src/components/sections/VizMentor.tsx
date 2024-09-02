"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

import { CardBody, CardContainer } from "../ui/3d-card";

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
          className="mt-[-100px] md:mt-[-200px] h-[500px] w-[350px] md:h-[700px] md:w-[500px]"
          alt=""
        />

        <div className="flex flex-col w-[80%] md:w-[50%] mb-28 md:mb-0">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <div className="flex flex-col gap-7 w-[100%] md:w-[100%]">
                <p className="text-[2.125rem] font-bold font-serif">
                  Priyanka Bhatia
                </p>

                <p>
                  At Viza Mentor, I am Priyanka Bhatia, and I've dedicated my
                  career to guiding individuals like you through the
                  complexities.
                </p>

                <p>
                  With over
                  <b className="mx-2">10 years of experience in industry,</b>
                  Admission, Career Counselling, and visa filling, I understand
                  the challenges and opportunities of starting afresh in a
                  different land.
                </p>
                <p>
                  This course isn't just about legal processes; it's about
                  empowering you with knowledge and strategies to make informed
                  decisions that will shape your future.
                </p>

                <p>
                  Whether you're navigating visa applications, understanding
                  cultural nuances, or planning your career path abroad, my goal
                  is to equip you with practical insights and resources to
                  thrive in your new environment.
                </p>

                {/* <p>
            Join me in this workshop and let’s take the first step towards your
            success together.
            </p> */}
              </div>
            </CardBody>
          </CardContainer>

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
    text: "* Startups",
  },
  {
    text: "* B2B agents",
  },
  {
    text: "* Anyone who wants to learn visa process.",
  },
];

function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center z-[1111111]">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

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
          className="fixed top-4 right-4 text-black dark:text-white z-[9999999999999999]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
