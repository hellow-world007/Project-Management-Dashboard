import OverallStats from "../models/overallStat.model.js";

export const getSales = async (req, res, next) => {
  try {
    const overallStats = await OverallStats.find();

    if (!overallStats) {
      return next(new HttpError("Users not found", 404));
    }

    res.status(200).json({ overallStats: overallStats[0] });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};
