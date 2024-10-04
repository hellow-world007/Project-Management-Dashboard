import mongoose from "mongoose";

const { Schema } = mongoose;

const AffiliateStatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;
