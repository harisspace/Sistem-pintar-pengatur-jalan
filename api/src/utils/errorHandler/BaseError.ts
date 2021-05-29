export class BaseError extends Error {
  public message: string;
  public statusCode: number;
  public isOperational: boolean;
  public description: any;
  constructor(
    message: string,
    description: any,
    statusCode: number,
    isOperational: boolean
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.description = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
