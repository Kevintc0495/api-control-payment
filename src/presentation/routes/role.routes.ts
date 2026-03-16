import { Router } from "express";
import { roleController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const roleRouter = Router();

roleRouter.get(
  "/role",
  authorizationToken,
  roleController.ListAll.bind(roleController),
);
roleRouter.get(
  "/role/select",
  authorizationToken,
  roleController.Select.bind(roleController),
);
roleRouter.get(
  "/role/:id",
  authorizationToken,
  roleController.GetById.bind(roleController),
);
roleRouter.post(
  "/role",
  authorizationToken,
  roleController.Create.bind(roleController),
);
roleRouter.put(
  "/role/:id",
  authorizationToken,
  roleController.Update.bind(roleController),
);

export { roleRouter };
