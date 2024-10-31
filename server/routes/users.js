import express from "express";

import { validateAll } from "../middlewares/validateUsers.js";
import { register } from "../auth/register.js";

const router = express.Router();

router.post("/register", validateAll, register);

export default router;
