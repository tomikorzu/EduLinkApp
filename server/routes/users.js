import express from "express";

import { validateAll } from "../middlewares/validateUsers.js";
import { checkUser } from "../middlewares/checkUser.js";

import { register } from "../auth/register.js";
import { login } from "../auth/login.js";

const router = express.Router();

router.post("/register", validateAll, register);
router.post("/login", checkUser, login);

export default router;
