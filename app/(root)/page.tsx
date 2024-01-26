import ThreadCard from "@/components/cards/ThreadCard";
import PostThread from "@/components/forms/PostThread";
import LoadMore from "@/components/shared/LoadMore";
import { fetchUserInfoData } from "@/lib/actions/clerk.actions";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { IPost } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const clerkId = user?.id;

  // const userInfo = await getUserByClerkId(clerkId);

  let userInfo: IUser;
  userInfo = await getUserByClerkId(clerkId);
  if (!userInfo) {
    userInfo = await getUserByClerkId(clerkId);
  }

  // console.log(userInfo?.onboarded);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    userId: userInfo?._id || "",
    username: userInfo?.username || "",
    firstName: userInfo?.firstName || "",
    bio: userInfo?.bio || "",
    photoUrl: userInfo?.photoUrl || "",
  };

  let page = 1;
  const result = await fetchPosts({ page });

  // result?.posts.map((post: IPost) => console.log(post.comments?.length));

  return (
    <>
      <PostThread userInfo={userInfo} />
      <div className="flex items-center justify-center flex-col w-full ">
        {result?.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result?.posts.map((post: IPost) => (
              <ThreadCard
                key={post._id}
                postId={post._id}
                currentUserId={userInfo._id}
                parentId={post.parentId || ""}
                content={post.thread_text}
                attachments={post.attachments}
                author={post.author}
                createdAt={post.createdAt}
                comments={post.comments}
                userData={userData}
              />
            ))}
          </>
        )}
      </div>

      {result?.isNext ? (
        <LoadMore
          userData={userData}
          initialPosts={result?.posts}
          userId={userInfo._id}
        />
      ) : (
        <div className="p-2 m-2 w-full flex items-center justify-center">
          <p className="py-10 text-gray-1 text-base-semibold">
            Peoples are still adding their thoughts!
          </p>
        </div>
      )}
    </>
  );
}
