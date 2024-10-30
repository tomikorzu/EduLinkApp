import express from "express";
import db from "../config/users.js";

import { validateAll } from "../middlewares/validateUsers.js";

const router = express.Router();

router.post("/", validateAll, (req, res) => {});

export default router;
