import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { FaAngleDoubleDown, FaCaretDown } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="w-full h-20 bg-[#FFCC00] sticky top-0">
        <div className="px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white items-center">
              <li className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex justify-center items-center gap-3 bg-white rounded-lg shadow-[-6.0px_8.0px_8.0px_black] text-black text-xl font-bold py-2 px-4 focus-visible:outline-none">
                    Courses
                    <FaAngleDoubleDown className="text-xl cursor-pointer" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Visa Apply</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Immigration</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Consultancy</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Team</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Subscription</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <Link className="font-bold text-xl text-black" href="/about">
                  Our Story
                </Link>
              </li>

              <li>
                <Link className="font-bold text-xl text-black" href="/services">
                  Mentors
                </Link>
              </li>

              <li>
                <Link className="font-bold text-xl text-black" href="/services">
                  Services
                </Link>
              </li>
            </ul>

            <h2 className="font-bold text-2xl font-mono">VIZA MENTOR</h2>

            <ul className="hidden md:flex gap-x-6 text-white items-center">
              <li>
                <Link className="font-bold text-xl text-black" href="/services">
                  Enroll Now
                </Link>
              </li>

              <li className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex justify-center items-center gap-3 bg-white rounded-lg shadow-[-6.0px_8.0px_8.0px_black] text-black text-xl font-bold py-2 px-4 focus-visible:outline-none">
                    Join The Community
                    <FaCaretDown className="text-xl cursor-pointer" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Slack</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Linkedin</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
            {/* <Button /> */}
          </div>
        </div>
      </div>
    </>
  );
}
