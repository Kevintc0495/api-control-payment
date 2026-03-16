import { Model, DataTypes } from "sequelize";
import db from "@/infrastructure/persistence/database";
import type { IPaymentModel } from "@/domain/models/Payment.model";
import type { IPaymentStatusModel } from "@/domain/models/PaymentStatus.model";
import type { IPaymentTypeModel } from "@/domain/models/PaymentType.model";
import type { IStudentsModel } from "@/domain/models/Student.model";
import Students from "./Students.model";
import PaymentStatus from "./PaymentStatus.model";
import PaymentTypes from "./PaymentTypes.model";
import Banks from "./Banks.model";

class Payments extends Model<IPaymentModel> implements IPaymentModel {
  public id?: number;
  public idHeadquarter!: number;
  public idStudent!: number;
  public idPaymentStatus!: number;
  public idPaymentType!: number;
  public idBank?: number;
  public idPaymentDetails?: number;
  public customer!: string;
  public documentNumber!: string;
  public cellphone!: string;
  public email!: string;
  public date!: string;
  public code!: string;
  public cancellationComment!: string;
  public comment!: string;
  public amount!: number;
  public otherAmounts!: number;
  public userCreate!: number;
  public userUpdate?: number;
  readonly students?: IStudentsModel;
  readonly typePayment?: IPaymentTypeModel;
  readonly paymentStatus?: IPaymentStatusModel;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

Payments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idHeadquarter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idStudent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Students,
        key: "id",
      },
    },
    idPaymentStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentStatus,
        key: "id",
      },
    },
    idPaymentType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentTypes,
        key: "id",
      },
    },
    idBank: {
      type: DataTypes.INTEGER,
      references: {
        model: Banks,
        key: "id",
      },
    },
    customer: {
      type: DataTypes.STRING,
    },
    documentNumber: {
      type: DataTypes.STRING(12),
    },
    cellphone: {
      type: DataTypes.STRING(12),
    },
    email: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cancellationComment: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    otherAmounts: {
      type: DataTypes.FLOAT,
    },
    userCreate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userUpdate: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "Payments",
  },
);

export default Payments;
