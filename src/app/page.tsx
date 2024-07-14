import NavBar from "@/components/common/NavBar";
import BookNextTripSection from "@/components/sections/BookNextTripSection";
import CategorySection from "@/components/sections/CategorySection";
import { Features } from "@/components/sections/Features";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import LogoGroupSection from "@/components/sections/LogoGroupSection";
import NewsLetterSection from "@/components/sections/NewsLetterSection";
import { Satisfied } from "@/components/sections/Satisfied";
import TestimonialSection from "@/components/sections/TestimonialSection";
import TopSellingSection from "@/components/sections/TopSellingSection";
import { VizMentor } from "@/components/sections/VizMentor";

export default function Home() {
  return (
    <main className="relative poppins  md:px-[9rem]">
      <NavBar />
      <div className="px-4 flex flex-col gap-[7.69rem]">
        <HeroSection />
        <div className="absolute top-0 right-0 -z-10">
          <img src="/images/blob-shape.png" alt="blob background shape" />
        </div>
        <div className="absolute top-0 left-0 -z-10">
          <img
            src="/images/top-left-gradient.png"
            alt="blob background shape"
          />
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
        <FooterSection />
      </div>
    </main>
  );
}

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
// import Image from "next/image";

// import Link from "next/link";
// import { FollowerPointerCard } from "@/components/ui/following-pointer";

// import { FaAngleDoubleDown, FaCaretDown } from "react-icons/fa";

// export default function Home() {
//   const words = [
//     {
//       text: "VIZA",
//     },
//     {
//       text: "MENTOR",
//       className: "text-blue-500 dark:text-blue-500",
//     },
//     // {
//     //   text: "apps",
//     // },
//     // {
//     //   text: "with",
//     // },
//     // {
//     //   text: "Aceternity.",
//     //   className: "text-blue-500 dark:text-blue-500",
//     // },
//   ];

//   return (
//     <>
//       {/* <div className="w-full h-20 bg-[#FFCC00] sticky top-0"> */}
//       <div className="w-full h-20 bg-white sticky top-0">
//         <div className="px-8 h-full">
//           <div className="flex justify-between items-center h-full">
//             <ul className="hidden md:flex gap-x-6 text-white items-center">
//               <li className="flex gap-3">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger className="flex justify-center items-center gap-3 bg-white rounded-lg shadow-[-6.0px_8.0px_8.0px_black] text-black text-xl font-bold py-2 px-4 focus-visible:outline-none">
//                     Courses
//                     <FaAngleDoubleDown className="text-xl cursor-pointer" />
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent>
//                     <DropdownMenuLabel>Visa Apply</DropdownMenuLabel>
//                     <DropdownMenuSeparator />

//                     <DropdownMenuLabel>Immigration</DropdownMenuLabel>
//                     <DropdownMenuSeparator />

//                     <DropdownMenuLabel>Consultancy</DropdownMenuLabel>
//                     <DropdownMenuSeparator />

//                     <DropdownMenuLabel>Team</DropdownMenuLabel>
//                     <DropdownMenuSeparator />

//                     <DropdownMenuLabel>Subscription</DropdownMenuLabel>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/about"
//                 >
//                   Home
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   About Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   Why Choose Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   Learning Modules
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   Testimonials
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   Our Galary
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>

//             {/* <h2 className="font-bold text-2xl font-mono">VIZA MENTOR</h2> */}

//             <ul className="hidden md:flex gap-x-6 text-white items-center">
//               <li>
//                 <Link
//                   className="font-semibold text-md text-black hover:border-b-2 border-black pb-3"
//                   href="/services"
//                 >
//                   Enroll Now
//                 </Link>
//               </li>

//               <li className="flex gap-3">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger className="flex justify-center items-center gap-3 bg-white rounded-lg shadow-[-6.0px_8.0px_8.0px_black] text-black text-xl font-bold py-2 px-4 focus-visible:outline-none">
//                     Join The Community
//                     <FaCaretDown className="text-xl cursor-pointer" />
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent>
//                     <DropdownMenuLabel>Slack</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuLabel>Linkedin</DropdownMenuLabel>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </li>
//             </ul>
//             {/* <Button /> */}
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center w-[60%] m-auto mt-16 ccc">
//         <div className="flex-1 flex flex-col gap-16">
//           {/* <h1 className="md:text-8xl font-bold flex flex-col font-mono ps-5">
//             <span>VIZA</span>

//             <span>MENTOR</span>
//           </h1> */}

//           <TypewriterEffectSmooth words={words} />

//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
//             <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
//               Join now
//             </button>
//             <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
//               Signup
//             </button>
//           </div>
//         </div>

//         <div className="flex-1">
//           <Image
//             src="/visa.jpg"
//             height={500}
//             width={500}
//             className="rounded-xl"
//             alt=""
//           />
//         </div>
//       </div>

//       <FollowingPointerDemo />
//     </>
//   );
// }

// function FollowingPointerDemo() {
//   return (
//     <div className="w-80 mx-auto m-20">
//       <FollowerPointerCard
//         title={
//           <TitleComponent
//             title={blogContent.author}
//             avatar={blogContent.authorAvatar}
//           />
//         }
//       >
//         <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
//           <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
//             <Image
//               src={blogContent.image}
//               alt="thumbnail"
//               layout="fill"
//               objectFit="cover"
//               className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
//             />
//           </div>
//           <div className=" p-4">
//             <h2 className="font-bold my-4 text-lg text-zinc-700">
//               {blogContent.title}
//             </h2>
//             <h2 className="font-normal my-4 text-sm text-zinc-500">
//               {blogContent.description}
//             </h2>
//             <div className="flex flex-row justify-between items-center mt-10">
//               <span className="text-sm text-gray-500">{blogContent.date}</span>
//               <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
//                 Read More
//               </div>
//             </div>
//           </div>
//         </div>
//       </FollowerPointerCard>
//     </div>
//   );
// }

// const blogContent = {
//   slug: "amazing-tailwindcss-grid-layouts",
//   author: "Manu Arora",
//   date: "28th March, 2023",
//   title: "Amazing Tailwindcss Grid Layout Examples",
//   description:
//     "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
//   image: "/demo/thumbnail.png",
//   authorAvatar: "/manu.png",
// };

// const TitleComponent = ({
//   title,
//   avatar,
// }: {
//   title: string;
//   avatar: string;
// }) => (
//   <div className="flex space-x-2 items-center">
//     <Image
//       src={avatar}
//       height="20"
//       width="20"
//       alt="thumbnail"
//       className="rounded-full border-2 border-white"
//     />
//     <p>{title}</p>
//   </div>
// );
