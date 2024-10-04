import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: String,
    cost: Number,
    products: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

export default mongoose.model("Transaction", transactionSchema);
