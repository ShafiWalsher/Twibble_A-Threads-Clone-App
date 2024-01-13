import ThreadCard from "@/components/cards/ThreadCard";
import CreateThread from "@/components/forms/CreateThread";
import LoadMore from "@/components/shared/LoadMore";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { getUserByClerkId, getUserById } from "@/lib/actions/user.actions";
import { IFetchPostsResult, IPost, UserInfoParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const clerkId = user?.id;
  const userInfo: UserInfoParams = await getUserByClerkId(clerkId);

  if (!userInfo?.onboarded) redirect("/onboarding");

  console.log({ userInfo });

  let page = 1;
  const result = await fetchPosts({ page });

  // console.log(result);
  // console.log(result?.posts.map((item) => item.author));
  return (
    <>
      <div className="w-full flex items-center justify-center px-3 py-2 gap-2 mb-2">
        <div className="relative h-9 w-9">
          <Image
            src={userInfo?.photoUrl ?? ""}
            alt="profile pic"
            fill
            className="objecti-contain"
          />
        </div>
        <div className="flex-1 w-full">
          <span className="text-gray-1 text-base-regular">
            Start a thread...
          </span>
        </div>
        <div className="">
          <Button className="text-dark-1 text-base-semibold  py-3 px-4 rounded-full cursor-not-allowed bg-light-1/30 hover:bg-light-1/30">
            Post
          </Button>
        </div>
      </div>

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
                author={post.author}
                createdAt={post.createdAt}
                comments={post.comments}
              />
            ))}
          </>
        )}
      </div>

      <LoadMore initialPosts={result?.posts} userId={userInfo._id} />
    </>
  );
}
