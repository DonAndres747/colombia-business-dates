import { Router } from "express";

//routes
import { datesController } from "../controllers/datesController";
//middlewares 
import { validateDatesParams } from "../middles/validateDatesParams";

const router = Router();

router.get('/', validateDatesParams, datesController);

export default router;