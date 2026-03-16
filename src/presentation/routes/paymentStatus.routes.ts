import { Router } from "express";
import { paymentStatusController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const paymentStatusRouter = Router();

paymentStatusRouter.get(
  "/payment-status/select",
  authorizationToken,
  paymentStatusController.Select.bind(paymentStatusController),
);

export { paymentStatusRouter };
