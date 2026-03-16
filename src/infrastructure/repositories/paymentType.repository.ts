import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import { buildFilters } from "../utils/buildFilters";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IPaymentTypeRepository } from "@/application/repositories/iPaymentType.repository";
import type { PaymentTypeListRequestDto } from "@/application/dtos/paymentType/paymentTypeListRequest.dto";
import type { PaymentTypeListResponseDto } from "@/application/dtos/paymentType/paymentTypeListResponse.dto";
import type { IPaymentTypeListQuery } from "@/application/dtos/paymentType/paymentTypeListQuery.interface";
import type { PaymentTypeDetailResponseDto } from "@/application/dtos/paymentType/paymentTypeDetail.Response.dto";
import type { PaymentTypeCreateDto } from "@/application/dtos/paymentType/paymentTypeCreate.dto";
import type { PaymentTypeUpdateDto } from "@/application/dtos/paymentType/paymentTypeUpdate.dto";
import PaymentTypes from "../persistence/models/PaymentTypes.model";

export class PaymentTypeRepository implements IPaymentTypeRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: PaymentTypeListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<PaymentTypeListResponseDto[]>>
  > {
    const { name, page, rowsPerPage, state } = request;
    const querys = { name, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<IPaymentTypeListQuery>(querys);

    const totalRecords = await PaymentTypes.count({ where: filters });

    const results = await PaymentTypes.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      limit: pageSize,
      offset,
    });

    const transformed = results?.map((register) => ({
      id: register.id,
      name: register.name,
      state: register.state ? "Activo" : "Inactivo",
    }));

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: {
        data: transformed as PaymentTypeListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await PaymentTypes.findAll({
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

  async GetById(
    id: number,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>> {
    const result = await PaymentTypes.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (result == null)
      throw new NotFoundException("Tipo de documento", id.toString());

    const transformed = {
      id: result.id,
      name: result.name,
      state: result.state ? "1" : "0",
    };

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: transformed,
      status: 200,
    };

    return response;
  }

  async Create(
    request: PaymentTypeCreateDto,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await PaymentTypes.create(
        { ...request, state: true },
        { transaction: t },
      );

      if (!result)
        return {
          message: "No se pudo crear el registro",
          data: null,
          status: 500,
        };

      const transformed = {
        id: result.id,
        name: result.name,
        state: result.state ? "1" : "0",
      };

      return {
        message: "El registro se ha creado correctamente",
        data: transformed,
        status: 201,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async Update(
    request: PaymentTypeUpdateDto,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const { name, state, id } = request;
      const result = await PaymentTypes.findByPk(id, { transaction: t });

      if (result == null) throw new NotFoundException("Bank", id.toString());

      result.name = name;
      result.state = state === "1" ? true : false;

      await result.save({ transaction: t });

      const transformed = {
        id: result.id,
        name: result.name,
        state: result.state ? "1" : "0",
      };

      await t.commit();
      return {
        message: "El registro se ha actualizado correctamente",
        data: transformed,
        status: 200,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
