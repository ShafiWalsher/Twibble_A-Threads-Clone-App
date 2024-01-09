"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { menuItems } from "@/constants";
import Link from "next/link";
import { SignOutButton, SignedIn, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const HamMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/assets/icons/menu.svg"
          alt="menu"
          width={30}
          height={30}
          className={`object-contain cursor-pointer ${
            isOpen ? "filter brightness-[20]" : ""
          }`}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit mr-7 rounded-xl bg-dark-2 border-0">
        <div className="flex flex-col w-full">
          {menuItems.map((item, index) => (
            <>
              {item.value === "Logout" ? (
                <SignedIn>
                  <Link
                    onClick={() => signOut(() => router.push("/sign-in"))}
                    href={item.href}
                    key={index}
                    className="ham-menu_text"
                  >
                    Logout
                  </Link>
                </SignedIn>
              ) : (
                <Link href={item.href} key={index} className="ham-menu_text">
                  {item.value}
                </Link>
              )}

              <div className="m-0 p-0 last:h-0 h-0.5 bg-light-4/30 w-full" />
            </>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HamMenu;
