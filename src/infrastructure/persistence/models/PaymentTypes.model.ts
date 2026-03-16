import { DataTypes, Model } from "sequelize";
import db from "../database";
import type { IPaymentTypeModel } from "@/domain/models/PaymentType.model";

class PaymentTypes
  extends Model<IPaymentTypeModel>
  implements IPaymentTypeModel
{
  public id!: number;
  public name!: string;
  public state!: boolean;
}

PaymentTypes.init(
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
    },
  },
  {
    sequelize: db,
    tableName: "PaymentTypes",
  },
);

export default PaymentTypes;
