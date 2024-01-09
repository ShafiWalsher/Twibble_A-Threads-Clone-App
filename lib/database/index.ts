import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_MONGODB_URI;

// variable to check if mongoose is connected
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!MONGODB_URI) {
    return console.log("NEXT_MONGODB_URI not found in env");
  }

  if (cached.conn) {
    console.log("Already Connected to MongoDB");
    return cached.conn;
  }

  try {
    // Check if Connection already exists or Create new Mongoose Connection
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        dbName: "threads-clone",
        bufferCommands: false,
      });

    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
    return cached.conn;
  } catch (error: any) {
    throw new Error("Unable to Connect to MongoDB : ", error.message);
  }
};
