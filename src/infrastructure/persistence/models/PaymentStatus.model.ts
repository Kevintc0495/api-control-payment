import { DataTypes, Model } from "sequelize";
import db from "../database";
import type { IPaymentStatusModel } from "@/domain/models/PaymentStatus.model";

class PaymentStatus
  extends Model<IPaymentStatusModel>
  implements IPaymentStatusModel
{
  public id!: number;
  public name!: string;
  public state!: boolean;
}

PaymentStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    tableName: "PaymentStatus",
  },
);

export default PaymentStatus;
