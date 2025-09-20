import { Request, Response } from "express";

import { getBusinessDateByDays, getBusinessDateByHour } from "../services/datesService";
import { nowInColombia, fromUTC, toUTC } from "../utils/dateUtils"

/**
 * Controller for business date calculations.
 * - Calculates business days and hours with given date or now time.
 * - Responds with the resulting business date as JSON.
 */
export const datesController = async (req: Request, res: Response) => {
    const { days, hours, date } = req.query;

    let currentDate: Date = date
        ? fromUTC(date as string)
        : nowInColombia();

    console.log("initialDate", currentDate);

    if (days) {
        currentDate = await getBusinessDateByDays(currentDate, Number(days));
    }

    if (hours) {
        currentDate = await getBusinessDateByHour(currentDate, Number(hours));
    }


    const utcDate: Date = toUTC(currentDate);
    console.log("send Date", utcDate.toISOString());

    res.status(200).json({ date: utcDate.toISOString() });
}
