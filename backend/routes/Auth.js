import express from "express";
import { Register, Login } from "../controllers/Auth.js";
import upload from "../middleware/multer.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", upload.single("profile"), Register);
AuthRoutes.post("/login", Login);

export default AuthRoutes;
