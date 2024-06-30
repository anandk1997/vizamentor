import Image from "next/image";
import React from "react";

export const Features = () => {
  return (
    <>
      <section className="flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
        <h2 className="text-center text-5xl font-bold mb-12">Why Chooose US</h2>

        <div className="max-container padding-container relative w-full flex justify-end">
          <div className="flex flex-1 lg:min-h-[900px]">
            <Image
              src="/phone.png"
              alt="phone"
              width={440}
              height={1000}
              className="feature-phone"
            />
          </div>

          <div className="z-20 flex w-full flex-col lg:w-[60%]">
            <div className="relative">
              {/* <Image
                src="/camp.svg"
                alt="camp"
                width={50}
                height={50}
                className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px]"
              />
              <h2 className="bold-40 lg:bold-64">Our Features</h2> */}
            </div>
            <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:mg-20 lg:gap-20">
              {FEATURES.map((feature) => (
                <FeatureItem
                  key={feature.title}
                  title={feature.title}
                  icon={feature.icon}
                  description={feature.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
};

const FEATURES = [
  {
    title: "Personalized Guidance",
    icon: "/map.svg",
    variant: "green",
    description:
      "We believe in understanding your story, not just your paperwork. Our approach begins with listening—to your ambitions, concerns, and the intricacies of your situation. This allows us to craft a strategy that aligns with your individual goals and circumstances.",
  },
  {
    title: "Comprehensive Expertise",
    icon: "/calendar.svg",
    variant: "green",
    description:
      "With over 10 years of experience in immigration law, visa processing, and cultural adaptation, we bring a wealth of knowledge to every aspect of your journey. Whether you're navigating the legal landscape or seeking practical advice on settling in a new country, we're here to provide clear, actionable insights.",
  },
  {
    title: "Empowerment Through Education",
    icon: "/tech.svg",
    variant: "green",
    description:
      "Knowledge is power. Our course goes beyond mere instruction; it empowers you with in-depth understanding and practical skills to confidently navigate the challenges of immigration. From visa applications to cultural integration tips, we equip you with the tools you need to succeed.",
  },
  {
    title: "Community and Support",
    icon: "/location.svg",
    variant: "orange",
    description:
      "Moving to a new country can be daunting, but you're not alone. Joining our course means becoming part of a supportive community of individuals who share similar goals and experiences. Exchange insights, seek advice, and build connections that extend beyond borders.",
  },
  {
    title: "Commitment to Your Success",
    icon: "/location.svg",
    variant: "orange",
    description:
      "Your success is our priority. We measure our success not just by the number of visas processed but by the positive impact we have on your life. We're dedicated to helping you achieve your dreams of a new beginning, every step of the way",
  },
];

const FeatureItem = ({ title, icon, description }: FeatureItem) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-[#30AF5B]">
        <Image src={icon} alt="map" width={28} height={28} />
      </div>
      {/* <h2 className="bold-20 lg:bold-32 mt-5 capitalize">{title}</h2> */}
      <h2 className="font-bold mt-5 capitalize">{title}</h2>
      <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  );
};
