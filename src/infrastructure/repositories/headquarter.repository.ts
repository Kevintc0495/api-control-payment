import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IHeadquarterRepository } from "@/application/repositories/iHeadquarter.repository";
import type { HeadquarterListRequestDto } from "@/application/dtos/headquarter/headquarterListRequest.dto";
import type { HeadquarterListResponseDto } from "@/application/dtos/headquarter/headquarterListResponse.dto";
import type { HeadquarterDetailResponseDto } from "@/application/dtos/headquarter/headquarterDetailResponse.dto";
import type { HeadquarterCreateDto } from "@/application/dtos/headquarter/headquarterCreate.dto";
import type { HeadquarterUpdateDto } from "@/application/dtos/headquarter/headquarterUpdate.dto";
import type { IHeadquarterListQuery } from "@/application/dtos/headquarter/headquarterListQuery.interface";
import Headquarters from "../persistence/models/Headquarters.model";

export class HeadquarterRepository implements IHeadquarterRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: HeadquarterListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<HeadquarterListResponseDto[]>>
  > {
    const { name, page, rowsPerPage, state } = request;
    const querys = { name, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<IHeadquarterListQuery>(querys);

    const totalRecords = await Headquarters.count({ where: filters });

    const results = await Headquarters.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      limit: pageSize,
      offset,
    });

    const transformed = results?.map((register) => ({
      id: register.id,
      name: register.name,
      address: register.address,
      state: register.state ? "Activo" : "Inactivo",
    }));

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: {
        data: transformed as HeadquarterListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await Headquarters.findAll({
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
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>> {
    const result = await Headquarters.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (result == null)
      throw new NotFoundException("Tipo de documento", id.toString());

    const transformed = {
      id: result.id,
      name: result.name,
      address: result.address,
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
    request: HeadquarterCreateDto,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await Headquarters.create(
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
        address: result.address,
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
    request: HeadquarterUpdateDto,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const { address, name, state, id } = request;
      const result = await Headquarters.findByPk(id, { transaction: t });

      if (result == null) throw new NotFoundException("Bank", id.toString());

      result.name = name;
      result.address = address;
      result.state = state === "1" ? true : false;

      await result.save({ transaction: t });

      const transformed = {
        id: result.id,
        name: result.name,
        address: result.address,
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
