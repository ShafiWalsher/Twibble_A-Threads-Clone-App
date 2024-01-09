import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {}

const userSchema = new Schema({
  clerkId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  bio: { type: String, required: true },
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
