"use client";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props {
  threadId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({ threadId, parentId, isComment }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteThread(threadId, pathname);
    if (!parentId || !isComment) {
      router.push("/");
    }
    setIsDeleting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p className="thread-card-popover_item text-red-500 flex justify-start">
          Delete
        </p>
      </DialogTrigger>
      <DialogContent className="delete-dialog-content">
        <div className="h-full w-full flex flex-col justify-between items-center">
          <div className="flex flex-col items-center gap-4 py-6 px-4">
            <p className="text-light-1 text-base-bold">Delete Thread?</p>
            <p className="text-gray-1 text-center">
              If you delete this thread, you won't be able to restore it.
            </p>
          </div>
          <div className="flex justify-between w-full items-center border-t border-t-gray-1/30">
            <Button
              onClick={() => setOpen(false)}
              className="delete-dialog-content_btn"
            >
              Cancel
            </Button>
            <div className="h-full bg-gray-1/30 w-[1px]" />
            <Button
              onClick={handleDelete}
              className="delete-dialog-content_btn text-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteThread;
