import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Threads - Clone",
  description: "A Next.js 14 Meta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>
        <div className="w-full flex justify-center items-center min-h-screen bg-hero-pattern bg-contain bg-no-repeat">
          {children}
        </div>
      </body>
    </html>
  );
}
