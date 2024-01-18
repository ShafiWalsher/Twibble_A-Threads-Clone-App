import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

// import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { getUserByClerkId } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { IPost, UserInfoParams } from "@/types";
import { fetchUserInfoData } from "@/lib/utils";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const { userInfo, userData } = await fetchUserInfoData();

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  console.log(thread.comments);

  return (
    <section className="w-full pb-10">
      <div className="flex flex-col">
        <div className="mt-2">
          <ThreadCard
            key={thread._id}
            postId={thread._id}
            currentUserId={userInfo._id}
            parentId={thread.parentId || ""}
            content={thread.thread_text}
            attachments={thread.attachments}
            author={thread.author}
            createdAt={thread.createdAt}
            comments={thread.comments}
            from="ThreadPage"
            userData={userData}
          />
        </div>
        <div className="mb-10">
          {thread.comments.map((thread: IPost) => (
            <ThreadCard
              key={thread._id}
              postId={thread._id}
              currentUserId={userInfo._id}
              parentId={thread.parentId || ""}
              content={thread.thread_text}
              attachments={thread.attachments}
              author={thread.author}
              createdAt={thread.createdAt}
              comments={thread.comments}
              userData={userData}
              isComment
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default page;
