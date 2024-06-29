import React from "react";
import CatergoryCard from "../cards/CatergoryCard";

function CategorySection() {
  const features = [
    {
      id: 0,
      // iconUrl: "/images/satellite.png",
      iconUrl: "/images/aircraft.png",
      title: "Canada Tourist Visa",
      description:
        "Expert assistance for hassle-free Canada tourist visa applications, from preparation to submission.",
      highlighted: false,
    },
    {
      id: 1,
      iconUrl: "/images/aircraft.png",
      title: "Canada Study Visa",
      description:
        "Comprehensive support for securing a Canada study visa, guiding you through the application process to fulfill your academic aspirations.",
      highlighted: true,
    },
    {
      id: 2,
      // iconUrl: "/images/mic.png",
      iconUrl: "/images/aircraft.png",
      title: "Canada PR",
      description:
        "Expert assistance in navigating the complex process of obtaining Canadian Permanent Residency, ensuring a seamless transition to residency.",
      highlighted: false,
    },
    {
      id: 3,
      // iconUrl: "/images/cog.png",
      iconUrl: "/images/aircraft.png",
      title: "How to wrote SOP",
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
  ];

  return (
    <section>
      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Category
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        We Offer Best Services
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
    </section>
  );
}

export default CategorySection;
