import { BaseError } from "./BaseError";
import { httpStatusCode } from "./httpStatusCode";

export class UnauthorizedError extends BaseError {
  constructor(
    public message: string,
    public description: any = { global: "Unauthorized" },
    public statusCode = httpStatusCode.UNAUTHORIZED,
    public isOperational = true
  ) {
    super(message, description, statusCode, isOperational);
  }
}
