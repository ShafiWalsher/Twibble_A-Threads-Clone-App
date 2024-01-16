import ThreadCard from "@/components/cards/ThreadCard";
import PostThread from "@/components/forms/PostThread";
import LoadMore from "@/components/shared/LoadMore";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { IPost, UserInfoParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { postcss } from "tailwindcss";

export default async function Home() {
  const user = await currentUser();
  const clerkId = user?.id;
  const userInfo: UserInfoParams = await getUserByClerkId(clerkId);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // console.log({ userInfo });

  let page = 1;
  const result = await fetchPosts({ page });

  // console.log(result?.posts);

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
              />
            ))}
          </>
        )}
      </div>

      <LoadMore initialPosts={result?.posts} userId={userInfo._id} />
    </>
  );
}
