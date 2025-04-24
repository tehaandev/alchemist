import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";
const DATABASE_NAME = process.env.NODE_ENV === "production" ? "prod" : "dev";
let client: mongoose.Mongoose | null = null;
export const connectDB = async () => {
  try {
    if (client) {
      // console.log("MongoDB already connected");
      return;
    }
    client = await mongoose.connect(MONGO_URI, {
      maxIdleTimeMS: 5000, // 10 seconds
      dbName: DATABASE_NAME,
    });
    // console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    client = null;
    // console.log("MongoDB disconnected");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
    process.exit(1);
  }
};
