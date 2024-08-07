import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO || "")
    .then(() => {
      console.log("Database connected");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default connectDatabase;
