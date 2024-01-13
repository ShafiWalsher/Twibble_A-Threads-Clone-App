import { Inter } from "next/font/google";
import "../../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threads - Onboard",
  description: "A Next.js 14 Meta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`${inter.className} bg-dark-1 w-full flex justify-center items-center min-h-screen`}
    >
      {children}
    </main>
  );
}
