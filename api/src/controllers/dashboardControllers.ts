import { NextFunction, Request, Response } from "express";

export default {
  // === GET METHOD ===
  dashboard: (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
  },
  // === POST METHOD ===
};
