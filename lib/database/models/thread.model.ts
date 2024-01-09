import { Schema, Types, model, models } from "mongoose";

export interface IThread extends Document {
  _id: string; // created by mongoose
  thread_text: string;
  author: Types.ObjectId;
  createdAt: Date;
  imageUrls: string[];
  parentId?: string;
  comment?: Types.ObjectId[];
}

const threadSchema = new Schema({
  thread_text: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  imageUrls: [{ type: String }], // might include multiple images
  parentId: { type: String },
  comment: [
    // a thread can have nultiple comments
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = models.Thread || model<IThread>("Thread", threadSchema);

export default Thread;
