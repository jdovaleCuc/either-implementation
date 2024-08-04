import { Response } from "express";

export interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  data?: T;
}

export const apiResponse = (
  res: Response,
  statusCode: number,
  body: ApiResponse
) => {
  res.status(statusCode).json(body);
};

export const successResponse = <T>(res: Response, data?: T) => {
  return apiResponse(res, 200, {
    code: "SUCESSFULL",
    message: "Ok",
    data,
  });
};

export const internalErrorResponse = (res: Response, message: string) => {
  return apiResponse(res, 500, {
    code: "INTERNAL_ERROR",
    message,
  });
};

export const badRequestResponse = (res: Response, message: string) => {
  return apiResponse(res, 500, {
    code: "BadRequest",
    message,
  });
};
