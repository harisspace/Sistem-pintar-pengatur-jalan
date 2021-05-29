import { NextFunction, Request, Response } from "express";
import { BaseError } from "./BaseError";

export function logError(err: any) {
  console.error(err);
}

export function logErrorMiddleware(
  err: any,
  _: Request,
  __: Response,
  next: NextFunction
) {
  logError(err);
  next(err);
}

export function returnError(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, errors: err.description });
}

export function isOperationalError(error: any) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}
