import { Model, DataTypes } from "sequelize";
import db from "@/infrastructure/persistence/database";
import type { IBankModel } from "@/domain/models/Bank.model";

class Banks extends Model<IBankModel> implements IBankModel {
  public id!: number;
  public name!: string;
  public account!: string;
  public cci!: string;
  public state!: boolean;
}

Banks.init(
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
    account: {
      type: DataTypes.STRING,
    },
    cci: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    tableName: "Banks",
  },
);

export default Banks;
