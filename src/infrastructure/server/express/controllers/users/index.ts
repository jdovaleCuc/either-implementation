import { z } from "zod";
import { Router } from "../..";
import { zodValidator } from "../../middlewares/zodValidator";
import { getUserByEmailController } from "./getUserByEmail.controller";

const userConfig: Router = {
  basePath: "/user",
  routes: [
    {
      method: "get",
      handler: getUserByEmailController,
      path: "/:email",
      middlewares: [
        zodValidator(z.object({ email: z.string().email() }), "params"),
      ],
    },
  ],
};

export default userConfig;
