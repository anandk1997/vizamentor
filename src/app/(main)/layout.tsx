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
      <main className="relative poppins">
        <NavBar />
        <div className="container px-4 md:px-8 lg:px-12 flex flex-col gap-16 md:gap-20 pt-24">
          {children}
          <FooterSection />
        </div>
      </main>
    </>
  );
}
