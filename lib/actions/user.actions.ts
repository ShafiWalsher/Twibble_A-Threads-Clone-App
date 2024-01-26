"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import User, { IUser } from "../database/models/user.model";
import { connectToDatabase } from "../database";
import Thread from "../database/models/thread.model";
import { revalidatePath } from "next/cache";
import { FilterQuery, Schema, SortOrder, Types } from "mongoose";
import {
  deleteClerkUser,
  updateClerkUser,
} from "@/app/api/webhooks/clerk/route";

// Create User
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

//   Find User
export async function getUserById(userId: string | undefined) {
  try {
    if (!userId) {
      throw new Error("User ID is undefined");
    }

    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// Find User by clerkId
export async function getUserByClerkId(clerkId: string | undefined) {
  try {
    if (!clerkId) {
      throw new Error("clerkId is undefined");
    }

    await connectToDatabase(); // Assuming you have a function to connect to the database

    const user = await User.findOne({ clerkId }).exec();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// Update User
export async function updateUser({ _id, user }: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ _id }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    // also update clerkUserAccount
    await updateClerkUser(JSON.parse(JSON.stringify(updatedUser)));

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// Delete User
// export async function deleteUser(userId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ _id: userId });

//     console.log("from USER ACtions:", { userToDelete });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Unlink relationships
//     await Promise.all([
//       // Update the 'threads' collection to remove references to the user
//       Thread.updateMany(
//         { _id: { $in: userToDelete.threads } },
//         { $pull: { author: userToDelete._id } }
//       ),
//     ]);

//     // Delete user from mongoDB
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     // Delete user from Clerk
//     await deleteClerkUser(JSON.parse(JSON.stringify(userToDelete.clerkId)));

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }

// Delete User ChatGPT
// export async function deleteUser(userId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ _id: userId });

//     console.log("from USER ACtions:", { userToDelete });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user's threads
//     await Thread.deleteMany({ _id: { $in: userToDelete.threads } });

//     // Unlink relationships in other threads
//     await Thread.updateMany(
//       { "comments.author": userId },
//       { $pull: { comments: { author: userId } } }
//     );

//     // Remove user references from threads
//     await Thread.updateMany(
//       { _id: { $in: userToDelete.threads } },
//       { $pull: { author: userId } }
//     );

//     // Delete user from MongoDB
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     // Delete user from Clerk
//     await deleteClerkUser(JSON.parse(JSON.stringify(userToDelete.clerkId)));

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }

// Fetch All the users (This should be like top searched users)
export async function fetchAllUsers({
  currentUserId,
  page = 1,
  limit = 25,
}: {
  currentUserId: string;
  page?: number;
  limit?: number;
}) {
  try {
    await connectToDatabase();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (page - 1) * limit;

    // Find all users except the current user, sorted by some criteria (e.g., username).
    const usersQuery = User.find({ _id: { $ne: currentUserId } })
      .sort({ username: "asc" }) // Change this to your desired sorting criteria
      .skip(skipAmount)
      .limit(limit);

    const totalUsersCount = await User.countDocuments({
      _id: { $ne: currentUserId },
    });

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return {
      users: JSON.parse(JSON.stringify(users)),
      isNext,
    };
  } catch (error) {
    handleError(error);
  }
}
// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDatabase();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      _id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    return {
      users: JSON.parse(JSON.stringify(users)),
      isNext,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get ACtivities for the user
export async function getActivity(userId: string) {
  try {
    connectToDatabase();

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.comments);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "_id username firstName photoUrl ",
    });

    return JSON.parse(JSON.stringify(replies));
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}

// DELETE USER WITH ALL THREADS AND COMMENTS (INCLUDES NESTED COMMENTS)
export async function deleteUser(userId: string): Promise<IUser | null> {
  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      // User not found
      return null;
    }

    // Delete threads and associated comments recursively
    await deleteThreads(user.threads);

    // Delete comments authored by the user
    await deleteComments(user.comments);

    // Finally, delete the user
    // await user.remove();

    //  // Delete User from MongoDb
    const deletedUser = await User.findByIdAndDelete(userId);
    // Delete User from Clerk
    if (deletedUser) {
      await deleteClerkUser(JSON.parse(JSON.stringify(user.clerkId)));
    }
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;

    // return user;
  } catch (error) {
    // Handle errors as needed
    console.error("Error deleting user:", error);
    throw error;
  }
}

// Define the recursive function to delete threads and associated comments
async function deleteThreads(threadIds: Schema.Types.ObjectId[]) {
  for (const threadId of threadIds) {
    const thread = await Thread.findById(threadId);

    if (thread) {
      // Recursively delete comments associated with the thread
      await deleteThreads(thread.comments);

      // Delete the thread itself
      await Thread.findByIdAndDelete(threadId);
    }
  }
}

// Define the function to delete comments
async function deleteComments(commentIds: Schema.Types.ObjectId[]) {
  for (const commentId of commentIds) {
    const comment = await Thread.findById(commentId);

    if (comment) {
      // If the comment has a parent thread authored by a different user,
      // update the parent thread's comments array to remove the reference to the deleted comment
      if (comment.parentId) {
        const parentThread = await Thread.findById(comment.parentId);
        if (parentThread && !parentThread.author.equals(comment.author)) {
          // Remove the reference to the deleted comment from the parent thread's comments array
          parentThread.comments = parentThread.comments.filter(
            (id: any) => !id.equals(commentId)
          );
          await parentThread.save();
        }
      }

      // Delete the comment
      await Thread.findByIdAndDelete(commentId);
    }
  }
}

//  // Delete User from MongoDb
//     const deletedUser = await User.findByIdAndDelete(userId);
//     // Delete User from Clerk
//     if (deletedUser) {
//       await deleteClerkUser(JSON.parse(JSON.stringify(userToDelete.clerkId)));
//     }
//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
