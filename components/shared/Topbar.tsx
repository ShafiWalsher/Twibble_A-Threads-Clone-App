// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import HamMenu from "./HamMenu";
// import NavMenu from "./NavMenu";
// import { fetchUserInfoData } from "@/lib/actions/clerk.actions";

// const Topbar = async () => {
//   const { userData } = await fetchUserInfoData();

//   return (
//     <section className="flex justify-center items-center">
//       <nav className="topbar">
//         <Link href="/">
//           <Image
//             src="/assets/logo/logo-icon-white.svg"
//             alt="logo"
//             width={30}
//             height={30}
//             className="object-contain"
//           />
//         </Link>
//         <NavMenu userData={userData} from="Topbar" />
//         <HamMenu />
//       </nav>
//     </section>
//   );
// };

// export default Topbar;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import HamMenu from "./HamMenu";
import NavMenu from "./NavMenu";
import { fetchUserInfoData } from "@/lib/actions/clerk.actions";

const Topbar = async () => {
  try {
    const { userData } = await fetchUserInfoData();

    if (!userData) {
      // Handle the case where user data is not available (deleted user, etc.)
      return null;
    }

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
  } catch (error) {
    console.error("Error fetching user data in Topbar:", error);
    // Handle the error as needed
    return null;
  }
};

export default Topbar;
