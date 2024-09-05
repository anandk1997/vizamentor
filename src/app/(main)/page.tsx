"use client";

import CategorySection from "@/components/sections/CategorySection";
import { Features } from "@/components/sections/Features";
import HeroSection from "@/components/sections/HeroSection";
import { Satisfied } from "@/components/sections/Satisfied";
import TestimonialSection from "@/components/sections/TestimonialSection";
import TopSellingSection from "@/components/sections/TopSellingSection";
import { VizMentor } from "@/components/sections/VizMentor";
import { useReducer } from "react";

export default function Home() {
  const [isDemo, setIsDemo] = useReducer((open) => !open, false);

  const embedUrl = `https://www.youtube.com/embed/${"Rpwhh6IuCjk?si=bydNmrdlZPslX6Ij"}`;

  return (
    <>
      <HeroSection setIsDemo={setIsDemo} />

      {isDemo && (
        <div className="">
          <iframe
            className="mt-[-100px] ms-[200px]"
            src={embedUrl}
            style={{
              height: "500px",
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          />
        </div>
      )}

      <div className="absolute top-0 right-0 -z-10">
        <img src="/images/blob-shape.png" alt="blob background shape" />
      </div>
      <div className="absolute top-0 left-0 -z-10">
        <img src="/images/top-left-gradient.png" alt="blob background shape" />
      </div>
      <div className="relative">
        <CategorySection />
        <div className="absolute top-0 right-0">
          <img src="/images/plus-group.png" alt="blob background shape" />
        </div>
      </div>

      <TopSellingSection />

      <VizMentor />

      <Features />
      {/* <BookNextTripSection /> */}
      <TestimonialSection />
      <Satisfied />
      {/* <LogoGroupSection /> */}
      {/* <NewsLetterSection /> */}
    </>
  );
}
