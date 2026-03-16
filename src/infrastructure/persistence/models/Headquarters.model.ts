import { Model, DataTypes } from "sequelize";
import db from "../database";
import type { IHeadquarterModel } from "@/domain/models/Headquarter.model";

class Headquarters
  extends Model<IHeadquarterModel>
  implements IHeadquarterModel
{
  public id!: number;
  public name!: string;
  public address!: string;
  public state!: boolean;
}

Headquarters.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    tableName: "Headquarters",
  },
);

export default Headquarters;
