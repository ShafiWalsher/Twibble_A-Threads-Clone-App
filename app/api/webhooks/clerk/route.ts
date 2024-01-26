import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions/user.actions";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { IUser } from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  // Creaete new user from Clerk
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      photoUrl: image_url,
    };

    // create new user in MongoDb
    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "OK", user: newUser });
  }

  // // Delete user
  // if (eventType === "user.deleted") {
  //   const { id } = evt.data;

  //   const deletedUser = await deleteUser(id!);

  //   return NextResponse.json({ message: "OK", user: deletedUser });
  // }

  return new Response("", { status: 200 });
}

// Update users (Get Updated user from user.actions and update clerkUser)
export const updateClerkUser = async (mongoDbUser: IUser) => {
  try {
    if (!mongoDbUser) {
      throw new Error("Clerk User update failed");
    }

    // for now update only firstName
    // Get clerkId from mongodb document
    // Documentation: https://clerk.com/docs/references/backend/user/update-user
    const userId = mongoDbUser.clerkId;
    // Define parameters
    const params = {
      firstName: mongoDbUser.firstName,
    };

    const updatedClerkUser = await clerkClient.users.updateUser(userId, params);

    return NextResponse.json({ message: "OK", user: updatedClerkUser });
  } catch (error) {
    handleError(error);
  }
};

// Delete user if user is Deleted from MongoDb
export const deleteClerkUser = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Clerk User Delete failed");
    }
    const user = await clerkClient.users.deleteUser(userId);

    return NextResponse.json({ message: "OK", user: user });
  } catch (error) {
    handleError(error);
  }
};
