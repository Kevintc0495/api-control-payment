import { Model, DataTypes } from "sequelize";
import db from "../database";
import type { IDocumentTypeModel } from "@/domain/models/DocumentType.model";

class DocumentsType
  extends Model<IDocumentTypeModel>
  implements IDocumentTypeModel
{
  public id!: number;
  public name!: string;
  public state!: boolean;
}

DocumentsType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "DocumentsType",
  },
);

export default DocumentsType;
