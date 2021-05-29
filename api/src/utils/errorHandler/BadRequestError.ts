import { BaseError } from "./BaseError";
import { httpStatusCode } from "./httpStatusCode";

export class BadRequestError extends BaseError {
  constructor(
    public message: string,
    public description: any = { global: "Bad Request Input" },
    public statusCode = httpStatusCode.BAD_REQUEST,
    public isOperational = true
  ) {
    super(message, description, statusCode, isOperational);
  }
}
