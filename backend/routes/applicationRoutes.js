import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/applicationControllers.js";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/getjobs", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.put("/status/:id/update", isAuthenticated, updateStatus);

export default router;