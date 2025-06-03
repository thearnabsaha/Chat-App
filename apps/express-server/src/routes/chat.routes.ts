import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CreateChats } from "../controllers/chat.controller";

const router = Router();

router.post("/create", jwtAuth, CreateChats);

export default router;