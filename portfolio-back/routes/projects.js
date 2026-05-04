import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { auth, isAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", auth, isAdmin, upload.single("image"), createProject);
router.put("/:id", auth, isAdmin, upload.single("image"), updateProject);
router.delete("/:id", auth, isAdmin, deleteProject);

export default router;
