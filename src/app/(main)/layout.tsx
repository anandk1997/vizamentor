import type { Metadata } from "next";
import NavBar from "@/components/common/NavBar";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "VizaMentor",
  description: "",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative poppins  md:px-[9rem]">
        <NavBar />
        <div className="px-4 flex flex-col gap-[7.69rem]">
          {children}
          <FooterSection />
        </div>
      </main>
    </>
  );
}
