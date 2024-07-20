"use client";

import React from "react";
import CatergoryCard from "../cards/CatergoryCard";

function CategorySection() {
  const features = [
    {
      id: 0,
      // iconUrl: "/images/satellite.png",
      iconUrl: "/images/aircraft.png",
      title: "Study Visa Management Course",
      description:
        "Our comprehensive course covers everything from understanding visa requirements to post-graduation opportunities. Learn from industry experts who are committed to your success in obtaining and maximizing your study visa experience. Our course focused on study visas involves outlining the essential knowledge and skills you'll impart to your students.",
      highlighted: false,
    },
    {
      id: 1,
      iconUrl: "/images/aircraft.png",
      title: "Tourist Visa Management Course",
      description:
        "Explore our comprehensive course covering everything from visa application procedures to travel safety tips and Learn from experienced professionals dedicated to ensuring your travel visa application process is smooth and successful.",
      highlighted: true,
    },
    {
      id: 2,
      // iconUrl: "/images/mic.png",
      iconUrl: "/images/aircraft.png",
      title: "Visitor Visa Management Course",
      description:
        "Explore our comprehensive course covering everything from visa application procedures to travel safety tips and Learn from experienced professionals dedicated to ensuring your travel visa application process is smooth and successful.",
      highlighted: false,
    },
    {
      id: 3,
      // iconUrl: "/images/cog.png",
      iconUrl: "/images/aircraft.png",
      title: "How to write SOP",
      description:
        "Detailed guidance on crafting a compelling Statement of Purpose (SOP) for your academic or professional applications, tailored to highlight your strengths and ambitions.",
      highlighted: false,
    },
    {
      id: 4,
      // iconUrl: "/images/cog.png",
      iconUrl: "/images/aircraft.png",
      title: "Australia Visitor Visa",
      description:
        "Efficient services to facilitate your Australia visitor visa application, ensuring compliance with all requirements for a smooth travel experience.",
      highlighted: false,
    },
    {
      id: 5,
      // iconUrl: "/images/cog.png",
      iconUrl: "/images/aircraft.png",
      title: "Usa Tourist visa process",
      description:
        "Professional assistance for obtaining a USA tourist visa, ensuring a smooth and efficient application process for your travel plans.",
      highlighted: false,
    },
    {
      id: 6,
      // iconUrl: "/images/cog.png",
      iconUrl: "/images/aircraft.png",
      title: "Work Visa Management Course",
      description:
        "Explore our comprehensive course covering everything from understanding work visa requirements to navigating employment abroad. Learn from  professionals dedicated to guiding you through the complexities of securing work visas and advancing your career abroad",
      highlighted: false,
    },
  ];

  return (
    <section>
      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Category
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        We Offer Best Visa Training Courses
      </p>
      <div className="flex flex-col gap-4 md:flex-row justify-between flex-wrap w-full mt-16">
        {features.map((feature) => (
          <CatergoryCard
            key={feature.id}
            iconUrl={feature.iconUrl}
            title={feature.title}
            description={feature.description}
            highlighted={feature.highlighted}
          />
        ))}
      </div>

      <div className="">
        <h2 className="text-4xl font-bold font-serif text-center">
          Here's a structured approach to what we will include:
        </h2>
      </div>

      <CardHoverEffectDemo />
    </section>
  );
}

export default CategorySection;

import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "",
    description: "Overview of Visa",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "How to Assess the File",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Eligibility Factors",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Documentation Part",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Recent Trends of Market",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Filling Part",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Post Visa Formalities",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Airport Immigration Clearance Part",
    // description: "",
    link: "",
  },
  {
    title: "",
    description: "Pathway to Residency Part",
    // description: "",
    link: "",
  },
];
