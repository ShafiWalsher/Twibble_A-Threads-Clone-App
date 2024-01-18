"use client";
import { profilePictures, threadInteractIcons } from "@/constants";
import { formatPostCreationTime } from "@/lib/utils";
import { ThreadCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CarouselCard from "./CarouselCard";
import { Suspense } from "react";
import LazyLoading from "../shared/LazyLoading";
import AddComment from "../shared/AddComment";
import { useRouter } from "next/navigation";

// import DeleteThread from "../forms/DeleteThread";

function ThreadCard({
  postId,
  currentUserId,
  parentId,
  content,
  attachments,
  author,
  createdAt,
  comments,
  isComment,
  from,
  userData,
}: ThreadCardProps) {
  const totalReplies: number = 221;
  const totalLikes: number = 3251;

  const router = useRouter();
  const handleDivClick = () => {
    router.push(`/thread/${postId}`);
  };

  return (
    <div
      className={`flex w-full h-full flex-col *:bg-transparent py-3 ${
        from === "ThreadPage" ? "border-none" : "border-t border-t-gray-1/30"
      }`}
    >
      {from === "ThreadPage" ? (
        <>
          {/* THE CONTENT THREAD PAGE */}
          <div className="flex flex-col items-start justify-between">
            <div className="flex w-full flex-row gap-3">
              {/* User Profile */}
              <div className="flex items-center justify-center">
                <Link
                  href={`/profile/${author.id}`}
                  className="relative h-9 w-9"
                >
                  <Image
                    src={author?.photoUrl || ""}
                    alt="user profile"
                    fill
                    className="cursor-pointer rounded-full"
                  />
                  <Image
                    src="/assets/icons/plus.svg"
                    alt="plus icon"
                    width={22}
                    height={22}
                    className="object-contain absolute -bottom-1 -right-1"
                  />
                </Link>
              </div>

              {/* Username Posted Time And More Options */}
              <div className="w-full flex justify-between items-center">
                {/* Username */}
                <div className="flex items-center">
                  <Link href={`/profile/${author.id}`} className="w-fit">
                    <h4 className="cursor-pointer text-base-semibold text-light-1 hover:underline">
                      {author.username}
                    </h4>
                  </Link>
                </div>
                {/* Time and More Options */}
                <div className="flex gap-1 items-center">
                  <p className="text-gray-1 text-base-medium">
                    {formatPostCreationTime(createdAt)}
                  </p>
                  <div className="relative h-5 w-5 px-2 py-1 rounded-full hover:bg-dark-4">
                    <Image
                      src="/assets/icons/menu-dots-gray.svg"
                      alt="menu"
                      fill
                      className="object-contain cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thread Content */}
            <div className="w-full">
              {attachments && attachments.length > 0 ? (
                <div className="w-full mt-2">
                  <p className="w-full  text-small-regular text-pretty break-all text-light-2 cursor-text">
                    {content}
                  </p>
                  <div className="my-3">
                    <Suspense fallback={<LazyLoading />}>
                      <CarouselCard attachments={attachments} />
                    </Suspense>
                  </div>
                </div>
              ) : (
                <p className="w-full mt-2 text-small-regular text-light-2 cursor-text">
                  {content}
                </p>
              )}
            </div>

            {/* Interact Icons */}
            <div className="mt-1 flex flex-col relative">
              <div className="flex gap-1 -ml-[7px]">
                {/* Thread Interact Icons */}
                {threadInteractIcons.map((image) => (
                  <div
                    key={image.label}
                    className="h-9 w-9 rounded-full hover:bg-dark-4 flex items-center justify-center"
                  >
                    <div className="h-full w-full flex justify-center items-center">
                      {image.label === "reply" ? (
                        <>
                          <AddComment
                            imgSrc={image.src}
                            imgLabel={image.label}
                            userData={userData}
                            postId={postId}
                            content={content}
                            attachments={attachments}
                            author={author}
                            parentId={parentId}
                            createdAt={createdAt}
                          />
                        </>
                      ) : (
                        <Image
                          src={image.src}
                          alt={image.label}
                          width={22}
                          height={22}
                          className="cursor-pointer object-contain"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {isComment && (comments?.length ?? 0) > 0 && (
                <Link href={`/thread/${postId}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments?.length} repl
                    {(comments?.length ?? 0) > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>

          {/* Replies and Likes */}
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Link href={`/thread/${postId}`}>
                  <p className="mt-1 text-small-medium text-gray-1 hover:underline">
                    {comments?.length} Repl
                    {(comments?.length ?? 0) > 1 ? "ies" : "y"}
                  </p>
                </Link>
                <div className="h-1 w-1 bg-gray-1 mt-1 rounded-full" />
                <Link href="">
                  <p className="mt-1 text-small-medium text-gray-1 hover:underline">
                    {totalLikes} Lik
                    {(totalLikes ?? 0) > 1 ? "es" : "e"}
                    {totalLikes > 0}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* THE CONTENT HOME PAGE */}
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-3">
              <div className="flex flex-col items-center">
                {/* User Profile */}
                <Link
                  href={`/profile/${author.id}`}
                  className="relative h-9 w-9"
                >
                  <Image
                    src={author?.photoUrl || ""}
                    alt="user profile"
                    fill
                    className="cursor-pointer rounded-full"
                  />
                  <Image
                    src="/assets/icons/plus.svg"
                    alt="plus icon"
                    width={22}
                    height={22}
                    className="object-contain absolute -bottom-1 -right-1"
                  />
                </Link>

                <div className="thread-card_bar" />
              </div>

              <div className="flex flex-col w-full">
                {/* Clickable Div */}
                {/* Username, Posted TimeStamp and More Option*/}
                <div
                  onClick={handleDivClick}
                  className="flex w-full flex-col cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    {/* Username */}
                    <div className="flex items-center">
                      <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-1 hover:underline">
                          {author.username}
                        </h4>
                      </Link>
                    </div>
                    {/* Time and More Options */}
                    <div className="flex gap-1 items-center">
                      <p className="text-gray-1 text-base-medium">
                        {formatPostCreationTime(createdAt)}
                      </p>
                      <div className="relative h-5 w-5 px-2 py-1 rounded-full hover:bg-dark-4">
                        <Image
                          src="/assets/icons/menu-dots-gray.svg"
                          alt="menu"
                          fill
                          className="object-contain cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thread Content */}
                  <div className="w-full">
                    {attachments && attachments.length > 0 ? (
                      <div className="w-full mt-2">
                        <p className="w-full  text-small-regular text-pretty break-all text-light-2">
                          {content}
                        </p>
                        <div className="my-3">
                          <Suspense fallback={<LazyLoading />}>
                            <CarouselCard attachments={attachments} />
                          </Suspense>
                        </div>
                      </div>
                    ) : (
                      <p className="w-full mt-2 text-small-regular text-light-2">
                        {content}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interact Icons */}
                <div className="mt-1 flex flex-col relative">
                  <div className="flex gap-1 -ml-[7px]">
                    {/* Thread Interact Icons */}
                    {threadInteractIcons.map((image) => (
                      <div
                        key={image.label}
                        className="h-9 w-9 rounded-full hover:bg-dark-4 flex items-center justify-center"
                      >
                        <div className="h-full w-full flex justify-center items-center">
                          {image.label === "reply" ? (
                            <>
                              <AddComment
                                imgSrc={image.src}
                                imgLabel={image.label}
                                userData={userData}
                                postId={postId}
                                content={content}
                                attachments={attachments}
                                author={author}
                                parentId={parentId}
                                createdAt={createdAt}
                              />
                            </>
                          ) : (
                            <Image
                              src={image.src}
                              alt={image.label}
                              width={22}
                              height={22}
                              className="cursor-pointer object-contain"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {isComment && (comments?.length ?? 0) > 0 && (
                    <Link href={`/thread/${postId}`}>
                      <p className="mt-1 text-subtle-medium text-gray-1">
                        {comments?.length} repl
                        {(comments?.length ?? 0) > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* <DeleteThread
          threadId={JSON.stringify(postId)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
          </div>

          {/* Replies and Likes */}
          <div className="flex items-center justify-start pt-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="flex -space-x-3 overflow-hidden">
                {/* followers Icon */}
                {!isComment && (comments?.length ?? 0) > 0 && (
                  <>
                    {comments?.slice(0, 2).map((comment, index) => (
                      <div key={index} className="relative w-5 h-5">
                        <Link href="">
                          <Image
                            key={index}
                            className="border-2 border-dark-1 rounded-full object-contain"
                            src={comment?.author?.photoUrl || ""}
                            alt={`user_${index}`}
                            fill
                          />
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/thread/${postId}`}>
                  <p className="mt-1 text-small-medium text-gray-1 hover:underline">
                    {comments?.length} Repl
                    {(comments?.length ?? 0) > 1 ? "ies" : "y"}
                  </p>
                </Link>
                <div className="h-1 w-1 bg-gray-1 mt-1 rounded-full" />
                <Link href="">
                  <p className="mt-1 text-small-medium text-gray-1 hover:underline">
                    {totalLikes} Lik
                    {(totalLikes ?? 0) > 1 ? "es" : "e"}
                    {totalLikes > 0}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ThreadCard;
