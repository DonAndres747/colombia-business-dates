import { Request, Response } from "express";

import { getBusinessDateByDays, getBusinessDateByHour } from "../services/datesService";

/**
 * Controller for business date calculations.
 * - Calculates business days and hours with given date or now time.
 * - Responds with the resulting business date as JSON.
 */
export const datesController = async (req: Request, res: Response) => {
    const { days, hours, date } = req.query;

    let currentDate: Date = date ? new Date(date as string) : new Date();

    if (days) {
        currentDate = await getBusinessDateByDays(currentDate, Number(days));
    }

    if (hours) {
        currentDate = await getBusinessDateByHour(currentDate, Number(hours));
    }
    
    res.status(200).json({ date: currentDate });
}
