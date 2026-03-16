import { Router } from "express";
import { documentTypeController } from "@/infrastructure/utils/dependencies";
import { authorizationToken } from "../middleware/authorization-token.middleware";

const documentTypeRouter = Router();

documentTypeRouter.get(
  "/document-type",
  authorizationToken,
  documentTypeController.ListAll.bind(documentTypeController),
);
documentTypeRouter.get(
  "/document-type/select",
  authorizationToken,
  documentTypeController.Select.bind(documentTypeController),
);
documentTypeRouter.get(
  "/document-type/:id",
  authorizationToken,
  documentTypeController.GetById.bind(documentTypeController),
);
documentTypeRouter.post(
  "/document-type",
  authorizationToken,
  documentTypeController.Create.bind(documentTypeController),
);
documentTypeRouter.put(
  "/document-type/:id",
  authorizationToken,
  documentTypeController.Update.bind(documentTypeController),
);

export { documentTypeRouter };
