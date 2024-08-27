import e from "express";
import cors from "cors";
import sequelize from "./config/db";
import { authRoutes } from "./routes/authRoutes";
import { deskRoutes } from "./routes/deskRoutes";
import { hallRoutes } from "./routes/hallRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";
import { studentRoutes } from "./routes/studentRoutes";
import { shiftRoutes } from "./routes/shiftRoutes";
import { configDotenv } from "dotenv";
configDotenv();
const app = e();
app.use(cors());
app.use(e.json());  

app.use('/v1/api', authRoutes);
app.use('/v1/api/desk', deskRoutes);
app.use('/v1/api/hall', hallRoutes);
app.use('/v1/api/payment', paymentRoutes);
app.use('/v1/api/shift', shiftRoutes);
app.use('/v1/api/student', studentRoutes);

const PORT = process.env.PORT || 3003;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});