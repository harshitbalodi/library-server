import { configDotenv } from "dotenv";
import app from "./src/app.js";
configDotenv();

const port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(`Server is running on  http:localhost:${port}`);
});	