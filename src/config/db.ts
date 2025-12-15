import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "zbaccount"
    });

    console.log("MongoDB connected to authdb");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};
