import type { Metadata } from "next";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import { Suspense } from "react";
import Loading from "@/components/shared/Load";

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
    <div className="flex w-full h-screen flex-col relative">
      <Suspense fallback={<Loading />}>
        <Topbar />
        <main className="main-container">{children}</main>
        <Bottombar />
      </Suspense>
    </div>
  );
}
