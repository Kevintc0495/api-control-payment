import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IRoleRepository } from "@/application/repositories/iRole.repository";
import type { RoleListRequestDto } from "@/application/dtos/role/roleListRequest.dto";
import type { RoleListResponseDto } from "@/application/dtos/role/roleListResponse.dto";
import type { IRoleListQuery } from "@/application/dtos/role/roleListQuery.interface";
import type { RoleDetailResponseDto } from "@/application/dtos/role/roleDetailResponse.dto";
import type { RoleCreateDto } from "@/application/dtos/role/roleCreate.dto";
import type { RoleUpdateDto } from "@/application/dtos/role/roleUpdate.dto";
import Roles from "../persistence/models/Roles.model";

export class RoleRepository implements IRoleRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: RoleListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<RoleListResponseDto[]>>> {
    const { name, page, rowsPerPage, state } = request;
    const querys = { name, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<IRoleListQuery>(querys);

    const totalRecords = await Roles.count({ where: filters });

    const results = await Roles.findAll({
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
        data: transformed as RoleListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await Roles.findAll({
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
  ): Promise<IApiResponse<RoleDetailResponseDto | null>> {
    const result = await Roles.findByPk(id, {
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
    request: RoleCreateDto,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await Roles.create(
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
    request: RoleUpdateDto,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const { name, state, id } = request;
      const result = await Roles.findByPk(id, { transaction: t });

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
