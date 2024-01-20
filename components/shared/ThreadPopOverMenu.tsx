import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { threadCardMenuItems, threadCardMenuItems_User } from "@/constants";
import React from "react";
import DeleteThread from "./DeleteThread";

interface Props {
  currentUserId: string;
  threadAuthorId: string;
  postId: string;
  parentId: string | null;
}

const ThreadPopOverMenu = ({
  currentUserId,
  threadAuthorId,
  postId,
  parentId,
}: Props) => {
  return (
    <div className="px-2 rounded-full hover:bg-dark-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="bg-transparent hover:bg-transparent m-0 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/assets/icons/menu-dots-white.svg"
              alt="menu"
              width={20}
              height={20}
              className="object-contain cursor-pointer bg-transparent"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="thread-card-popover"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center w-full rounded-xl">
            <div className="text-light-1 py-2 flex flex-col gap-1 text-base-bold w-full">
              {currentUserId === threadAuthorId ? (
                <>
                  {threadCardMenuItems_User.map((item) => (
                    <React.Fragment key={item.key}>
                      {item.key === "delete" ? (
                        <DeleteThread
                          key={item.key}
                          threadId={postId}
                          parentId={parentId}
                          isComment
                        />
                      ) : (
                        <p className="thread-card-popover_item">{item.value}</p>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  {threadCardMenuItems.map((item) => (
                    <p
                      key={item.key}
                      className={`${
                        item.key === "block" || item.key === "report"
                          ? "text-red-600 thread-card-popover_item"
                          : "thread-card-popover_item"
                      }`}
                    >
                      {item.value}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThreadPopOverMenu;
