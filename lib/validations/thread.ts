import * as z from "zod";

export const ThreadSchema = z.object({
  thread_text: z
    .string()
    .min(5, {
      message: "Thread must be at least 5 characters.",
    })
    .max(500, { message: "Name must be less than 500 characters." }),
  userId: z.string(),
});

export type TThreadSchema = z.infer<typeof ThreadSchema>;

export const CommentSchemaValidation = z.object({
  thread: z
    .string()
    .min(3, {
      message: "Reply must be at least 3 characters.",
    })
    .max(250, { message: "Reply must be less than 250 characters." }),
});
