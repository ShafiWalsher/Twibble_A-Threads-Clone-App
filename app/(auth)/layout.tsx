import { Inter } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";

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
    <div className={`${inter.className} bg-dark-1`}>
      <main className="w-full flex justify-center items-center min-h-screen bg-hero-pattern bg-contain bg-no-repeat">
        {children}
      </main>
    </div>
  );
}
