"use client";
import { menuLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateThread from "../forms/CreateThread";
import React from "react";

interface Props {
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  from: "Topbar" | "Bottombar";
}

const NavMenu = ({ userData, from }: Props) => {
  const pathName = usePathname();
  return (
    <div
      className={`${from === "Topbar" ? "md:flex hidden" : "md:hidden flex"}`}
    >
      {menuLinks.map((link) => {
        const isActive =
          (pathName.includes(link.route) && link.route.length > 1) ||
          pathName === link.route;

        if (link.route === "/profile") {
          link.route = `${link.route}/${userData.userId}`;
        }
        return (
          <React.Fragment key={link.label}>
            {link.route === "/create-thread" ? (
              <CreateThread
                key={link.label}
                link={link}
                isActive={isActive}
                userData={userData}
                from={from}
              />
            ) : (
              <Link
                href={link.route}
                key={link.label}
                className={`${
                  from === "Topbar" ? "topbar_link" : "bottombar_link"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  title={link.label}
                  className={`${isActive && "filter brightness-[20]"}`}
                />
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NavMenu;
