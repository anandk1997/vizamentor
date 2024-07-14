import React from "react";
import DestinationCard from "../cards/DestinationCard";

function TopSellingSection() {
  const destinations = [
    {
      id: 0,
      imageUrl: "/images/canada.jpg",
      title: "Canada",
      amount: "₹ 3000",
      // duration: "10 Days Trip",
      highlighted: false,
    },
    {
      id: 1,
      imageUrl: "/images/austrailia.jpg",
      title: "Australia",
      amount: "₹ 3000",
      // duration: "12 Days Trip",
      highlighted: false,
    },
    {
      id: 2,
      imageUrl: "/images/america.jpg",
      title: "United States",
      amount: "₹ 3000",
      // duration: "28 Days Trip",
      highlighted: true,
    },
  ];
  return (
    <section>
      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Top Selling
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        Top Courses
      </p>
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-16 w-full">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            imageUrl={destination.imageUrl}
            title={destination.title}
            // duration={destination.duration??""}
            duration={""}
            amount={destination.amount}
            highlighted={destination.highlighted}
          />
        ))}
      </div>

      <button
        className="bg-[black] hover:bg-[black]/90 text-white mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
      >
        Program fees ₹ 10000 only
      </button>
    </section>
  );
}

export default TopSellingSection;
