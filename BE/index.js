import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import routes from "./routes/Routes.js";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
