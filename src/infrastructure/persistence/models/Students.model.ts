import { DataTypes, Model } from "sequelize";
import db from "../database";
import DocumentsType from "./DocumentsType.model";
import Headquarters from "./Headquarters.model";
import type { IStudentsModel } from "@/domain/models/Student.model";

class Students extends Model<IStudentsModel> implements IStudentsModel {
  public id!: number;
  public idDocumentsType!: number;
  public idHeadquarter!: number;
  public names!: string;
  public lastName!: string;
  public age!: string;
  public birthday!: string;
  public address!: string;
  public tutorNames!: string;
  public tutorLastName!: string;
  public cellphoneTutor!: string;
  public documentNumber!: string;
  public email!: string;
  public schooling!: string;
  public grate!: string;
  public school!: string;
  public diagnosis!: boolean;
  public medicalReport!: boolean;
  public certificateDisability!: boolean;
  public conadisCard!: boolean;
  public psychologicalReport!: boolean;
  public state!: boolean;
}

Students.init(
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
    idHeadquarter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Headquarters,
        key: "id",
      },
    },
    names: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(3),
    },
    birthday: {
      type: DataTypes.STRING(10),
    },
    address: {
      type: DataTypes.STRING(100),
    },
    tutorNames: {
      type: DataTypes.STRING(50),
    },
    tutorLastName: {
      type: DataTypes.STRING(50),
    },
    cellphoneTutor: {
      type: DataTypes.STRING(15),
    },
    documentNumber: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    schooling: {
      type: DataTypes.STRING(50),
    },
    grate: {
      type: DataTypes.STRING(50),
    },
    school: {
      type: DataTypes.STRING(100),
    },
    diagnosis: {
      type: DataTypes.BOOLEAN,
    },
    medicalReport: {
      type: DataTypes.BOOLEAN,
    },
    certificateDisability: {
      type: DataTypes.BOOLEAN,
    },
    conadisCard: {
      type: DataTypes.BOOLEAN,
    },
    psychologicalReport: {
      type: DataTypes.BOOLEAN,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Students",
  },
);

export default Students;
