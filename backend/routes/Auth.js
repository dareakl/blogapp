import express from "express";
import { Register } from "../controllers/Auth.js";
import upload from "../middleware/multer.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", upload.single("profile"), Register);

export default AuthRoutes;
