import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import type { SelectResponseDto } from "@/application/dtos/common/selectResponse";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IStudentRepository } from "@/application/repositories/iStudent.repository";
import type { StudentListRequestDto } from "@/application/dtos/student/studentListRequest.dto";
import type { StudentListResponseDto } from "@/application/dtos/student/studentListResponse.dto";
import type { IStudentListQuery } from "@/application/dtos/student/studentListQuery.interface";
import type { StudentDetailResponseDto } from "@/application/dtos/student/studentDetailResponse.dto";
import type { StudentCreateDto } from "@/application/dtos/student/studentCreate.dto";
import type { StudentUpdateDto } from "@/application/dtos/student/studentUpdate.dto";
import Students from "../persistence/models/Students.model";
import DocumentsType from "../persistence/models/DocumentsType.model";
import Headquarters from "../persistence/models/Headquarters.model";

export class StudentRepository implements IStudentRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: StudentListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<StudentListResponseDto[]>>> {
    const { documentNumber, lastName, names, page, rowsPerPage, state } =
      request;
    const querys = { documentNumber, lastName, names, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<IStudentListQuery>(querys);

    const totalRecords = await Students.count({ where: filters });

    const results = await Students.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: DocumentsType,
          as: "documentType",
          attributes: ["name"],
        },
        {
          model: Headquarters,
          as: "headquarter",
          attributes: ["name"],
        },
      ],
      limit: pageSize,
      offset,
    });

    const transformed = results?.map((register) => ({
      id: register.id,
      names: register.names,
      documentNumber: register.documentNumber,
      lastName: register.lastName,
      email: register.email,
      tutorNames: `${register.tutorNames} ${register.tutorLastName}`,
      state: register.state ? "Activo" : "Inactivo",
    }));

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: {
        data: transformed as StudentListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    const results = await Students.findAll({
      attributes: ["id", "name"],
    });
    const transform = results?.map((register) => ({
      id: register?.id.toString(),
      label: `${register.names} ${register.lastName}`,
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
  ): Promise<IApiResponse<StudentDetailResponseDto | null>> {
    const result = await Students.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: DocumentsType,
          as: "documentType",
          attributes: ["name"],
        },
        {
          model: Headquarters,
          as: "headquarter",
          attributes: ["name"],
        },
      ],
    });

    if (result == null)
      throw new NotFoundException("Tipo de documento", id.toString());

    const transformed = {
      id: result.id,
      address: result.address,
      age: result.age,
      birthday: result.birthday,
      cellPhone: result.cellphoneTutor,
      documentNumber: result.documentNumber,
      email: result.email,
      idDocumentsType: result.idDocumentsType,
      idHeadquarter: result.idHeadquarter,
      lastName: result.lastName,
      names: result.names,
      tutorNames: result.tutorNames,
      tutorLastName: result.tutorLastName,
      cellphoneTutor: result.cellphoneTutor,
      schooling: result.schooling,
      grate: result.grate,
      school: result.school,
      diagnosis: result.diagnosis,
      medicalReport: result.medicalReport,
      certificateDisability: result.certificateDisability,
      conadisCard: result.conadisCard,
      psychologicalReport: result.psychologicalReport,
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
    request: StudentCreateDto,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const documentType = await DocumentsType.findByPk(
        request.idDocumentsType,
      );
      if (!documentType)
        throw new NotFoundException(
          "Tipo de documento",
          request.idDocumentsType.toString(),
        );

      const headquarter = await Headquarters.findByPk(request.idHeadquarter);
      if (!headquarter)
        throw new NotFoundException("Sede", request.idDocumentsType.toString());

      const result = await Students.create(
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
        address: result.address,
        age: result.age,
        birthday: result.birthday,
        cellPhone: result.cellphoneTutor,
        documentNumber: result.documentNumber,
        email: result.email,
        idDocumentsType: result.idDocumentsType,
        idHeadquarter: result.idHeadquarter,
        lastName: result.lastName,
        names: result.names,
        tutorNames: result.tutorNames,
        tutorLastName: result.tutorLastName,
        cellphoneTutor: result.cellphoneTutor,
        schooling: result.schooling,
        grate: result.grate,
        school: result.school,
        diagnosis: result.diagnosis,
        medicalReport: result.medicalReport,
        certificateDisability: result.certificateDisability,
        conadisCard: result.conadisCard,
        psychologicalReport: result.psychologicalReport,
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
    request: StudentUpdateDto,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await Students.findByPk(request.id, { transaction: t });

      if (result == null)
        throw new NotFoundException("Bank", request.id.toString());

      result.address = request.address;
      result.age = request.age;
      result.birthday = request.birthday;
      result.cellphoneTutor = request.cellPhone;
      result.documentNumber = request.documentNumber;
      result.email = request.email;
      result.idDocumentsType = request.idDocumentsType;
      result.idHeadquarter = request.idHeadquarter;
      result.lastName = request.lastName;
      result.names = request.names;
      result.tutorNames = request.tutorNames;
      result.tutorLastName = request.tutorLastName;
      result.cellphoneTutor = request.cellphoneTutor;
      result.schooling = request.schooling;
      result.grate = request.grate;
      result.school = request.school;
      result.diagnosis = request.diagnosis;
      result.medicalReport = request.medicalReport;
      result.certificateDisability = request.certificateDisability;
      result.conadisCard = request.conadisCard;
      result.psychologicalReport = request.psychologicalReport;
      result.state = request.state === "1" ? true : false;

      await result.save({ transaction: t });

      const transformed = {
        id: result.id,
        address: result.address,
        age: result.age,
        birthday: result.birthday,
        cellPhone: result.cellphoneTutor,
        documentNumber: result.documentNumber,
        email: result.email,
        idDocumentsType: result.idDocumentsType,
        idHeadquarter: result.idHeadquarter,
        lastName: result.lastName,
        names: result.names,
        tutorNames: result.tutorNames,
        tutorLastName: result.tutorLastName,
        cellphoneTutor: result.cellphoneTutor,
        schooling: result.schooling,
        grate: result.grate,
        school: result.school,
        diagnosis: result.diagnosis,
        medicalReport: result.medicalReport,
        certificateDisability: result.certificateDisability,
        conadisCard: result.conadisCard,
        psychologicalReport: result.psychologicalReport,
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
