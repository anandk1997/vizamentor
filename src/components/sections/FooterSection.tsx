import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function FooterSection() {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between gap-8 ">
        <div>
          <p className="text-4xl  text-black-600 font-bold font-serif">
            VizaMentor
          </p>
          {/* <p className="text-lightGray mt-[1.19rem]">
            Book your trip in minute, get full Control for much longer.
          </p> */}
        </div>
        <div className="flex gap-8 flex-grow justify-between">
          {/* <div className="flex flex-col gap-4">
            <p className="text-lightBlack font-[700] text-[1.3125rem]">
              Company
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-lightGray text-[1.125rem] font-[500]">About</p>
              <p className="text-lightGray text-[1.125rem] font-[500]">
                Careers
              </p>
              <p className="text-lightGray text-[1.125rem] font-[500]">
                Mobile
              </p>
            </div>
          </div> */}
          <div className="flex flex-col gap-4">
            <p className="text-lightBlack font-[700] text-[1.3125rem]">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+919914961214"
                className="text-lightGray text-[1.125rem] font-[500]"
              >
                +91 99149-61214
              </a>
              <a
                href="tel:+916280434126"
                className="text-lightGray text-[1.125rem] font-[500]"
              >
                +91 62804-34126
              </a>

              <div className="flex gap-3">
                <Link href={"https://wa.me/6280434126"}>
                  <FaWhatsapp />
                </Link>{" "}
                <Link
                  href={
                    "https://www.instagram.com/viza_mentor?igsh=MTRwMmhobm52dnN0Mw=="
                  }
                >
                  <FaInstagram />
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/people/Viza-Mentor/61562695348540/?mibextid=ZbWKwL"
                  }
                >
                  <FaFacebook />
                </Link>
                <Link href={"https://www.youtube.com/@VizaMentorbyPriyanka"}>
                  <FaYoutube color="red" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/terms"
              className="text-lightBlack font-[700] text-[1.3125rem]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="text-lightBlack font-[700] text-[1.3125rem]"
            >
              Privacy Policy
            </Link>
          </div>
          {/* <div className="flex flex-col gap-4">
            <p className="text-lightBlack font-[700] text-[1.3125rem]">More</p>
            <div className="flex flex-col gap-2">
              <p className="text-lightGray text-[1.125rem] font-[500]">
                Airlinefees
              </p>
              <p className="text-lightGray text-[1.125rem] font-[500]">
                Airline
              </p>
              <p className="text-lightGray text-[1.125rem] font-[500]">
                Low fare tips
              </p>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4 items-center">
            {/* <img src="/images/facebook-icon.png" alt="social icon" />
            <img src="/images/instagram-icon.png" alt="social icon" />
            <img src="/images/x-icon.png" alt="social icon" /> */}
          </div>
          {/* <p className="text-lightGray font-[500] text-[1.25rem]">
            Discover our app
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-lightBlack rounded-extraLarge px-[1.06rem] py-[0.58rem] w-[11rem]">
              <div className="flex gap-4 items-center">
                <div>
                  <img
                    src="/images/google-play-icon.png"
                    alt="google play icon"
                  />
                </div>

                <div>
                  <p className="uppercase font-[700] text-white text-[0.7rem]">
                    get it on
                  </p>
                  <p className="uppercase font text-white text-[0.7rem]">
                    Google play
                  </p>
                </div>
              </div>
              <div></div>
            </div>
            <div className="bg-lightBlack rounded-extraLarge px-[1.06rem] py-[0.58rem] w-[14rem]">
              <div className="flex gap-4 items-center">
                <div>
                  <img src="/images/app-icon.png" alt="google play icon" />
                </div>

                <div>
                  <p className="uppercase font-[700] text-white text-[0.7rem]">
                    Available on the
                  </p>
                  <p className="uppercase font text-white text-[0.7rem]">
                    Apple store
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div> */}
        </div>
      </div>
      <p className="my-[5.25rem] text-lightGray text-[0.875rem] font-[600] flex justify-center">
        All rights reserved@vizamentor.co
      </p>
    </section>
  );
}

export default FooterSection;
