import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
    },
    status: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    address: {
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      ward: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
