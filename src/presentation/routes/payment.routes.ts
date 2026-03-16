import { Router } from "express";
import { paymentController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const paymentRouter = Router();

paymentRouter.get(
  "/payment",
  authorizationToken,
  paymentController.ListAll.bind(paymentController),
);
paymentRouter.get(
  "/payment/excel",
  authorizationToken,
  paymentController.GenerateExcel.bind(paymentController),
);
paymentRouter.get(
  "/payment/pdf/:id",
  authorizationToken,
  paymentController.GeneratePdf.bind(paymentController),
);
paymentRouter.get(
  "/payment/:id",
  authorizationToken,
  paymentController.GetById.bind(paymentController),
);
paymentRouter.post(
  "/payment",
  authorizationToken,
  paymentController.Create.bind(paymentController),
);
paymentRouter.put(
  "/payment/:id",
  authorizationToken,
  paymentController.Update.bind(paymentController),
);

export { paymentRouter };
