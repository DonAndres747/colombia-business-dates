import express, { Application } from "express";

//routes
import datesRoutes from "./routes/datesRoutes";
//middles
import { errorHandler } from "./middles/errorHandler";

const app: Application = express();

app.use(express.json());

app.use("/business-dates", datesRoutes);

app.use(errorHandler);

export default app;
