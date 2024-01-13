"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import User, { IUser } from "../database/models/user.model";
import { connectToDatabase } from "../database";
import Thread from "../database/models/thread.model";
import { revalidatePath } from "next/cache";

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
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// Delete User
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'threads' collection to remove references to the user
      Thread.updateMany(
        { _id: { $in: userToDelete.threads } },
        { $pull: { author: userToDelete._id } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
