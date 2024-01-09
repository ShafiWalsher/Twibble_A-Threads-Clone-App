"use client";
import { menuLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";

const NavMenu = () => {
  const [followingToggle, setFollowingToggle] = useState("For You");
  const { userId } = useAuth();
  const pathName = usePathname();

  const handleSwitch = () => {
    if (followingToggle === "For You") {
      setFollowingToggle("Following");
    } else {
      setFollowingToggle("For You");
    }
  };
  return (
    <>
      <div className="md:flex hidden">
        {menuLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          if (link.route === "/profile") {
            link.route = `${link.route}/${userId})
                )}`;
          }
          return (
            <>
              {followingToggle === "For You" &&
              link.label === "Home For You" ? (
                <Link
                  href={link.route}
                  key={link.label}
                  className="leftsidebar_link"
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
              ) : followingToggle === "Following" &&
                link.label === "Home Following" ? (
                <Link
                  href={link.route}
                  key={link.label}
                  className="leftsidebar_link"
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
              ) : link.route === "/create-thread" ? (
                // <CreateThread link={link} isActive={isActive} />
                // <PostThread
                //   userId={userId}
                //   user={user}
                //   link={link}
                //   isActive={isActive}
                // />
                <div></div>
              ) : (
                link.label !== "Home For You" &&
                link.label !== "Home Following" && (
                  <Link
                    href={link.route}
                    key={link.label}
                    className="leftsidebar_link"
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
                )
              )}
            </>
          );
        })}
      </div>
      {pathName === "/" && (
        <div className="absolute bottom-10 -left-10 z-50">
          <Button onClick={handleSwitch} className="special-btn ">
            <p>{followingToggle}</p>
            <Image
              src="/assets/icons/switch.svg"
              alt="switch"
              width={20}
              height={20}
              className="object-contain"
            />
          </Button>
        </div>
      )}
    </>
  );
};

export default NavMenu;
