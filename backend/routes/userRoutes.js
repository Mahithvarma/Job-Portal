import express from "express";
import { Register, Login, Logout, updateProfile } from "../controllers/userControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", singleUpload, Register);
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.get("/logout", Logout);

export default router;