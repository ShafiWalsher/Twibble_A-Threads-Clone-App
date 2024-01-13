import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  photoUrl?: string;
  bio?: string;
  threads?: Schema.Types.ObjectId[];
  onboarded?: boolean;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  photoUrl: { type: String },
  bio: { type: String },
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: { type: Boolean, default: false },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
