import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import { configDotenv } from "dotenv";
import deskRoutes from "./controllers/deskRoutes.js";
import hallRoutes from "./controllers/hallRoutes.js";
import paymentRoutes from "./controllers/paymentRoutes.js";
import studentRoutes from "./controllers/studentRoutes.js";
import shiftRoutes from "./controllers/shiftRoutes.js";
import authRoutes from "./controllers/authRoutes.js";
import userRoutes from "./controllers/userRoutes.js";
configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/v1/api/user', userRoutes);
app.use('/v1/api/token', authRoutes);
app.use('/v1/api/desk', deskRoutes);
app.use('/v1/api/hall', hallRoutes);
app.use('/v1/api/payment', paymentRoutes);
app.use('/v1/api/shift', shiftRoutes);
app.use('/v1/api/student', studentRoutes);

export { app, sequelize };