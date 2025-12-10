import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const ValidateRequest = (Schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await Schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default ValidateRequest;
