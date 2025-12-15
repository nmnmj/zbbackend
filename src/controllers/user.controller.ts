import { Response } from "express";
import { User } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * GET ALL USERS (Protected)
 */
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
