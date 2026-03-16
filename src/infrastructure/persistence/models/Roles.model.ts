import { DataTypes, Model } from "sequelize";
import db from "../database";
import type { IRoleModel } from "@/domain/models/Role.model";

class Roles extends Model<IRoleModel> implements IRoleModel {
  public id!: number;
  public name!: string;
  public state!: boolean;
}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Roles",
  },
);

export default Roles;
