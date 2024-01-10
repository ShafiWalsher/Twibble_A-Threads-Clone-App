"use client";

import { auth } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserValidation } from "@/lib/validations/user";
import { profileDefaultValues } from "@/constants";
import FileUploader from "../shared/FileUploader";

interface Props {
  user: {
    userId: string;
    username: string;
    name: string;
    bio: string;
    photoUrl: string;
  };
  btnTitle: string;
  type: "Create" | "Update";
}

const AccountProfile = ({ user, btnTitle, type }: Props) => {
  //   const { sessionClaims } = auth();
  //   const userId = sessionClaims?.userId as string;

  const router = useRouter();
  const pathname = usePathname();
  //   const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    user && type === "Update"
      ? {
          ...user,
        }
      : profileDefaultValues;

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      photoUrl: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.photoUrl;

    // const hasImageChanged = isBase64Image(blob);
    // if (hasImageChanged) {
    //   const imgRes = await startUpload(files);

    //   if (imgRes && imgRes[0].url) {
    //     values.photoUrl = imgRes[0].url;
    //   }
    // }

    // await updateUser({
    //   name: values.name,
    //   path: pathname,
    //   username: values.username,
    //   userId: user.id,
    //   bio: values.bio,
    //   image: values.photoUrl,
    // });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col sm:flex-row justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-between sm:w-1/2">
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-[150px]">
                  <FileUploader
                    onFieldChange={field.onChange}
                    photoUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full mt-10 sm:-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel className="account-form_input-label">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-y-3 mt-3 ">
                  <FormLabel className="account-form_input-label">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:w-1/2">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-y-3">
                <FormLabel className="account-form_input-label">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Something about you..."
                    className="account-form_input no-focus resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500 mt-3">
            {btnTitle}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountProfile;
