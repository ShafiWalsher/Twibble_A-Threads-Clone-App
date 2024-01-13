import { profilePictures, threatInteractIcons } from "@/constants";
import { formatPostCreationTime } from "@/lib/utils";
import { ThreadCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

// import DeleteThread from "../forms/DeleteThread";

function ThreadCard({
  postId,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
}: ThreadCardProps) {
  const totalReplies: number = 221;
  const totalLikes: number = 3251;

  return (
    <div
      className={`flex w-full h-full flex-col border-t border-t-gray-1/50 ${
        isComment ? "px-0 xs:px-7" : "bg-transparent px-3 py-3"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-3 ">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-9 w-9">
              <Image
                src={author?.photoUrl || ""}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
              <Image
                src="/assets/icons/plus.svg"
                alt="user_community_image"
                width={22}
                height={22}
                className="object-contain absolute -bottom-1 -right-1"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1 hover:underline">
                {author.username}
              </h4>
            </Link>

            {/* Thread Content */}
            <p className=" mt-2 text-small-regular text-light-2 cursor-text">
              {content}
            </p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex">
                {/* Thread Interact Icons */}
                {threatInteractIcons.map((image) => (
                  <div
                    key={image.label}
                    className="h-9 w-9 rounded-full hover:bg-dark-4 flex items-center justify-center"
                  >
                    <div className="h-full w-full flex justify-center items-center">
                      <Image
                        src={image.src}
                        alt={image.label}
                        width={20}
                        height={20}
                        className=" cursor-pointer object-contain"
                      />
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
        <div className="text-light-1">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-gray-1 text-base-medium">
              {formatPostCreationTime(createdAt)}
            </p>
            <Image
              src="/assets/icons/menu-dots.svg"
              alt="menu"
              width={14}
              height={14}
              className="object-contain"
            />
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
      <div className="flex items-center justify-start pt-2">
        <div className="flex items-center gap-2">
          <span className="flex -space-x-3 overflow-hidden">
            {/* followers Icon */}
            {profilePictures
              .map((image, index) => (
                <div key={index} className="relative w-5 h-5">
                  <Link href="">
                    <Image
                      className="border-2 border-dark-1 rounded-full object-contain"
                      src={image.src}
                      alt={image.label}
                      fill
                    />
                  </Link>
                </div>
              ))
              .slice(0, 2)}
          </span>
          <div className="flex items-center gap-2">
            <Link href="">
              <p className="mt-1 text-small-medium text-gray-1 hover:underline">
                {totalReplies} repl
                {(totalReplies ?? 0) > 1 ? "ies" : "y"}
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

      {!isComment && (comments?.length ?? 0) > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments?.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment?.author?.photoUrl || ""}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${postId}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments?.length} repl
              {(comments?.length ?? 0) > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ThreadCard;
