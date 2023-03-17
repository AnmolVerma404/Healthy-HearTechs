import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cookieSession from "cookie-session";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import medicalRoutes from "./routes/medical.js";
import recordRoute from "./routes/records.js";

const app = express();

app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
dotenv.config();

app.use(
  cookieSession({
    keys: process.env.JWT_KEY,
    signed: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/medical", medicalRoutes);
app.use("/api/record", recordRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }
    console.log("Database connected!");
    app.listen(process.env.PORT, () => {
      console.log(`Running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
