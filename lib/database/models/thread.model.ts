import { Document, Schema, model, models, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IThread extends Document {
  thread_text: string;
  author: Types.ObjectId | IUser;
  createdAt: Date;
  parentId?: string;
  comments?: Types.ObjectId[];
}

const threadSchema = new Schema<IThread>({
  thread_text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = models.Thread || model<IThread>("Thread", threadSchema);

export default Thread;
