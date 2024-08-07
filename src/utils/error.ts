import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  statusCode: number,
  message: string
): CustomError => {
  const error: CustomError = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};

export const errorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(error.statusCode || 500).json({
    message: error.message || "An unexpected error occurred",
  });
};
