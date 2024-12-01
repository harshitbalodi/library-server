import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import { configDotenv } from "dotenv";
import { deskRoutes } from "./routes/deskRoutes.js";
import { hallRoutes } from "./routes/hallRoutes.js";
import { paymentRoutes } from "./routes/paymentRoutes.js";
import { studentRoutes } from "./routes/studentRoutes.js";
import { shiftRoutes } from "./routes/shiftRoutes.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());  

app.use('/v1/api/desk', deskRoutes);
app.use('/v1/api/hall', hallRoutes);
app.use('/v1/api/payment', paymentRoutes);
app.use('/v1/api/shift', shiftRoutes);
app.use('/v1/api/student', studentRoutes);

export { app, sequelize };