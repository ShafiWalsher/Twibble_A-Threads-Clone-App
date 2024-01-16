"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";

interface Params {
  thread_text: string | null | undefined;
  author: string;
  path: string;
  fileUrls: string[];
}

export async function createThread({
  thread_text,
  author,
  path,
  fileUrls,
}: Params) {
  try {
    connectToDatabase();

    const createdThread = await Thread.create({
      thread_text,
      author,
      attachments: fileUrls,
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchPosts({
  page,
  limit = 8,
}: {
  page: number;
  limit?: number;
}) {
  try {
    connectToDatabase();

    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (page - 1) * limit;

    // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "comments", // Populate the children field
        model: Thread,
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id username parentId photoUrl", // Select only _id and username fields of the author
        },
      });

    // Count the total number of top-level posts (threads) i.e., threads that are not comments.
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return {
      posts: JSON.parse(JSON.stringify(posts)),
      isNext,
    };
  } catch (error) {
    handleError(error);
  }
}

// export async function fetchUserPostsOld(userId: string) {
//   try {
//     connectToDatabase();

//     // Find all threads authored by the user with the given userId
//     const threads = await User.findOne({ _id: userId }).populate({
//       path: "threads",
//       model: Thread,
//       populate: [
//         {
//           path: "comments",
//           model: Thread,
//           populate: {
//             path: "author",
//             model: User,
//             select: "_id username parentId photoUrl", //
//           },
//         },
//       ],
//     });
//     return threads;
//   } catch (error) {
//     console.error("Error fetching user threads:", error);
//     throw error;
//   }
// }

export async function fetchUserPostsOld({
  userId,
  page = 1,
  limit = 10,
  sort = "desc",
}: {
  userId: string;
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
}) {
  try {
    connectToDatabase();

    // Calculate the number of threads to skip based on the page number and page size.
    const skipAmount = (page - 1) * limit;

    // Create a query to fetch threads authored by the user with the given userId.
    const threadsQuery = Thread.find({ author: userId })
      .sort({ createdAt: sort })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "comments",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "_id username parentId photoUrl",
        },
      });

    // Count the total number of threads authored by the user.
    const totalThreadsCount = await Thread.countDocuments({ author: userId });

    const threads = await threadsQuery.exec();

    const isNext = totalThreadsCount > skipAmount + threads.length;

    return {
      threads: JSON.parse(JSON.stringify(threads)),
      isNext,
    };
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

export async function fetchUserPosts({
  userId,
  page = 1,
  limit = 8,
}: {
  userId: string;
  page?: number;
  limit?: number;
}) {
  try {
    connectToDatabase();

    // Calculate the number of threads to skip based on the page number and page size.
    const skipAmount = (page - 1) * limit;

    // Find all threads authored by the user with the given userId, sorted by createdAt in descending order.
    const threadsQuery = Thread.find({ author: userId })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "comments",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "_id username parentId photoUrl",
        },
      });
    // .populate({
    //   path: "author",
    //   model: User,
    // });

    // Count the total number of threads authored by the user.
    const totalThreadsCount = await Thread.countDocuments({ author: userId });

    const threads = await threadsQuery.exec();

    const isNext = totalThreadsCount > skipAmount + threads.length;

    return {
      threads: JSON.parse(JSON.stringify(threads)),
      isNext,
    };
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// async function fetchAllChildThreads(threadId: string): Promise<any[]> {
//   const childThreads = await Thread.find({ parentId: threadId });

//   const descendantThreads = [];
//   for (const childThread of childThreads) {
//     const descendants = await fetchAllChildThreads(childThread._id);
//     descendantThreads.push(childThread, ...descendants);
//   }

//   return descendantThreads;
// }

// export async function deleteThread(id: string, path: string): Promise<void> {
//   try {
//     connectToDatabase();

//     // Find the thread to be deleted (the main thread)
//     const mainThread = await Thread.findById(id).populate("author community");

//     if (!mainThread) {
//       throw new Error("Thread not found");
//     }

//     // Fetch all child threads and their descendants recursively
//     const descendantThreads = await fetchAllChildThreads(id);

//     // Get all descendant thread IDs including the main thread ID and child thread IDs
//     const descendantThreadIds = [
//       id,
//       ...descendantThreads.map((thread) => thread._id),
//     ];

//     // Extract the authorIds and communityIds to update User and Community models respectively
//     const uniqueAuthorIds = new Set(
//       [
//         ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
//         mainThread.author?._id?.toString(),
//       ].filter((id) => id !== undefined)
//     );

//     const uniqueCommunityIds = new Set(
//       [
//         ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
//         mainThread.community?._id?.toString(),
//       ].filter((id) => id !== undefined)
//     );

//     // Recursively delete child threads and their descendants
//     await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

//     // Update User model
//     await User.updateMany(
//       { _id: { $in: Array.from(uniqueAuthorIds) } },
//       { $pull: { threads: { $in: descendantThreadIds } } }
//     );

//     // Update Community model
//     await Community.updateMany(
//       { _id: { $in: Array.from(uniqueCommunityIds) } },
//       { $pull: { threads: { $in: descendantThreadIds } } }
//     );

//     revalidatePath(path);
//   } catch (error: any) {
//     throw new Error(`Failed to delete thread: ${error.message}`);
//   }
// }

// export async function fetchThreadById(threadId: string) {
//   connectToDatabase();

//   try {
//     const thread = await Thread.findById(threadId)
//       .populate({
//         path: "author",
//         model: User,
//         select: "_id id name image",
//       }) // Populate the author field with _id and username
//       .populate({
//         path: "community",
//         model: Community,
//         select: "_id id name image",
//       }) // Populate the community field with _id and name
//       .populate({
//         path: "children", // Populate the children field
//         populate: [
//           {
//             path: "author", // Populate the author field within children
//             model: User,
//             select: "_id id name parentId image", // Select only _id and username fields of the author
//           },
//           {
//             path: "children", // Populate the children field within children
//             model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
//             populate: {
//               path: "author", // Populate the author field within nested children
//               model: User,
//               select: "_id id name parentId image", // Select only _id and username fields of the author
//             },
//           },
//         ],
//       })
//       .exec();

//     return thread;
//   } catch (err) {
//     console.error("Error while fetching thread:", err);
//     throw new Error("Unable to fetch thread");
//   }
// }

// export async function addCommentToThread(
//   threadId: string,
//   commentText: string,
//   userId: string,
//   path: string
// ) {
//   connectToDatabase();

//   try {
//     // Find the original thread by its ID
//     const originalThread = await Thread.findById(threadId);

//     if (!originalThread) {
//       throw new Error("Thread not found");
//     }

//     // Create the new comment thread
//     const commentThread = new Thread({
//       text: commentText,
//       author: userId,
//       parentId: threadId, // Set the parentId to the original thread's ID
//     });

//     // Save the comment thread to the database
//     const savedCommentThread = await commentThread.save();

//     // Add the comment thread's ID to the original thread's children array
//     originalThread.children.push(savedCommentThread._id);

//     // Save the updated original thread to the database
//     await originalThread.save();

//     revalidatePath(path);
//   } catch (err) {
//     console.error("Error while adding comment:", err);
//     throw new Error("Unable to add comment");
//   }
// }
