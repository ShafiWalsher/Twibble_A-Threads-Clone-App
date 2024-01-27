"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { menuItems } from "@/constants";
import Link from "next/link";
import { SignedIn, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const HamMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <div className="hidden md:inline-block">
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
          <SignedIn>
            <div className="flex flex-col w-full">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.value === "Logout" ? (
                    <Link
                      onClick={() => signOut(() => router.push("/sign-in"))}
                      href={item.href}
                      key={index}
                      className="ham-menu_link"
                    >
                      <p className="ham-menu_link-text border-none">Logout</p>
                    </Link>
                  ) : item.value === "GitHub" ? (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.href}
                      key={index}
                      className="ham-menu_link"
                    >
                      <p className="ham-menu_link-text">{item.value}</p>
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      key={index}
                      className="ham-menu_link"
                    >
                      <p className="ham-menu_link-text">{item.value}</p>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </SignedIn>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HamMenu;
