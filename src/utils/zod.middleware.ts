import { NextFunction, Request, Response } from "express";
import { ZodSchema, z } from "zod";

export type TypedRequestHandler<T extends z.infer<z.Schema>> = (
  req: Omit<Request, "body" | "params" | "query"> & T,
  res: Response,
  next: NextFunction
) => void;

export const ZodValidate =
  (schema: z.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
