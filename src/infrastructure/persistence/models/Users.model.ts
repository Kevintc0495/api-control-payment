import { DataTypes, Model } from "sequelize";
import type { IPeopleModel } from "@/domain/models/People.model";
import type { IUserModel } from "@/domain/models/User.model";
import Roles from "./Roles.model";
import Peoples from "./Peoples.model";
import db from "../database";

class Users extends Model<IUserModel> implements IUserModel {
  public id!: number;
  public idRole!: number;
  public idPeople!: number;
  public email!: string;
  public password!: string;
  public state!: boolean;
  public code!: string;
  public userCreate?: number;
  public userUpdate?: number;
  readonly people?: IPeopleModel;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Roles,
        key: "id",
      },
    },
    idPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Peoples,
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(6),
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userCreate: {
      type: DataTypes.INTEGER,
    },
    userUpdate: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "Users",
  },
);

export default Users;
