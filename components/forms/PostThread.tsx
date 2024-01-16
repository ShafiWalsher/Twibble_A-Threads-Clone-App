"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createThread } from "@/lib/actions/thread.actions";
import { Button } from "../ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import AttachmentUploader from "../shared/AttachmentUploader";
import NewThreadForm from "./NewThreadForm";

interface Props {
  userInfo: {
    _id: string;
    username: string;
    photoUrl?: string;
  };
}

const PostThread = ({ userInfo }: Props) => {
  const userData = {
    userId: userInfo._id,
    username: userInfo.username,
    photoUrl: userInfo.photoUrl || "",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex items-center justify-center px-3 py-2 gap-2 mb-2">
          <div className="relative h-9 w-9 rounded-full">
            <Image
              src={userInfo?.photoUrl ?? ""}
              alt="profile pic"
              fill
              className="objecti-contain rounded-full"
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
      </DialogTrigger>
      <NewThreadForm userData={userData} />
    </Dialog>
  );
};

export default PostThread;
