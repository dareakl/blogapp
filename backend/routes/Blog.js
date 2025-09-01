import express from "express";
import { Create } from "../controllers/Blogs.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/multer.js";

const BlogsRoutes = express.Router();
BlogsRoutes.post("/create", isAdmin, upload.single("postimage"), Create);

export default BlogsRoutes;
