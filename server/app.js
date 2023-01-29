import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("strictQuery", false);
mongoose
  .connect((process.env.DB_URI))
  .then(() => {
    console.log("Database connected!")
    app.listen(process.env.PORT,()=>{
        console.log(`Running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));


