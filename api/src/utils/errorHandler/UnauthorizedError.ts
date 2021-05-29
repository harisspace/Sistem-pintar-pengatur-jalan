import { BaseError } from "./BaseError";
import { httpStatusCode } from "./httpStatusCode";

export class UnauthorizedError extends BaseError {
  constructor(
    public message: string,
    public statusCode = httpStatusCode.UNAUTHORIZED,
    public description: any = { global: "Unauthorized" },
    public isOperational = true
  ) {
    super(message, description, statusCode, isOperational);
  }
}
