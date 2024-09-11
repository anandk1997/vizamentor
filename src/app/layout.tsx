import type { Metadata } from "next";
import { Poppins, Volkhov } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/providers/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "VizaMentor",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={[poppins.className, volkhov.className].toString()}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
