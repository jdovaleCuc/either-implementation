import { Request, Response } from "express";
import { GetUserByEmailUsecase } from "../../../../../app/usecases/getUserByEmail.usecase";
import { CacheUserRepository } from "../../../../repositories/cacheUserRepository";
import {
  internalErrorResponse,
  successResponse,
} from "../../utils/api.responses";

const getUserByEmailUsecase = new GetUserByEmailUsecase(
  new CacheUserRepository()
);

export const getUserByEmailController = async (req: Request, res: Response) => {
  const { email } = req.params;

  const response = await getUserByEmailUsecase.run(email);

  response.fold({
    fnError: (error) => {
      return internalErrorResponse(res, error.message);
    },
    fnOk: (value) => {
      return successResponse(res, value);
    },
  });
};
