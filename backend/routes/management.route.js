import express from "express";
import {
  getAdmins,
  getPerformanceByUser,
} from "../controllers/management.controller.js";

const router = express.Router();

router.get("/admins", getAdmins);

router.get("/performance/:userID", getPerformanceByUser);

export default router;
