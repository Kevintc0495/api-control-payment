import "module-alias/register";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { instantiateBD } from "./infrastructure/persistence/database";
import { router } from "./presentation/routes/index.routes";
import errorMiddleware from "./presentation/middleware/error.middleware";
import defineAssociations from "./infrastructure/persistence/associations.model";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Definir asociaciones
defineAssociations();

// Instanciar BD
instantiateBD();

// Routes
app.use("/api", router);

// Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
