import express from "express";
import {
  getDashboardStats,
  getUserByID,
} from "../controllers/general.controller.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);

router.get("/:uid", getUserByID);

export default router;
