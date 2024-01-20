"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserValidation } from "@/lib/validations/user";
import { profileDefaultValues } from "@/constants";
import FileUploader from "../shared/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    userId: string;
    username: string;
    firstName: string;
    bio: string;
    photoUrl: string;
  };
  btnTitle: string;
  type: "OnboardingUpdate" | "ProfileUpdate";
}

const AccountProfileForm = ({ user, btnTitle, type }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState(user.firstName);
  const username = user.username;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const { startUpload } = useUploadThing("imageUploader");

  const _id = user.userId;

  const [files, setFiles] = useState<File[]>([]);
  const initialValues = user
    ? {
        ...user,
      }
    : profileDefaultValues;

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    setSubmitting(true);
    let uploadedImageUrl = values.photoUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "OnboardingUpdate") {
      if (!_id) {
        router.back();
        return;
      }

      const updatedUser = await updateUser({
        _id,
        user: {
          ...values,
          photoUrl: uploadedImageUrl,
          onboarded: true,
        },
      });

      if (updatedUser) {
        router.push(`/profile/${updatedUser._id}`);
      }
    } else {
      if (!_id) {
        router.back();
        return;
      }

      const updatedUser = await updateUser({
        _id,
        user: {
          ...values,
          photoUrl: uploadedImageUrl,
        },
        pathname: `/profile/${_id}`,
      });

      if (updatedUser) {
        router.push(`/profile/${updatedUser._id}`);
      }
    }
    setSubmitting(false);

    if (pathname === `/profile/${_id}/edit`) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form
          className={`${
            type === "ProfileUpdate" ? "flex-col" : "sm:flex-row"
          }flex flex-col  justify-start gap-10`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div
            className={`${
              type === "ProfileUpdate" ? "w-full" : "sm:w-1/2"
            } flex flex-col justify-between w-full`}
          >
            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem className="w-full flex gap-8 items-center">
                  <FormControl className="h-[150px]">
                    <FileUploader
                      onFieldChange={field.onChange}
                      photoUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <div className="flex flex-col">
                    <div className=" text-light-2/90">
                      <p className=" text-body-bold">{name}</p>
                      <p className="text-base-regular">
                        {username.toLocaleLowerCase()}
                      </p>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div
              className={`flex flex-col w-full mt-10 sm:mt-6 ${
                type === "ProfileUpdate" ? "gap-4" : "gap-0"
              }`}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel className="account-form_input-label">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="account-form_input no-focus"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleNameChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2 flex flex-col gap-1">
                <div>
                  <p className="account-form_input-label">Username</p>
                </div>
                <div>
                  <p className="account-form_input no-focus py-2 px-3 rounded-md cursor-not-allowed">
                    {username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              type === "ProfileUpdate" ? "w-full mt-10" : "sm:w-1/2"
            } flex flex-col gap-3 justify-between w-full`}
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-y-1">
                  <FormLabel className="account-form_input-label">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={Number(`${type === "ProfileUpdate" ? 5 : 10}`)}
                      placeholder="Something about you..."
                      className="account-form_input no-focus resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={
                type === "ProfileUpdate"
                  ? "w-full flex flex-col gap-3"
                  : "w-full"
              }
            >
              <Button
                type="submit"
                disabled={submitting}
                className={`${
                  submitting
                    ? "cursor-not-allowed bg-light-1/30"
                    : "hover:bg-light-1/80  cursor-pointer"
                }text-dark-1 text-base-semibold mt-3 bg-light-1`}
              >
                {submitting ? "Saving..." : btnTitle}
              </Button>

              {type === "ProfileUpdate" && (
                <Button
                  onClick={() => router.push(`/profile/${_id}`)}
                  className="bg-dark-4 hover:bg-gray-1/10"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountProfileForm;
