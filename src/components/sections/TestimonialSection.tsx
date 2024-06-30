"use client";

import { motion } from "framer-motion";
import { ImagesSlider } from "../ui/images-slider";
import React from "react";

function TestimonialSection() {
  const reviews = [
    {
      id: 0,
      imageUrl: "/images/mike.png",
      reviewerName: "Mike taylor",
      position: "Lahore, Pakistan",
      review:
        "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    },
    {
      id: 2,
      imageUrl: "/images/mike.png",
      reviewerName: "Chris Thomas",
      position: "CEO of Red Button",
      review:
        "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    },
  ];
  return (
    <section className="flex justify-between flex-col xl:flex-row items-center lg:-mt-[5rem] gap-16">
      <div>
        <p className="text-lightGray text-[1.125rem] font-[600] text-left uppercase">
          Testimonials
        </p>
        <p className="volkhov text-[3.125rem] text-title font-[700] text-left">
          What People Say About Us.
        </p>

        {/* <div className="mt-[5.12rem] ">
          <img
            src="/images/slide-indicator.png"
            alt="slide indicator"
            className="hidden md:block"
          />
        </div> */}
      </div>
      {/* <div className="flex items-center gap-4 md:gap-[4.12rem]">
        <div className="relative">
          <TestimonialCard
            key={reviews[0].id}
            position={reviews[0].position}
            review={reviews[0].review}
            reviewerName={reviews[0].reviewerName}
            imageUrl={reviews[0].imageUrl}
          />
          <div className="absolute -bottom-[6rem] left-32 -z-10">
            <TestimonialCard
              key={reviews[1].id}
              position={reviews[1].position}
              review={reviews[1].review}
              reviewerName={reviews[1].reviewerName}
              imageUrl={reviews[1].imageUrl}
              isBackdrop
            />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="hover:cursor-pointer">
            <img src="/images/chevron-up.png" alt="chevron up" />
          </div>
          <div className="hover:cursor-pointer">
            <img src="/images/chevron-down.png" alt="chevron up" />
          </div>
        </div>
      </div> */}

      <ImagesSliderDemo />
    </section>
  );
}

export default TestimonialSection;

function ImagesSliderDemo() {
  const images = [
    "/feedback/f1.jpeg",
    "/feedback/f2.jpeg",
    "/feedback/f3.jpeg",
  ];

  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        {/* <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button> */}
      </motion.div>
    </ImagesSlider>
  );
}
