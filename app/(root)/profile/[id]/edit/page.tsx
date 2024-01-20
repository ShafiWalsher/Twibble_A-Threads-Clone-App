import AccountProfile from "@/components/forms/AccountProfile";
import AccountProfileForm from "@/components/forms/AccountProfileForm";
import RippleLoading from "@/components/shared/Loading";
import { fetchUserInfoData } from "@/lib/utils";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { clerkId: currUserClerkId, userInfo } = await fetchUserInfoData({
    userId: params.id,
  });

  // console.log({ userInfo });

  if (!currUserClerkId) redirect("/"); // Type check for typescript

  const userData = {
    userId: userInfo._id,
    username: userInfo.username || "",
    firstName: userInfo.firstName || "",
    bio: userInfo.bio || "",
    photoUrl: userInfo.photoUrl,
  };

  return (
    <section className="h-full w-full flex flex-1 flex-col mt-6">
      <Suspense fallback={<RippleLoading />}>
        <AccountProfileForm
          user={userData}
          btnTitle="Save"
          type="ProfileUpdate"
        />
      </Suspense>
    </section>
  );
};

export default page;
