import { configDotenv } from "dotenv";
import { app, sequelize } from "./src/app.js";

configDotenv();

const PORT = process.env.PORT || 3003;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to start the server:', err);
});