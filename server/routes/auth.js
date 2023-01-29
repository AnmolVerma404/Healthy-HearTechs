import express from "express";
import { body } from "express-validator";
import {signup, login} from "../controllers/auth.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

router.post('/login', login);

export default router;
