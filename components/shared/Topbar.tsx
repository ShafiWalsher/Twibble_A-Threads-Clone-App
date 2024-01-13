import Image from "next/image";
import Link from "next/link";
import React from "react";
import HamMenu from "./HamMenu";
import NavMenu from "./NavMenu";
import { auth, currentUser } from "@clerk/nextjs";
import { getUserByClerkId, getUserById } from "@/lib/actions/user.actions";

const Topbar = async () => {
  const user = await currentUser();
  const clerkId = user?.id;
  const userInfo = await getUserByClerkId(clerkId);

  // const { sessionClaims } = auth();
  // const userId = sessionClaims?.userId as string;
  // const userInfo = await getUserById(userId);

  const userData = {
    userId: userInfo?._id,
    username: userInfo?.username || "",
    photoUrl: userInfo?.photoUrl,
  };

  return (
    <section className="flex justify-center items-center">
      <nav className="topbar">
        <Link href="/">
          <Image
            src="/assets/logo/logo-icon-white.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </Link>
        <NavMenu userData={userData} from="Topbar" />
        <HamMenu />
      </nav>
    </section>
  );
};

export default Topbar;
