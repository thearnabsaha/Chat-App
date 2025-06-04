import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CreateRoom, deleteRoom, deleteRooms, FindRoom, FindRooms, UpdateRoom } from "../controllers/room.controller";

const router = Router();

router.post("/create", jwtAuth, CreateRoom);
router.get("/", jwtAuth, FindRooms);
router.get("/:id", jwtAuth, FindRoom);
router.put("/:id", jwtAuth, UpdateRoom);
router.delete("/:id", jwtAuth, deleteRoom);
router.delete("/", jwtAuth, deleteRooms);

export default router;