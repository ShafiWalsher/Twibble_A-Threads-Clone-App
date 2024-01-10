import * as z from "zod";

export const UserValidation = z.object({
  photoUrl: z.string().url({ message: "Invalid url" }),
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    })
    .max(20, { message: "Name must be less than 20 characters." }),
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(20, { message: "Username must be less than 20 characters." }),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(1000, { message: "Bio must be less than 1000 characters." }),
});
