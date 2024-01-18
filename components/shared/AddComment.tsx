"use client";
import AddCommentForm from "../forms/AddCommentForm";
import { AddCommentParams } from "@/types";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { useState } from "react";

const AddComment = ({
  postId,
  parentId,
  content,
  attachments,
  author,
  createdAt,
  imgSrc,
  imgLabel,
  userData,
}: AddCommentParams) => {
  const postData = {
    postId: postId,
    content: content,
    attachments: attachments,
    author: author,
    createdAt: createdAt,
  };

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image
          src={imgSrc || ""}
          alt={imgLabel || ""}
          width={22}
          height={22}
          className="cursor-pointer object-contain"
        />
      </DialogTrigger>
      <AddCommentForm
        userData={userData}
        parentId={parentId}
        postData={postData}
        setOpen={setOpen}
      />
    </Dialog>
  );
};

export default AddComment;
