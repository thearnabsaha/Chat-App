import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CreateRoom } from "../controllers/room.controller";

const router = Router();

router.post("/create", jwtAuth, CreateRoom);

export default router;