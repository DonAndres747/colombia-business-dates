import { Request, Response, NextFunction } from "express";

export function validateDatesParams(req: Request, res: Response, next: NextFunction) {
  const { days, hours, date } = req.query;

  if (!days && !hours) {
    return next(new Error("Params days or hours are required"));
  }

  if (days && isNaN(Number(days))) {
    return next(new Error("Param days must be numeric"));
  }

  if (hours && isNaN(Number(hours))) {
    return next(new Error("Param hours must be numeric"));
  }

  if (date && isNaN(Date.parse(date as string))) {
    return next(new Error("Invalid date value provided."));
  }

  next();
}