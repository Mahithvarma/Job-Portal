import express from "express";
import { RegisterCompany, getCompanies, getCompanyById, updateCompany } from "../controllers/companyControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", isAuthenticated, RegisterCompany);
router.get("/getall", isAuthenticated, getCompanies);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;