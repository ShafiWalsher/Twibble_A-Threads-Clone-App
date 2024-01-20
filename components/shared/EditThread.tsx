"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { IUser } from "@/lib/database/models/user.model";
import EditThreadForm from "../forms/EditThreadForm";

interface Props {
  parentId: string | null;
  postData: {
    postId: string;
    content: string;
    attachments?: string[];
    author: IUser;
    createdAt: Date;
    currentUserId: string;
    isComment?: boolean;
  };
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
}

const EditThread = ({ parentId, userData, postData }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="thread-card-popover_item">Edit</p>
      </DialogTrigger>
      <EditThreadForm
        userData={userData}
        parentId={parentId}
        postData={postData}
        open={open}
        setOpen={setOpen}
      />
    </Dialog>
  );
};

export default EditThread;
