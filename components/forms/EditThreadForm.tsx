"use client";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AttachmentUploader from "../shared/AttachmentUploader";
import Link from "next/link";
import { DialogClose, DialogContent } from "../ui/dialog";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname } from "next/navigation";
import { EditThreadFormParams } from "@/types";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import DeleteThread from "../shared/DeleteThread";

const EditThreadForm = ({
  userData,
  parentId,
  postData,
  open,
  setOpen,
}: EditThreadFormParams) => {
  const pathname = usePathname();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState<string>(postData.content);
  const [isPosting, setIsPosting] = useState(false);

  let threadAttachments: string[] = [...(postData.attachments || [])];

  useEffect(() => {
    if (textAreaRef.current) {
      // Textarea Ref
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";

      textAreaRef.current.style.height + "4px";

      // Set the cursor at the end of the content
      const contentLength = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(contentLength, contentLength);

      // Focus the textarea
      textAreaRef.current.focus();
    }

    // Check if val is empty when the modal is open and textarea is empty
    if (
      open &&
      !val &&
      textAreaRef.current &&
      textAreaRef.current.value.trim() === ""
    ) {
      // Set the initial value to postData.content
      textAreaRef.current.value = postData.content;
    }
  }, [val, open, textAreaRef, postData.content]);

  // Reset val when the modal is opened
  useEffect(() => {
    if (open) {
      setVal(postData.content);
    }
  }, [open]);

  //  Handle form submit
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Get thread text from textarea
    const target = e.target as typeof e.target & {
      thread_text: { value: string };
    };
    const draftThread = target.thread_text.value.trim();

    // await addCommentToThread({
    //   threadId: postData.postId,
    //   commentText: draftThread,
    //   userId: userData.userId,
    //   path: pathname,
    // });
    setIsPosting(false);
    setVal("");
    setOpen(false);
  };
  EditThreadForm;
  return (
    <DialogContent
      ref={dialogContentRef}
      className="dialog-content sm:max-w-[620px] outline-none border-0 bg-transparent"
    >
      <div className="bg-transparent text-light-1 flex justify-center items-center w-full relative">
        <p className="text-body-semibold">Edit Thread</p>
        <Link
          href=""
          className="hover:bg-dark-4 p-2 rounded-full absolute right-0"
        >
          <Image
            src="/assets/icons/menu-dots.svg"
            alt="menu"
            width={22}
            height={22}
            className="object-contain"
          />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-dark-2 p-6 rounded-xl w-full flex flex-col gap-4"
      >
        {/* Edit Existing Content */}
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            {/* Main profilepic */}
            <div className="relative p-1 h-full flex flex-col">
              <div className="relative flex flex-col items-start justify-start text-light-1 h-9 w-9 ">
                <Link href={`/profile/${userData.userId}`}>
                  <Image
                    src={userData?.photoUrl ?? ""}
                    alt="profilePic"
                    fill
                    className="object-contain rounded-full"
                  />
                </Link>
              </div>
              <div className="thread-card_bar" />
            </div>

            {/* TextArea And File Attachments */}
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center">
                <p className=" text-base-bold text-light-1 mb-1">
                  <Link
                    href={`/profile/${userData.userId}`}
                    className="hover:underline"
                  >
                    {userData.username}
                  </Link>
                </p>

                <div>
                  {/* <DeleteThread
                    threadId={JSON.stringify(postData.postId)}
                    currentUserId={postData.currentUserId}
                    authorId={postData.author._id}
                    parentId={parentId}
                    isComment={postData.isComment}
                  /> */}
                </div>
              </div>

              {/* Textarea */}
              <div className="">
                <textarea
                  ref={textAreaRef}
                  rows={1}
                  name="thread_text"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="Start a thread..."
                  className="account-form_textarea resize-none w-full"
                />
              </div>

              {/* Uploaded Files */}
              {threadAttachments.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="mt-4 flex items-end gap-2 flex-wrap">
                    {threadAttachments.map((file: string) => (
                      <div key={file} className="h-40 w-40 relative">
                        <Image
                          src={file}
                          alt="uploaded-image"
                          fill
                          className="object-cover rounded-lg h-full w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add to Thread Option */}
          <div className="flex gap-3 mt-2 items-center">
            <div className="flex items-center justify-center text-light-1 px-4">
              <div className="relative rounded-full h-4 w-4">
                <Image
                  src={userData?.photoUrl ?? ""}
                  alt="profilePic"
                  fill
                  className={`rounded-full object-contain text-gray-1  ${
                    val.trim() || threadAttachments.length > 0
                      ? "cursor-pointer opacity-100"
                      : "cursor-not-allowed opacity-50"
                  }`}
                />
              </div>
            </div>
            <div className="flex-1">
              <p
                className={`text-gray-1  ${
                  val.trim() || threadAttachments.length > 0
                    ? "cursor-pointer opacity-100"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                Add to thread
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-between items-center">
          <p className="text-gray-1 cursor-pointer flex-1">Anyone can reply</p>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPosting}
              className={`text-dark-1 text-base-semibold py-3 px-4 rounded-full ${
                (val.trim() || threadAttachments.length > 0) && !isPosting
                  ? "hover:bg-light-1/80 bg-light-1 cursor-pointer"
                  : "cursor-not-allowed bg-light-1/30"
              }`}
            >
              {isPosting ? "Saving..." : "Save"}
            </button>
            <DialogClose asChild>
              <button className="text-light-1 text-base-semibold py-3 px-4 rounded-full hover:bg-gray-1/30 bg-gray-1/40 cursor-pointer">
                Cancel
              </button>
            </DialogClose>
          </div>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditThreadForm;
