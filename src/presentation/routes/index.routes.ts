import { Router } from "express";
import { bankRouter } from "./bank.routes";
import { documentTypeRouter } from "./documentType.routes";
import { accountRouter } from "./account.routes";
import { headquarterRouter } from "./headquarter.routes";
import { paymentStatusRouter } from "./paymentStatus.routes";
import { paymentTypeRouter } from "./paymentType.routes";
import { roleRouter } from "./role.routes";
import { studentRouter } from "./student.routes";
import { userRouter } from "./user.routes";

const router = Router();
router.get("/test", (_req, res) => {
  res.send("App funcionando!");
});
router.use(bankRouter);
router.use(documentTypeRouter);
router.use(accountRouter);
router.use(headquarterRouter);
router.use(paymentStatusRouter);
router.use(paymentTypeRouter);
router.use(roleRouter);
router.use(studentRouter);
router.use(userRouter);

export { router };
