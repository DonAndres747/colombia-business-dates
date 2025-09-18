import { Request, Response } from "express";


export const datesController = (req: Request, res: Response) => {
    const { days, hours, date } = req.query;
    
    res.status(200).json({ mess: "todo nice", ...req.query });
}