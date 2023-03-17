import express from "express";
import { body } from "express-validator";

import { isAuth } from "../middleware/is-auth.js";
import { saveRecords } from "../controllers/records.js";

const router = express.Router();

router.post(
  "/",
  isAuth,
  [
    body("doctorName").trim().isLength({ min: 3 }),
    body("phone").trim().isLength({ min: 10 }),
    body("hospitalName").trim().isLength({ min: 3 }),
    body("medicalCondition").trim().isLength({ min: 3 }),
    body("appointDate").isDate(),
  ],
  saveRecords
);

export default router;
