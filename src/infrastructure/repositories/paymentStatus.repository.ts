import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import type { IPaymentStatusRepository } from "@/application/repositories/iPaymentStatus.repository";
import PaymentStatus from "../persistence/models/PaymentStatus.model";

export class PaymentStatusRepository implements IPaymentStatusRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await PaymentStatus.findAll({
      attributes: ["id", "name"],
    });
    const transform = results?.map((register) => ({
      id: register?.id.toString(),
      label: register?.name,
    }));

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: transform as SelectResponseDto[],
      status: 200,
    };

    return response;
  }
}
