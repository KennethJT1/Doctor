import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

export const connectedDB = async () =>
  mongoose
    .connect(database!)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("DB-disconnected" + err));
