import { NextFunction, Request, Response } from "express";

// === GET METHOD ===
export const dashboard = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
};
// === POST METHOD ===
