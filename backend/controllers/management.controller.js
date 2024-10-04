import Users from "../models/user.model.js";
import mongoose from "mongoose";

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Users.find({ role: "admin" }).select("-password");

    if (!admins) {
      return next(new HttpError("Users not found", 404));
    }

    res.status(200).json({ admins: admins });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

export const getPerformanceByUser = async (req, res) => {
  try {
    const { userID } = req.params;

    const userWithStats = await Users.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userID) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
      {
        $lookup: {
          from: "transactions",
          localField: "affiliateStats.affiliateSales",
          foreignField: "_id",
          as: "salesTransactions",
        },
      },
    ]);

    if (!userWithStats.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: userWithStats[0], sales: userWithStats[0].salesTransactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

