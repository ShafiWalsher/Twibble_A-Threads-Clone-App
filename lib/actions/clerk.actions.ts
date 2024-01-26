"use server";

import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId, getUserById } from "./user.actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface fetchUserProps {
  userId?: string;
  path?: string;
}

export async function fetchUserInfoData({ userId, path }: fetchUserProps = {}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const clerkId = user?.id;

  let userInfo;

  if (userId) {
    userInfo = await getUserById(userId);

    if (!userInfo) {
      userInfo = await getUserById(userId);
    }
  } else {
    userInfo = await getUserByClerkId(clerkId);

    if (!userInfo) {
      userInfo = await getUserByClerkId(clerkId);
    }
  }

  revalidatePath(path || "/");

  const userData = {
    userId: userInfo._id,
    username: userInfo.username || "",
    firstName: userInfo.firstName || "",
    bio: userInfo.bio || "",
    photoUrl: userInfo.photoUrl,
  };
  revalidatePath(path || "/");

  return { userInfo, userData, clerkId };
}
