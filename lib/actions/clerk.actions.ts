"use server";

import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId, getUserById } from "./user.actions";
import { redirect } from "next/navigation";

interface fetchUserProps {
  userId?: string;
}

export async function fetchUserInfoData({ userId }: fetchUserProps = {}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const clerkId = user?.id;

  let userInfo;

  if (userId) {
    userInfo = await getUserById(userId);

    if (!userInfo._id) {
      userInfo = await getUserById(userId);
    }
  } else {
    userInfo = await getUserByClerkId(clerkId);

    if (!userInfo._id) {
      userInfo = await getUserByClerkId(clerkId);
    }
  }

  const userData = {
    userId: userInfo._id,
    username: userInfo.username || "",
    firstName: userInfo.firstName || "",
    bio: userInfo.bio || "",
    photoUrl: userInfo.photoUrl,
  };

  return { userInfo, userData, clerkId };
}
