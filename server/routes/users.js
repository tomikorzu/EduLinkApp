import express from "express";

// Middlewares
import { validateAll } from "../middlewares/validateUsers.js";
import { checkUser } from "../middlewares/checkUser.js";
import verifyUserLogged from "../middlewares/jwt/verify-user-logged.js";
import userPayload from "../middlewares/jwt/user-payload.js";

// routes
import register from "../auth/register.js";
import login from "../auth/login.js";
import changePassword from "../controllers/users/change-password.js";

const router = express.Router();

router.post("/register", validateAll, register);
router.post("/login", checkUser, login);
router.patch("/change-password/:id", verifyUserLogged, userPayload, changePassword);

export default router;
