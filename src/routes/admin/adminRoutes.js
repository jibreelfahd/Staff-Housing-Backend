import express from "express";
const router = express.Router();

import {
  signUp,
  login,
  getAllApplications,
  getSingleApplication,
  getAllApplicationRequests,
  getAllMaintenanceRequests,
  getAllRetirementRequests,
  getSingleApplicationRequest,
  getSingleMaintenanceRequest,
  getSingleRetirementRequest,
} from "../../controllers/admin/adminController.js";

router.post("/signup", signUp);
router.post("/login", login);
router.get("/request/all/applications", getAllApplications);
router.get("/request/applications/:id", getSingleApplication);
router.get("/request/applications/applications", getAllApplicationRequests);
router.get("/request/applications/maintenance", getAllMaintenanceRequests);
router.get("/request/applications/retirement", getAllRetirementRequests);
router.get(
  "/request/applications/applications/:id",
  getSingleApplicationRequest
);
router.get(
  "/request/applications/maintenance/:id",
  getSingleMaintenanceRequest
);
router.get("/request/applications/retirement/:id", getSingleRetirementRequest);

export default router;
