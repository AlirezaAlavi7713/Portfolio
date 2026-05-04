import { Router } from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/contactController.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", sendMessage);
router.get("/", auth, isAdmin, getMessages);
router.delete("/:id", auth, isAdmin, deleteMessage);

export default router;
