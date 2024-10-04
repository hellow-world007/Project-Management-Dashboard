import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDb from "./db/connectToMongoDb.js";

import generalRoutes from "./routes/general.route.js";
import clientRoutes from "./routes/client.route.js";
import managementRoutes from "./routes/management.route.js";
import salesRoutes from "./routes/sales.route.js";

/////////////////////////////
import User from "./models/user.model.js";
import ProductStats from "./models/productStat.model.js";
import Transactions from "./models/transactions.model.js";
import OverallStats from "./models/overallStat.model.js";
import AffiliateStat from "./models/afliatedStat.model.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);

app.use("/api/general", generalRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/management", managementRoutes);

app.listen(PORT, () => {
  connectToMongoDb();
  // User.insertMany(dataUser);
  // Products.insertMany(dataProduct);
  // ProductStats.insertMany(dataProductStat);
  // Transactions.insertMany(dataTransaction);
  // OverallStats.insertMany(dataOverallStat);
  // AffiliateStat.insertMany(dataAffiliateStat);
  console.log(`Server running on port ${PORT}`);
});
