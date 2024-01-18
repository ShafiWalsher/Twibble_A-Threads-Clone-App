import ThreadCard from "@/components/cards/ThreadCard";
import PostThread from "@/components/forms/PostThread";
import LoadMore from "@/components/shared/LoadMore";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUserInfoData } from "@/lib/utils";
import { IPost } from "@/types";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userInfo, userData } = await fetchUserInfoData();

  if (!userInfo?.onboarded) redirect("/onboarding");

  let page = 1;
  const result = await fetchPosts({ page });

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
