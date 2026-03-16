import type { Sequelize } from "sequelize";
import type { IBankRepository } from "@/application/repositories/iBank.repository";
import type { BankListRequestDto } from "@/application/dtos/bank/bankListRequest.dto";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import type { BankListResponseDto } from "@/application/dtos/bank/bankListResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import Banks from "../persistence/models/Banks.model";
import type { IBankListQuery } from "@/application/dtos/bank/bankListQuery.interface";
import type { BankDetailResponseDto } from "@/application/dtos/bank/bankDetail.Response.dto";
import type { BankCreateDto } from "@/application/dtos/bank/bankCreate.dto";
import type { BankUpdateDto } from "@/application/dtos/bank/bankUpdate.dto";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import { NotFoundException } from "@/application/exceptions/not-found.exception";

export class BankRepository implements IBankRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: BankListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<BankListResponseDto[]>>> {
    const { name, page, rowsPerPage, state } = request;
    const querys = { name, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<Partial<IBankListQuery>>(querys);

    const results = await Banks.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      limit: pageSize,
      offset,
    });

    const totalRecords = await Banks.count({ where: filters });

    const data = results.map((register) => ({
      id: register.id,
      account: register.account,
      cci: register.cci,
      name: register.name,
      state: register.state ? "Activo" : "Inactivo",
    }));

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: {
        data: data as BankListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await Banks.findAll({
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
  ): Promise<IApiResponse<BankDetailResponseDto | null>> {
    const result = await Banks.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (result == null) throw new NotFoundException("Bank", id.toString());

    const transformed = {
      id: result.id,
      account: result.account,
      cci: result.cci,
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
    request: BankCreateDto,
  ): Promise<IApiResponse<BankDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await Banks.create(
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
        account: result.account,
        cci: result.cci,
        name: result.name,
        state: result.state ? "1" : "0",
      };

      await t.commit();
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
    request: BankUpdateDto,
  ): Promise<IApiResponse<BankDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const { account, cci, name, state, id } = request;
      const result = await Banks.findByPk(id, { transaction: t });

      if (result == null) throw new NotFoundException("Bank", id.toString());

      result.name = name;
      result.account = account;
      result.cci = cci;
      if (state) result.state = state === "1" ? true : false;

      await result.save({ transaction: t });

      const transformed = {
        id: result.id,
        account: result.account,
        cci: result.cci,
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
