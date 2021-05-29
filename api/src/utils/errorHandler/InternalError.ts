import { BaseError } from "./BaseError";
import { httpStatusCode } from "./httpStatusCode";

export class InternalError extends BaseError {
  constructor(
    public message: string,
    public statusCode = httpStatusCode.INTERNAL_SERVER,
    public description: any = { global: "Something Went Wrong" },
    public isOperational = true
  ) {
    super(message, description, statusCode, isOperational);
  }
}
