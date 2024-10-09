import express from "express";
const router = express.Router();

import {
  signUp,
  applicationRequest,
  maintenanceRequest,
  retirementRequest,
} from "../../controllers/staff/staffController.js";

router.post("/signup", signUp);
router.post("/application/request", applicationRequest);
router.post("/maintenance/request", maintenanceRequest);
router.post("/retirement/request", retirementRequest);

export default router;
