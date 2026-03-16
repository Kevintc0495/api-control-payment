import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 30000,
    },
    port: process.env.DB_SQL as unknown as number,
    timezone: "America/Lima",
  },
);

export const instantiateBD = async () => {
  try {
    await db.authenticate();
    db.sync();
  } catch (_error) {
    /* empty */
  }
};

export default db;
