import Image from "next/image";
import Link from "next/link";
import React from "react";
import HamMenu from "./HamMenu";
import NavMenu from "./NavMenu";

const Topbar = () => {
  return (
    <div className="flex justify-between py-4">
      <div>
        <Link href="/">
          <Image
            src="/assets/logo/logo-icon-white.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </Link>
      </div>
      <div>
        <NavMenu />
      </div>
      <div>
        <HamMenu />
      </div>
    </div>
  );
};

export default Topbar;
