import express from "express";

// Middlewares
import { validateAll } from "../middlewares/validateUsers.js";
import { checkUser } from "../middlewares/checkUser.js";
import verifyUserLogged from "../middlewares/jwt/verify-user-logged.js";

// routes
import register from "../auth/register.js";
import login from "../auth/login.js";
import changePassword from "../controllers/users/change-password.js";

const router = express.Router();

router.post("/register", validateAll, register);
router.post("/login", checkUser, login);
router.post("/change-password", verifyUserLogged, changePassword);

export default router;
