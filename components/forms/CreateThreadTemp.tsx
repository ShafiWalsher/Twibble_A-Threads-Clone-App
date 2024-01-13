"use client";

import Image from "next/image";
import Link from "next/link";
import * as z from "zod";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  link: {
    route: string;
    label: string;
    imgURL: string;
  };
  isActive: boolean;
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  from: "Topbar" | "Bottombar";
}

const CreateThread = ({ link, isActive, userData, from }: Props) => {
  const userId = userData.userId;

  const router = useRouter();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  // const threadLineRef = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState<string>("");

  useEffect(() => {
    if (textAreaRef.current) {
      // Textarea Ref
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";

      //   // Div Ref
      //   threadLineRef.current.style.height = "auto";
      //   textAreaRef.current.style.height =
      //     textAreaRef.current.style.height + "4px";
    }
  }, [val]);

  //  setup form resolver
  // const form = useForm({
  //   resolver: zodResolver(ThreadValidation),
  //   defaultValues: {
  //     thread: "",
  //     userId: userId,
  //   },
  // });

  // handle form on submit
  // const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  // await createThread({
  //   text: values.thread,
  //   author: userId,
  //   path: pathname,
  // });
  // router.push("/");
  // };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      thread: { value: string };
    };
    const thread = target.thread.value; // typechecks!

    // try {
    // const newEvent = await createEventDoc({
    //   thread,
    //   userId,
    // });
    // if (newEvent) {
    //   form.reset();
    //   // toast.success("Event Created successfully");
    //   router.push(`/events/${newEvent._id}`);
    // }
    // } catch (error) {
    // console.log(error);
    // toast.error("Event Creation Failed, Try again later!.");
    // }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link
          href=""
          key={link.label}
          className={`${from === "Topbar" ? "topbar_link" : "bottombar_link"}`}
        >
          <Image
            src={link.imgURL}
            alt={link.label}
            width={24}
            height={24}
            title={link.label}
            className={`${isActive && "filter brightness-[20]"}`}
          />
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] outline-none border-0 bg-transparent">
        <div className="bg-transparent text-light-1 flex justify-center items-center w-full relative">
          <p className="text-body-semibold">New thread</p>
          <div className="absolute right-4 border border-light-1 p-0.5 rounded-full cursor-pointer">
            <Image
              src="/assets/icons/menu-dots.svg"
              alt="more"
              width={16}
              height={16}
              objectFit="contain"
            />
          </div>
        </div>
        <form
          name="form"
          onSubmit={handleSubmit}
          className="bg-dark-2 p-6 rounded-xl w-full flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <div className="flex flex-row gap-4">
              {/* Main profilepic */}
              <div className="relative p-1 h-full flex flex-col">
                <div className="relative flex flex-col items-start justify-start text-light-1 h-9 w-9 ">
                  <Image
                    src={userData.photoUrl}
                    alt="profilePic"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div className="thread-card_bar" />
              </div>

              {/* TextArea */}
              <div className="flex flex-col flex-1">
                <p className=" text-base-bold text-light-1 mb-1">
                  {userData.username}
                </p>
                <div className="">
                  <textarea
                    ref={textAreaRef}
                    name="thread"
                    rows={1}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder="Start a thread..."
                    className="account-form_textarea resize-none w-full"
                  />
                </div>
                <div className="flex gap-4 mt-2 py-2">
                  <Image
                    src="/assets/icons/gallery.svg"
                    alt="gallery"
                    width={22}
                    height={22}
                    className="object-contain cursor-pointer"
                  />
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
            <div className="flex gap-3 mt-2">
              <div className="relative flex items-center justify-center text-light-1 h-4 w-4 px-[22px]">
                <Image
                  src={userData.photoUrl}
                  alt="profilePic"
                  fill
                  className={`object-contain text-gray-1  ${
                    val.length > 0
                      ? "cursor-pointer opacity-100"
                      : "cursor-not-allowed opacity-50"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`text-gray-1  ${
                    val.length > 0
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
          <div className="flex justify-between items-end">
            <p className="text-gray-1 cursor-pointer">Anyone can reply</p>
            <button
              type="submit"
              className={`text-dark-1 text-base-semibold bg-light-1 py-2 px-4 rounded-full mt-2  ${
                val.length > 0
                  ? "cursor-pointer opacity-100 hover:bg-light-1/80"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              Post
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThread;
