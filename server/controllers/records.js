import { validationResult } from "express-validator";
import * as dotenv from "dotenv";

import { Record } from '../models/records.js';

dotenv.config();

export const saveRecords = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed! Entered data is invalid");
    error.statusCode = 422;
    return next(error);
  }
  const { doctorName, phone, hospitalName, medicalCondition, appointDate } =
    req.body;
  try {
    const userData = jwt.verify(req.body.jwt, process.env.JWT_KEY);
    const userId = userData.userId;
    const record = new Record({
      userId,
      doctorName,
      phone,
      hospitalName,
      medicalCondition,
      appointDate,
    });
    await record.save();
    res.status(201).json({
      message: "New Record inserted successfully",
      record: record,
      createdBy: { _id: userId, recordId: record._id },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
