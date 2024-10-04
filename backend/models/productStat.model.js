import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productStatSchema = new Schema(
  {
    productId: String,
    yearlySalesTotal: String,
    yearlyTotalSoldUnits: String,
    monthlyData: [
      {
        month: String,
        totalSales: String,
        totalUnits: String,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: String,
        totalUnits: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export default mongoose.model("productStat", productStatSchema);
