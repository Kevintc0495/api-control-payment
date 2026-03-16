import { Router } from "express";
import { accountController } from "@/infrastructure/utils/dependencies";

const accountRouter = Router();

accountRouter.post("/login", accountController.Login.bind(accountController));

accountRouter.post(
  "/password-recovery",
  accountController.RecoveryPassword.bind(accountController),
);

accountRouter.post(
  "/password-change",
  accountController.ChangePassword.bind(accountController),
);

export { accountRouter };
