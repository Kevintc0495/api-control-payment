import { Router } from "express";
import { userController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const userRouter = Router();

userRouter.get(
  "/user",
  authorizationToken,
  userController.ListAll.bind(userController),
);
userRouter.get(
  "/user/:id",
  authorizationToken,
  userController.GetById.bind(userController),
);
userRouter.post(
  "/user",
  authorizationToken,
  userController.Create.bind(userController),
);
userRouter.put(
  "/user/:id",
  authorizationToken,
  userController.Update.bind(userController),
);

export { userRouter };
