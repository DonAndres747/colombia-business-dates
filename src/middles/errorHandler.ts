import { NextFunction, Request, Response } from "express";

/**
 * Express error handling middleware.
 */
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = (error as any).statusCode || (error.name === "InvalidParameters" ? 400 : 500);

    res.status(statusCode).json({
        name: error.name,
        message: error.message,
    });
}