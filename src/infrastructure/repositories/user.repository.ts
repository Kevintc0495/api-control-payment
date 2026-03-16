import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IUserRepository } from "@/application/repositories/iUser.repository";
import type { UserListRequestDto } from "@/application/dtos/user/userListRequest.dto";
import type { UserListResponseDto } from "@/application/dtos/user/userListResponse.dto";
import type { IUserListQuery } from "@/application/dtos/user/userListQuery.interface";
import type { UserDetailResponseDto } from "@/application/dtos/user/userDetailResponse.dto";
import type { UserCreateDto } from "@/application/dtos/user/userCreate.dto";
import type { UserUpdateDto } from "@/application/dtos/user/userUpdate.dto";
import Users from "../persistence/models/Users.model";
import Peoples from "../persistence/models/Peoples.model";
import DocumentsType from "../persistence/models/DocumentsType.model";
import Roles from "../persistence/models/Roles.model";
import { ValidationException } from "@/application/exceptions/validation.exception";

export class UserRepository implements IUserRepository {
  private _database: Sequelize;

  constructor(dependencies: { database: Sequelize }) {
    this._database = dependencies.database;
  }

  async ListAll(
    request: UserListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<UserListResponseDto[]>>> {
    const { documentNumber, lastName, names, page, rowsPerPage, state } =
      request;
    const querys = { documentNumber, lastName, names, state };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const userFilters = buildFilters<IUserListQuery>(querys);
    const peopleFilters = buildFilters<IUserListQuery>(querys);

    const totalRecords = await Users.count({
      where: userFilters,
      include: [
        {
          model: Peoples,
          as: "people",
          where: peopleFilters,
        },
      ],
    });

    const results = await Users.findAll({
      where: userFilters,
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Peoples,
          as: "people",
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          where: peopleFilters,
          include: [
            {
              model: DocumentsType,
              as: "documentType",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Roles,
          as: "role",
          attributes: ["name"],
        },
      ],
      limit: pageSize,
      offset,
    });

    const transformed = results.map((register) => ({
      id: register.id,
      documentNumber: register.people?.documentNumber || "",
      names: register.people?.names || "",
      lastName: register.people?.lastName || "",
      email: register.email,
      state: register.state ? "Activo" : "Inactivo",
    }));

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: {
        data: transformed as UserListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<UserDetailResponseDto | null>> {
    const result = await Users.findByPk(id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Peoples,
          as: "people",
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          include: [
            {
              model: DocumentsType,
              as: "documentType",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Roles,
          as: "role",
          attributes: ["name"],
        },
      ],
    });

    if (result == null) throw new NotFoundException("Usuario", id.toString());

    const transformed = {
      id: result.id,
      idDocumentsType: result.people?.idDocumentsType || 0,
      idRole: result.idRole,
      address: result.people?.address || "",
      age: result.people?.age || "",
      birthday: result.people?.birthday || "",
      cellPhone: result.people?.cellPhone || "",
      documentNumber: result.people?.documentNumber || "",
      names: result.people?.names || "",
      lastName: result.people?.lastName || "",
      email: result.email,
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
    request: UserCreateDto,
  ): Promise<IApiResponse<UserDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      if (request.password !== request.repeatPassword)
        throw new ValidationException("Los campos de contraseña no coinciden");

      const documentType = await DocumentsType.findByPk(
        request.idDocumentsType,
      );
      if (!documentType)
        throw new NotFoundException(
          "Tipo de documento",
          request.idDocumentsType.toString(),
        );

      const role = await Roles.findByPk(request.idRole);
      if (!role) throw new NotFoundException("Rol", request.idRole.toString());

      const filterEmail = request.email.toLowerCase().trim();

      const existingUser = await Users.findOne({
        where: { email: filterEmail },
      });
      if (!existingUser) throw new NotFoundException("User", filterEmail);

      const people = await Peoples.create(
        {
          documentNumber: request.documentNumber,
          names: request.names,
          lastName: request.lastName,
          age: request.age,
          birthday: request.birthday,
          address: request.address,
          cellPhone: request.cellPhone,
          idDocumentsType: request.idDocumentsType,
        },
        { transaction: t },
      );

      const hashedPassword = CryptoJS.SHA256(request.password).toString();

      const dataSend = {
        code: "",
        email: filterEmail,
        password: hashedPassword,
        idRole: request.idRole,
        idPeople: people.id,
        state: true,
        userCreate: request.userCreate,
      };

      const user = await Users.create(dataSend, { transaction: t });

      const transformed = {
        id: people.id,
        idDocumentsType: people.idDocumentsType,
        idRole: user.idRole,
        address: people.address,
        age: people.age,
        birthday: people.birthday,
        cellPhone: people.cellPhone,
        documentNumber: people.documentNumber,
        names: people.names,
        lastName: people.lastName,
        email: filterEmail,
        state: "1",
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
    request: UserUpdateDto,
  ): Promise<IApiResponse<UserDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const user = await Users.findByPk(request.id);
      if (!user) throw new NotFoundException("User", request.id.toString());

      const documentType = await DocumentsType.findByPk(
        request.idDocumentsType,
      );
      if (!documentType)
        throw new NotFoundException(
          "Tipo de documento",
          request.idDocumentsType.toString(),
        );

      const role = await Roles.findByPk(request.idRole);
      if (!role) throw new NotFoundException("Rol", request.idRole.toString());

      const people = await Peoples.findByPk(user.idPeople);
      if (!people)
        throw new NotFoundException("People", user.idPeople.toString());

      people.names = request.names;
      people.lastName = request.lastName;
      people.age = request.age;
      people.birthday = request.birthday;
      people.address = request.address;
      people.cellPhone = request.cellPhone;
      people.documentNumber = request.documentNumber?.trim() as string;
      people.idDocumentsType = request.idDocumentsType;

      await people.save({ transaction: t });

      if (request.password) {
        if (request.password !== request.repeatPassword)
          throw new ValidationException(
            "Los campos de contraseña no coinciden",
          );

        const hashedPassword = CryptoJS.SHA256(request.password).toString();
        user.password = hashedPassword;
      }

      user.email = request.email;
      user.idRole = request.idRole;
      user.state = request.state === "1" ? true : false;
      user.userUpdate = request.userUpdate;

      await user.save({ transaction: t });

      const transformed = {
        id: people.id,
        idDocumentsType: people.idDocumentsType,
        idRole: user.idRole,
        address: people.address,
        age: people.age,
        birthday: people.birthday,
        cellPhone: people.cellPhone,
        documentNumber: people.documentNumber,
        names: people.names,
        lastName: people.lastName,
        email: user.email,
        state: "1",
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
