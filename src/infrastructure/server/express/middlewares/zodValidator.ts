import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { badRequestResponse } from "../utils/api.responses";

type Target = "body" | "params" | "headers";

export const zodValidator =
  (schema: z.Schema, target: Target = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const parseResponse = schema.safeParse(req[target]);

    if (parseResponse.success) {
      return next();
    }

    return badRequestResponse(res, parseResponse.error.issues[0].message);
  };
