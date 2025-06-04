import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { AllChats, CreateChats, deleteChat, deleteChats, updateChat } from "../controllers/chat.controller";

const router = Router();

router.post("/", jwtAuth, CreateChats);
router.get("/", jwtAuth, AllChats);
router.put("/:id", jwtAuth, updateChat);
router.delete("/:id", jwtAuth, deleteChat);
router.delete("/delete", jwtAuth, deleteChats);

export default router;