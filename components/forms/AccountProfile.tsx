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
  userId: string;
  username: string;
  firstName: string;
  bio: string;
  photoUrl: string;
}

const AccountProfile = ({ btnTitle, type }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { userData } = await fetchUserInfoData();
      setUserData(userData);
      setLoading(false); // Set loading to false on successful data fetch
    } catch (error) {
      console.error("Error fetching user data:", error);
      // You can add more specific error handling if needed
      // For now, just set loading to false in case of an error

      // Retry the fetch after a delay (e.g., 1 second)
      setTimeout(fetchData, 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  if (loading) {
    return <RippleLoading />;
  }
  return (
    <section
      className={`${
        type === "ProfileUpdate" ? "bg-transparent" : "bg-dark-2"
      }  rounded-xl h-full w-full flex items-center justify-center`}
    >
      <Suspense fallback={<RippleLoading />}>
        {!loading && userData && (
          <AccountProfileForm user={userData} btnTitle={btnTitle} type={type} />
        )}
      </Suspense>
    </section>
  );
};

export default AccountProfile;
