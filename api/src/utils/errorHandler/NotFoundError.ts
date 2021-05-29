import { BaseError } from "./BaseError";
import { httpStatusCode } from "./httpStatusCode";

export class NotFoundError extends BaseError {
  constructor(
    public message: string,
    public description: any = { global: "Not Found" },
    public statusCode = httpStatusCode.NOT_FOUND,
    public isOperational = true
  ) {
    super(message, description, statusCode, isOperational);
  }
}
