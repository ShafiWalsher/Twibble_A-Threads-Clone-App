"use client";
import { usePathname, useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { deleteUser } from "@/lib/actions/user.actions";
import { useClerk } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

function DeleteAccount({ userId }: { userId: string }) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const [open, setOpen] = useState(false);

  // Handle UserDelete
  const handleDelete = async () => {
    setIsDeleting(true);
    const deletedUser = await deleteUser(userId);

    setIsDeleting(false);
    setOpen(false);
    if (deletedUser) {
      console.log({ deletedUser });
      signOut();
      revalidatePath(pathname);
      router.push("/sign-in");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button" className="w-full bg-dark-4 hover:bg-gray-1/10">
          <p className="text-red-500 ">Delete your account</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="delete-dialog-content_account">
        <div className="h-full w-full flex flex-col justify-between items-center">
          <div className="flex flex-col items-center gap-4 py-6 px-4">
            <p className="text-light-1 text-base-bold">Delete Account?</p>
            <p className="text-gray-1 text-center">
              If you delete your account, you won't be able to restore it.
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
              {isDeleting ? "Deleting..." : "Delete your account"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccount;
