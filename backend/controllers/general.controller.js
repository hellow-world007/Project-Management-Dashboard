import Users from "../models/user.model.js";
import HttpError from "../models/http-error.js";
import OverallStat from "../models/overallStat.model.js";
import Transaction from "../models/transactions.model.js";

export const getUserByID = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    res.status(200).json({ user: user });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // const today = new Date();
    // const currentMonth = today.toLocaleString("default", { month: "long" });
    // const currentYear = today.getFullYear();
    // const currentDay = today.toISOString().split("T")[0];F

    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    const overallStat = await OverallStat.findOne({ year: currentYear }).select(
      "totalCustomers yearlyTotalSoldUnits yearlySalesTotal monthlyData salesByCategory dailyData"
    );

    if (!overallStat) {
      return res.status(404).json({ message: "Statistics not found" });
    }

    const thisMonthStats = overallStat.monthlyData.find(
      ({ month }) => month === currentMonth
    );
    const todayStats = overallStat.dailyData.find(
      ({ date }) => date === currentDay
    );

    res.status(200).json({
      totalCustomers: overallStat.totalCustomers,
      yearlyTotalSoldUnits: overallStat.yearlyTotalSoldUnits,
      yearlySalesTotal: overallStat.yearlySalesTotal,
      monthlyData: overallStat.monthlyData,
      salesByCategory: overallStat.salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
