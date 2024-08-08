import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";
import { Request, Response, NextFunction } from "express";

interface Body {
  name?: string;
  email: string;
  password: string;
  phone?: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone }: Body = req.body;

  if (!name || !email || !password || !phone) {
    return next(errorHandler(400, "All fields are required"));
  }

  const userExists = await User.findOne({ email });
  const phoneExists = await User.findOne({ phone });

  if (userExists) {
    return next(errorHandler(400, "User already exists"));
  }

  if (phoneExists) {
    return next(errorHandler(400, "Phone already exists"));
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, Body>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    if (typeof user.password !== "string") {
      return next(
        errorHandler(
          500,
          "Internal server error: User password is not properly defined"
        )
      );
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // Exclude password from response
    const { password: pass, ...rest } = user.toObject();

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
