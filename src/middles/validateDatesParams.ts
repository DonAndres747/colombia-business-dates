import { Request, Response, NextFunction } from "express";


/**
 * Middleware to validate query parameters for business date calculation.
 * Ensures that `days` or `hours` are provided and numeric, 
 * and that `date` is a valid date string if present.
 */
export function validateDatesParams(req: Request, res: Response, next: NextFunction) {
  const { days, hours, date } = req.query;

  if (!days && !hours) {
    const err = new Error("Params 'days' or 'hours' are required");
    err.name = "InvalidParameters";
    return next(err);
  }

  if (days && (isNaN(Number(days)) || Number(days) < 0)) {
    const err = new Error("Param 'days' must be a positive number");
    err.name = "InvalidParameters";
    return next(err);
  }

  if (hours && (isNaN(Number(hours)) || Number(hours) < 0)) {
    const err = new Error("Param 'hours' must be a positive number");
    err.name = "InvalidParameters";
    return next(err);
  }

  if (date && isNaN(Date.parse(date as string))) {
    const err = new Error("Invalid date value provided.");
    err.name = "InvalidParameters";
    return next(err);
  }


  next();
}