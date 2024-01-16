"use client";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PropagateLoader from "react-spinners/PropagateLoader";
import ThreadCard from "../cards/ThreadCard";

interface LoadMoreProps {
  initialPosts: IPost[];
  userId: string; // Assuming initialPosts is an array of IPost
}

const LoadMore = ({ initialPosts, userId }: LoadMoreProps) => {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [isNext, setIsNext] = useState<boolean | undefined>(true);

  async function loadMorePosts() {
    const next = page + 1;
    const data = await fetchPosts({ page: next });
    setPage(next);
    setIsNext(data?.isNext);
    setPosts((prev) => [...(prev?.length ? prev : []), ...data?.posts]);
    // console.log(posts);
  }

  useEffect(() => {
    if (inView && isNext) {
      loadMorePosts();
    }

    return () => {};
  }, [inView]);

  return (
    <>
      <div className="flex items-center justify-center flex-col w-full ">
        {posts?.length > 0 && (
          <>
            {posts?.map((post: IPost) => (
              <ThreadCard
                key={post._id}
                postId={post._id}
                currentUserId={userId}
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
      {isNext ? (
        <div className="p-2 m-2 w-full flex items-center justify-center">
          <div ref={ref} className="py-10">
            <PropagateLoader color="#4d4d4d" size={10} />
          </div>
        </div>
      ) : (
        <div className="p-2 m-2 w-full flex items-center justify-center">
          <p className="py-10 text-gray-1 text-base-semibold">
            Peoples are still adding their thoughts!
          </p>
        </div>
      )}
    </>
  );
};

export default LoadMore;
