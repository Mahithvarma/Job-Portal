import express from "express";
import { postJob, getAllJobs, getJobById, getAdminJobs } from "../controllers/jobControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/getall", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

export default router;