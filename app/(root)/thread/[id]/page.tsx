import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { IPost } from "@/types";
import { fetchUserInfoData } from "@/lib/actions/clerk.actions";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const { userInfo, userData } = await fetchUserInfoData();

  const thread = await fetchThreadById(params.id);

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
