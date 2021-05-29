import { BaseError } from "./BaseError";
import { httpStatusCode } from "./httpStatusCode";

export class ForbiddenError extends BaseError {
  constructor(
    public message: string,
    public description: any = { global: "Access Forbidden" },
    public statusCode = httpStatusCode.FORBIDDEN,
    public isOperational = true
  ) {
    super(message, description, statusCode, isOperational);
  }
}
