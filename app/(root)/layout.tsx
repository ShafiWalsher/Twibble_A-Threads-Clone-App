import type { Metadata } from "next";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata: Metadata = {
  title: "Twibble - A Threads Clone",
  description: "A Next.js 14 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl relative mx-auto flex h-screen flex-col">
      <Topbar />
      <main className="flex-1">{children}</main>
      <Bottombar />
    </div>
  );
}
