"use client";
import Image from "next/image";
import Link from "next/link";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NewThreadForm from "./NewThreadForm";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href=""
          key={link?.label}
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
      <NewThreadForm userData={userData} setOpen={setOpen} />
    </Dialog>
  );
};

export default CreateThread;
