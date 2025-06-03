import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CreateRoom, deleteRoom, deleteRooms, FindRoom, FindRooms, UpdateRoom } from "../controllers/room.controller";

const router = Router();

router.post("/create", jwtAuth, CreateRoom);
router.post("/find", jwtAuth, FindRooms);
router.post("/find/:id", jwtAuth, FindRoom);
router.post("/update/:id", jwtAuth, UpdateRoom);
router.post("/delete/:id", jwtAuth, deleteRoom);
router.post("/delete", jwtAuth, deleteRooms);

export default router;