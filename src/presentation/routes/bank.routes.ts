import { Router } from "express";
import { bankController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const bankRouter = Router();

bankRouter.get(
  "/bank",
  authorizationToken,
  bankController.ListAll.bind(bankController),
);
bankRouter.get(
  "/bank/select",
  authorizationToken,
  bankController.Select.bind(bankController),
);
bankRouter.get(
  "/bank/:id",
  authorizationToken,
  bankController.GetById.bind(bankController),
);
bankRouter.post(
  "/bank",
  authorizationToken,
  bankController.Create.bind(bankController),
);
bankRouter.put(
  "/bank/:id",
  authorizationToken,
  bankController.Update.bind(bankController),
);

export { bankRouter };
