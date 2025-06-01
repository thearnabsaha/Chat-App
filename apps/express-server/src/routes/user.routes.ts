import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { HealthCheck, UserProfile, UserSignIn, UserSignUp } from "../controllers/user.controller";

const router = Router();

router.post("/signup", UserSignUp);
router.post("/signin", UserSignIn);
router.get("/health", HealthCheck);
router.get("/me", jwtAuth, UserProfile);

export default router;