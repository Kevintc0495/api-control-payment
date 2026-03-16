import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IDocumentTypeRepository } from "@/application/repositories/iDocumentType.repository";
import type { DocumentTypeListRequestDto } from "@/application/dtos/documentType/documentTypeListRequest.dto";
import type { DocumentTypeListResponseDto } from "@/application/dtos/documentType/documentTypeListResponse.dto";
import type { DocumentTypeDetailResponseDto } from "@/application/dtos/documentType/documentTypeDetail.Response.dto";
import type { DocumentTypeCreateDto } from "@/application/dtos/documentType/documentTypeCreate.dto";
import type { DocumentTypeUpdateDto } from "@/application/dtos/documentType/documentTypeUpdate.dto";
import type { IDocumentTypeListQuery } from "@/application/dtos/documentType/documentTypeListQuery.interface";
import DocumentsType from "../persistence/models/DocumentsType.model";

export class DocumentTypeRepository implements IDocumentTypeRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: DocumentTypeListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<DocumentTypeListResponseDto[]>>
  > {
    const { name, page, rowsPerPage, state } = request;
    const querys = { name, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<IDocumentTypeListQuery>(querys);

    const totalRecords = await DocumentsType.count({ where: filters });

    const results = await DocumentsType.findAll({
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
        data: transformed as DocumentTypeListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await DocumentsType.findAll({
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
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>> {
    const result = await DocumentsType.findByPk(id, {
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
    request: DocumentTypeCreateDto,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await DocumentsType.create(
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
    request: DocumentTypeUpdateDto,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const { name, state, id } = request;
      const result = await DocumentsType.findByPk(id, { transaction: t });

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
