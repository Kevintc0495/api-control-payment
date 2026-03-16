import { Router } from "express";
import { paymentTypeController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const paymentTypeRouter = Router();

paymentTypeRouter.get(
  "/payment-type",
  authorizationToken,
  paymentTypeController.ListAll.bind(paymentTypeController),
);
paymentTypeRouter.get(
  "/payment-type/select",
  authorizationToken,
  paymentTypeController.Select.bind(paymentTypeController),
);
paymentTypeRouter.get(
  "/payment-type/:id",
  authorizationToken,
  paymentTypeController.GetById.bind(paymentTypeController),
);
paymentTypeRouter.post(
  "/payment-type",
  authorizationToken,
  paymentTypeController.Create.bind(paymentTypeController),
);
paymentTypeRouter.put(
  "/payment-type/:id",
  authorizationToken,
  paymentTypeController.Update.bind(paymentTypeController),
);

export { paymentTypeRouter };
