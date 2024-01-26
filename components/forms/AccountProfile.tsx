"use client";
import AccountProfileForm from "./AccountProfileForm";
import RippleLoading from "../shared/Loading";
import { Suspense, useEffect, useState } from "react";
import { fetchUserInfoData } from "@/lib/actions/clerk.actions";

interface Props {
  btnTitle: "Continue" | "Save";
  type: "OnboardingUpdate" | "ProfileUpdate";
}

// Define the type for your user data
interface UserData {
  userId: any;
  username: any;
  firstName: any;
  bio: any;
  photoUrl: any;
}

const AccountProfile = ({ btnTitle, type }: Props) => {
  // Set initial state to null and explicitly provide the type
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userData } = await fetchUserInfoData();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  if (!userData) {
    // Render loading state or return null
    return <RippleLoading />;
  }

  return (
    <section
      className={`${
        type === "ProfileUpdate" ? "bg-transparent" : "bg-dark-2"
      }  p-6 rounded-xl h-full w-full flex items-center justify-center`}
    >
      <Suspense fallback={<RippleLoading />}>
        <AccountProfileForm user={userData} btnTitle={btnTitle} type={type} />
      </Suspense>
    </section>
  );
};

export default AccountProfile;
