import { Router } from "express";
import { studentController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const studentRouter = Router();

studentRouter.get(
  "/student",
  authorizationToken,
  studentController.ListAll.bind(studentController),
);
studentRouter.get(
  "/student/select",
  authorizationToken,
  studentController.Select.bind(studentController),
);
studentRouter.get(
  "/student/:id",
  authorizationToken,
  studentController.GetById.bind(studentController),
);
studentRouter.post(
  "/student",
  authorizationToken,
  studentController.Create.bind(studentController),
);
studentRouter.put(
  "/student/:id",
  authorizationToken,
  studentController.Update.bind(studentController),
);

export { studentRouter };
