import { DateTime } from "luxon";
import { Request, Response } from "express";

import { getBusinessDateByDays, getBusinessDateByHour } from "../services/datesService";

/**
 * Controller for business date calculations.
 * - Calculates business days and hours with given date or now time.
 * - Responds with the resulting business date as JSON.
 */
export const datesController = async (req: Request, res: Response) => {
    const { days, hours, date } = req.query;

    const CO_TZ = "America/Bogota";

    let currentDate: Date = date
        ? DateTime.fromISO(date as string, { zone: "utc" })
            .setZone(CO_TZ)
            .toJSDate()
        : DateTime.now()
            .setZone(CO_TZ)
            .toJSDate();

    console.log("initialDate");
    console.log(currentDate);

    if (days) {
        currentDate = await getBusinessDateByDays(currentDate, Number(days));
    }

    if (hours) {
        currentDate = await getBusinessDateByHour(currentDate, Number(hours));
    }


    console.log("send Date");
    console.log(currentDate.toISOString());
    console.log(DateTime.fromJSDate(currentDate).setZone("America/Bogota").toISO());

    res.status(200).json({ date: currentDate.toISOString() });
}
