import { DataTypes, Model } from "sequelize";
import type { IPeopleModel } from "@/domain/models/People.model";
import DocumentsType from "./DocumentsType.model";
import db from "../database";

class Peoples extends Model<IPeopleModel> implements IPeopleModel {
  public id!: number;
  public idDocumentsType!: number;
  public documentNumber!: string;
  public names!: string;
  public lastName!: string;
  public age!: string;
  public birthday!: string;
  public address!: string;
  public cellPhone!: string;
}

Peoples.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idDocumentsType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DocumentsType,
        key: "id",
      },
    },
    documentNumber: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(3),
    },
    birthday: {
      type: DataTypes.STRING(10),
    },
    address: {
      type: DataTypes.STRING,
    },
    cellPhone: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize: db,
    tableName: "Peoples",
  },
);

export default Peoples;
