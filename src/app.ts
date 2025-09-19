import express, { Application } from "express"; 

import datesRoutes from "./routes/datesRoutes";

const app: Application = express();

app.use(express.json());
app.use("/business-dates", datesRoutes);

export default app;
