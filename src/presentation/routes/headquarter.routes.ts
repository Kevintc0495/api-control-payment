import { Router } from "express";
import { headquarterController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const headquarterRouter = Router();

headquarterRouter.get(
  "/headquarter",
  authorizationToken,
  headquarterController.ListAll.bind(headquarterController),
);
headquarterRouter.get(
  "/headquarter/select",
  authorizationToken,
  headquarterController.Select.bind(headquarterController),
);
headquarterRouter.get(
  "/headquarter/:id",
  authorizationToken,
  headquarterController.GetById.bind(headquarterController),
);
headquarterRouter.post(
  "/headquarter",
  authorizationToken,
  headquarterController.Create.bind(headquarterController),
);
headquarterRouter.put(
  "/headquarter/:id",
  authorizationToken,
  headquarterController.Update.bind(headquarterController),
);

export { headquarterRouter };
