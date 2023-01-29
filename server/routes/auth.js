import express from "express";
import { body } from "express-validator";

import User from "../models/user.js";
import {signup, login} from "../controllers/auth.js";

const router = new express.Router();

router.route('/signup').get((req, res, next) => {
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
});

router.route('/login').post((req, res, next) => {res.send('/login'), login});

export default router;
