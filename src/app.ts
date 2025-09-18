import express, { Application } from "express";
import dotenv from "dotenv"

import datesRoutes from "./routes/datesRoutes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use("/business-dates", datesRoutes);

export default app;
