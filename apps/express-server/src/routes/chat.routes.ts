import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { AllChats, CreateChats, deleteAllChats, deleteChat, deleteRoomChat, RoomChats, updateChat } from "../controllers/chat.controller";

const router = Router();

router.post("/", jwtAuth, CreateChats);
router.get("/", jwtAuth, AllChats);
router.get("/:id", jwtAuth, RoomChats);
router.put("/:id", jwtAuth, updateChat);
router.delete("/:id", jwtAuth, deleteChat);
router.delete("/room/:id", jwtAuth, deleteRoomChat);
router.delete("/", jwtAuth, deleteAllChats);

export default router;