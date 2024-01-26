"use client";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import AttachmentUploader from "../shared/AttachmentUploader";
import Link from "next/link";
import { DialogContent } from "../ui/dialog";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewThreadForm = ({ userData, setOpen }: Props) => {
  const pathname = usePathname();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState<string>("");

  // File Upload
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileUrls, setSelectedFileUrls] = useState<string[]>([]);
  const [isMaxFiles, setIsMaxFiles] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  let maxFiles = 4; // same as in core.ts file of Uploadthing

  const { startUpload } = useUploadThing("imageUploader");

  const onFileSelect = (fileUrl: string) => {
    // setSelectedFileUrls((prevFileUrls) => [...prevFileUrls, fileUrl]);
    if (selectedFileUrls.length >= maxFiles) {
      setIsMaxFiles(true);
    } else {
      setSelectedFileUrls((prevFileUrls) => [...prevFileUrls, fileUrl]);
      setIsMaxFiles(false);
    }
  };

  if (selectedFileUrls.length > maxFiles) {
    setIsMaxFiles(true);
    setSelectedFileUrls([]);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      // Textarea Ref
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";

      textAreaRef.current.style.height + "4px";
    }
  }, [val, selectedFileUrls]);

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleMouseDown);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // When dialog is not open clear all states
  const handleMouseDown = (event: MouseEvent) => {
    if (
      dialogContentRef.current &&
      !dialogContentRef.current.contains(event.target as Node) &&
      event.target instanceof Element &&
      !event.target.closest(".dialog-content")
    ) {
      setVal("");
      setFiles([]);
      setSelectedFileUrls([]);
    }
  };

  //  Handle form submit
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsPosting(true);

    // Get thread text from textarea
    const target = e.target as typeof e.target & {
      thread_text: { value: string };
    };
    const draftThread = target.thread_text.value.trim();

    let fileUrls: string[] = [];

    // Upload the selected Files
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setIsPosting(false);
        return;
      }
      fileUrls = uploadedImages.map((image) => image.url);
    }

    // create the new document
    if (fileUrls) {
      await createThread({
        thread_text: draftThread,
        author: userData.userId,
        path: pathname,
        fileUrls: fileUrls,
      });
    } else {
      await createThread({
        thread_text: draftThread,
        author: userData.userId,
        path: pathname,
      });
    }

    setIsPosting(false);
    setVal("");
    setFiles([]);
    setSelectedFileUrls([]);
    setOpen(false);
  };

  return (
    <DialogContent
      ref={dialogContentRef}
      className="dialog-content sm:max-w-[620px] outline-none border-0 bg-transparent"
    >
      <div className="bg-transparent text-light-1 flex justify-center items-center w-full relative">
        <p className="text-body-semibold">New thread</p>
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
              <p className=" text-base-bold text-light-1 mb-1">
                <Link
                  href={`/profile/${userData.userId}`}
                  className="hover:underline"
                >
                  {userData.username}
                </Link>
              </p>
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
              {isMaxFiles ? (
                <p className="text-red-500">Max files: only 4</p>
              ) : (
                <>
                  {selectedFileUrls.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <div className="mt-4 flex items-end gap-2 flex-wrap">
                        {selectedFileUrls.map((file: string) => (
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
                      <p
                        className="text-gray-1 text-base-medium hover:underline cursor-pointer"
                        onClick={() => {
                          setFiles([]);
                          setSelectedFileUrls([]);
                        }}
                      >
                        Remove Images
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Attachment Icons */}
              <div className="flex gap-4 mt-2 py-2">
                <div>
                  <AttachmentUploader
                    setFiles={setFiles}
                    onFileSelect={onFileSelect}
                  />
                </div>
                <Image
                  src="/assets/icons/hash.svg"
                  alt="hash"
                  width={22}
                  height={22}
                  className="object-contain cursor-pointer"
                />
                <Image
                  src="/assets/icons/poll.svg"
                  alt="poll"
                  width={22}
                  height={22}
                  className="object-contain cursor-pointer"
                />
              </div>
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
                    val.trim()
                      ? "cursor-pointer opacity-100"
                      : "cursor-not-allowed opacity-50"
                  }`}
                />
              </div>
            </div>
            <div className="flex-1">
              <p
                className={`text-gray-1  ${
                  val.trim()
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
          <p className="text-gray-1 cursor-pointer">Anyone can reply</p>
          <button
            type="submit"
            disabled={isPosting}
            className={`text-dark-1 text-base-semibold py-3 px-4 rounded-full ${
              (val.trim() || selectedFileUrls.length > 0) && !isPosting
                ? "hover:bg-light-1/80 bg-light-1 cursor-pointer"
                : "cursor-not-allowed bg-light-1/30"
            }`}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </DialogContent>
  );
};

export default NewThreadForm;
