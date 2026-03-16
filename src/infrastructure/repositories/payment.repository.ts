import type { Sequelize } from "sequelize";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "@/application/dtos/common/paginationResponse.dto";
import { buildFilters } from "../utils/buildFilters";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import type { IPaymentRepository } from "@/application/repositories/iPayment.repository";
import type { PaymentListRequestDto } from "@/application/dtos/payment/paymentLisRequest.dto";
import type { PaymentListResponseDto } from "@/application/dtos/payment/paymentListResponse.dto";
import type { IPaymentListQuery } from "@/application/dtos/payment/paymentListQuery.interface";
import type { PaymentByIdDto } from "@/application/dtos/payment/paymentById.dto";
import type { PaymentDetailResponseDto } from "@/application/dtos/payment/paymentDetailResponse.dto";
import type { PaymentCreateDto } from "@/application/dtos/payment/paymentCreate.dto";
import type { PaymentUpdateDto } from "@/application/dtos/payment/paymentUpdate.dto";
import type { IEmailService } from "@/application/services/iemail.service";
import type { IEmailModel } from "@/application/models/common/iEmail.model";
import type { PaymentPdfResponseDto } from "@/application/dtos/payment/paymentPdfResponse.dto";
import type { PaymentExcelRequestDto } from "@/application/dtos/payment/paymentExcelRequest.dto";
import Payments from "../persistence/models/Payments";
import Students from "../persistence/models/Students.model";
import PaymentTypes from "../persistence/models/PaymentTypes.model";
import PaymentStatus from "../persistence/models/PaymentStatus.model";
import Headquarters from "../persistence/models/Headquarters.model";
import Users from "../persistence/models/Users.model";
import Peoples from "../persistence/models/Peoples.model";
import Banks from "../persistence/models/Banks.model";
import { PaymentStatusEnum } from "@/domain/enums/PaymentStatus.enum";
import {
  formateDate,
  getDateToday,
  getHour,
} from "@/application/utils/date.ultis";
import { generateCorrelative } from "@/application/utils/generateCorrrelative.util";
import { ValidationException } from "@/application/exceptions/validation.exception";
import { RoleEnum } from "@/domain/enums/role.enum";
import { ExcelService } from "../services/excel.service";
import "dotenv/config";

export class PaymentRepository implements IPaymentRepository {
  _database: Sequelize;
  _emailService;
  _emailUtil;

  constructor(dependencies: {
    database: Sequelize;
    emailService: IEmailService;
    emailUtil: IEmailModel;
  }) {
    this._database = dependencies.database;
    this._emailService = dependencies.emailService;
    this._emailUtil = dependencies.emailUtil;
  }

  async ListAll(
    request: PaymentListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<PaymentListResponseDto[]>>> {
    const {
      code,
      idHeadquarter,
      idPaymentStatus,
      idPaymentType,
      idStudent,
      page,
      rowsPerPage,
    } = request;
    const querys = {
      code,
      idHeadquarter,
      idPaymentStatus,
      idPaymentType,
      idStudent,
    };

    const pageNumber = Number(page);
    const pageSize = Number(rowsPerPage);
    const offset = pageNumber * pageSize;

    const filters = buildFilters<IPaymentListQuery>(querys);

    const totalRecords = await Payments.count({ where: filters });

    const results = await Payments.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Students,
          as: "students",
          attributes: ["names", "lastName"],
        },
        {
          model: PaymentTypes,
          as: "typePayment",
          attributes: ["name"],
        },
        {
          model: PaymentStatus,
          as: "paymentStatus",
          attributes: ["name"],
        },
      ],
      limit: pageSize,
      offset,
    });

    const transformed = await Promise.all(
      results.map(async (register) => {
        const headquarter = await Headquarters.findByPk(
          register?.idHeadquarter,
        );
        const user = await Users.findByPk(register?.userCreate, {
          attributes: [],
          include: [
            {
              model: Peoples,
              as: "people",
              attributes: ["names", "lastName"],
            },
          ],
        });

        return {
          id: register?.id,
          code: register?.code,
          student: `${register?.students?.names} ${register?.students?.lastName}`,
          paymentType: register?.typePayment?.name,
          headquarter: headquarter?.name,
          amount: register.amount,
          otherAmounts: register?.otherAmounts,
          user: user?.people?.names + " " + user?.people?.lastName,
          state: register?.paymentStatus?.name,
        };
      }),
    );

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: {
        data: transformed as PaymentListResponseDto[],
        count: totalRecords,
        pageSize: rowsPerPage,
        page: page,
      },
      status: 200,
    };

    return response;
  }

  async GetById(
    request: PaymentByIdDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>> {
    const filter: Record<string, unknown> = { id: request.id };
    if (!request.isAdmin) filter.userCreate = request.userId;

    const result = await Payments.findOne({
      where: { ...filter },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!result) throw new NotFoundException("Pago", request.id.toString());

    const userCreate = await Users.findByPk(result?.userCreate, {
      attributes: [],
      include: [
        {
          model: Peoples,
          as: "people",
          attributes: ["names", "lastName"],
        },
      ],
    });

    const users = {
      createBy: userCreate?.people?.names + " " + userCreate?.people?.lastName,
      updateBy: "",
      canceledBy: "",
    };

    const isSameUser = result?.userUpdate === userCreate?.id;
    if (!isSameUser) {
      const userUpdate = await Users.findByPk(result?.userUpdate, {
        attributes: [],
        include: [
          {
            model: Peoples,
            as: "people",
            attributes: ["names", "lastName"],
          },
        ],
      });

      users.updateBy =
        userUpdate?.people?.names + " " + userUpdate?.people?.lastName;
      users.canceledBy =
        result.idPaymentStatus === PaymentStatusEnum.CANCELED
          ? userUpdate?.people?.names + " " + userUpdate?.people?.lastName
          : "";
    }

    users.updateBy =
      userCreate?.people?.names + " " + userCreate?.people?.lastName;
    users.canceledBy =
      result.idPaymentStatus === PaymentStatusEnum.CANCELED
        ? userCreate?.people?.names + " " + userCreate?.people?.lastName
        : "";

    const transformed = {
      id: result.id,
      idStudent: result.idStudent,
      idPaymentStatus: result.idPaymentStatus,
      idPaymentType: result.idPaymentType,
      idBank: result?.idBank || 0,
      idHeadquarter: result.idHeadquarter,
      customer: result.customer,
      documentNumber: result.documentNumber,
      cellphone: result.cellphone,
      email: result.email,
      code: result.code,
      comment: result.comment,
      cancellationComment: result.cancellationComment || "",
      amount: result.amount,
      otherAmounts: result.otherAmounts || 0,
      ...users,
    };

    const response = {
      message: "La solicitud se ha procesado correctamente",
      data: transformed,
      status: 200,
    };

    return response;
  }

  async Create(
    request: PaymentCreateDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const headquarter = await Headquarters.findByPk(request.idHeadquarter);
      if (!headquarter)
        throw new NotFoundException("Sede", request.idHeadquarter.toString());

      const user = await Users.findByPk(request?.userCreate);
      if (!user)
        throw new NotFoundException("Usuario", request.userCreate.toString());

      const student = await Students.findByPk(request?.idStudent);
      if (!student)
        throw new NotFoundException("Estudiante", request.idStudent.toString());

      const paymentState = await PaymentStatus.findByPk(
        request?.idPaymentStatus,
      );
      if (!paymentState)
        throw new NotFoundException(
          "Estado de pago",
          request.idPaymentStatus.toString(),
        );

      const paymentType = await PaymentTypes.findByPk(request?.idPaymentType);
      if (!paymentType)
        throw new NotFoundException(
          "Tipo de pago",
          request.idPaymentType.toString(),
        );

      if (request?.idBank) {
        const bank = await Banks.findByPk(request?.idBank);
        if (!bank)
          throw new NotFoundException("Banco", request.idBank.toString());
      }

      const people = await Peoples.findByPk(user.idPeople);
      if (!people)
        throw new NotFoundException("Persona", user.idPeople.toString());

      const lastPayment = await Payments.findOne({ order: [["id", "DESC"]] });

      const payment = await Payments.create(
        {
          ...request,
          date: getDateToday(),
          userCreate: request.userCreate,
          code: generateCorrelative(lastPayment),
        },
        { transaction: t },
      );

      const time = getHour(payment.createdAt);

      const params = [
        {
          address: headquarter.address,
          title: "Boleta electrónica",
          code: payment.code,
          date: formateDate(payment?.createdAt),
          hour: time,
          student: student.names + " " + student.lastName,
          customer: payment.customer,
          document: payment.documentNumber,
          cellphone: payment.cellphone,
          email: payment.email,
          attended: `${people?.names} ${people?.lastName}`,
          paymentType: paymentType.name,
          comment: payment.comment || "",
          total: `S/ ${(payment.amount + (payment?.otherAmounts || 0)).toFixed(2)}`,
        },
      ];

      const template = this._emailUtil.EmailTemplate("BoletaEmail", params);

      const message = {
        to: request.email,
        subject: "Boleta electrónica",
        html: template,
        bcc: process.env.EMAIL_ADMIN,
      };

      await this._emailService.Send(message);

      const transformed = {
        id: payment.id,
        idStudent: payment.idStudent,
        idPaymentStatus: payment.idPaymentStatus,
        idPaymentType: payment.idPaymentType,
        idBank: payment?.idBank || 0,
        idHeadquarter: payment.idHeadquarter,
        customer: payment.customer,
        documentNumber: payment.documentNumber,
        cellphone: payment.cellphone,
        email: payment.email,
        code: payment.code,
        comment: payment.comment,
        cancellationComment: payment.cancellationComment || "",
        amount: payment.amount,
        otherAmounts: payment.otherAmounts || 0,
        createBy: "",
        updateBy: "",
        canceledBy: "",
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
    request: PaymentUpdateDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>> {
    const t = await this._database.transaction();

    try {
      const result = await Payments.findByPk(request.id);
      if (!result) throw new NotFoundException("Pago", request.id.toString());

      if (request.idPaymentStatus == PaymentStatusEnum.CANCELED)
        throw new ValidationException("Pago anulado no puede modificarse");

      const headquarter = await Headquarters.findByPk(request.idHeadquarter);
      if (!headquarter)
        throw new NotFoundException("Sede", request.idHeadquarter.toString());

      const user = await Users.findByPk(request?.userUpdate);
      if (!user)
        throw new NotFoundException("Usuario", request.userUpdate.toString());

      const student = await Students.findByPk(request?.idStudent);
      if (!student)
        throw new NotFoundException("Estudiante", request.idStudent.toString());

      const paymentState = await PaymentStatus.findByPk(
        request?.idPaymentStatus,
      );
      if (!paymentState)
        throw new NotFoundException(
          "Estado de pago",
          request.idPaymentStatus.toString(),
        );

      const paymentType = await PaymentTypes.findByPk(request?.idPaymentType);
      if (!paymentType)
        throw new NotFoundException(
          "Tipo de pago",
          request.idPaymentType.toString(),
        );

      if (request?.idBank) {
        const bank = await Banks.findByPk(request?.idBank);
        if (!bank)
          throw new NotFoundException("Banco", request.idBank.toString());
      }

      result.idHeadquarter = request.idHeadquarter;
      result.idStudent = request.idStudent;
      result.idPaymentStatus = request.idPaymentStatus;
      result.idPaymentType = request.idPaymentType;
      result.idBank = request.idBank;
      result.email = request.email;
      result.cancellationComment = request.cancellationComment;
      result.customer = request.customer;
      result.documentNumber = request.documentNumber;
      result.cellphone = request.cellphone;
      result.comment = request.comment;
      result.userUpdate = request.userUpdate;

      // if (request.idPaymentStatus == PaymentStatusEnum.APPROVED) await result.save({ transaction: t });

      if (request.idPaymentStatus == PaymentStatusEnum.CANCELED) {
        if (user.idRole !== RoleEnum.ADMIN)
          throw new ValidationException(
            "Para anular tienes que ser usuario administrador",
          );
        if (!request.cancellationComment)
          throw new ValidationException(
            "Para anular tienes que ser usuario administrador",
          );
        result.cancellationComment = request.cancellationComment;

        const peopleCreate = await Peoples.findByPk(result.userCreate);

        const userPeople = {
          attended: `${peopleCreate?.names} ${peopleCreate?.lastName}`,
          canceled: `${peopleCreate?.names} ${peopleCreate?.lastName}`,
        };

        if (request.userUpdate !== result.userCreate) {
          const peopleCanceled = await Peoples.findByPk(user.idPeople);
          userPeople.canceled = `${peopleCanceled?.names} ${peopleCanceled?.lastName}`;
        }

        // await result.save({ transaction: t });

        const time = getHour(result.updatedAt);

        const params = [
          {
            address: headquarter.address,
            title: "Anulacion de boleta",
            code: result.code,
            date: formateDate(result?.updatedAt),
            hour: time,
            student: student.names + " " + student.lastName,
            customer: result.customer,
            document: result.documentNumber,
            cellphone: result.cellphone,
            email: result.email,
            paymentType: paymentType.name,
            comment: result.comment || "",
            reasonCanceled: result.cancellationComment,
            total: `S/ ${(result.amount + (result?.otherAmounts || 0)).toFixed(2)}`,
            ...userPeople,
          },
        ];

        const template = this._emailUtil.EmailTemplate(
          "BoletaAnuladaEmail",
          params,
        );

        const message = {
          to: request.email,
          subject: "Anulación de boleta",
          html: template,
          bcc: process.env.EMAIL_ADMIN,
        };

        await this._emailService.Send(message);
      }

      await result.save({ transaction: t });
      await t.commit();

      const transformed = {
        id: result.id,
        idStudent: result.idStudent,
        idPaymentStatus: result.idPaymentStatus,
        idPaymentType: result.idPaymentType,
        idBank: result?.idBank || 0,
        idHeadquarter: result.idHeadquarter,
        customer: result.customer,
        documentNumber: result.documentNumber,
        cellphone: result.cellphone,
        email: result.email,
        code: result.code,
        comment: result.comment,
        cancellationComment: result.cancellationComment || "",
        amount: result.amount,
        otherAmounts: result.otherAmounts || 0,
        createBy: "",
        updateBy: "",
        canceledBy: "",
      };

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

  async GeneratePdf(
    id: number,
  ): Promise<IApiResponse<PaymentPdfResponseDto | null>> {
    const result = await Payments.findByPk(id);
    const headquarter = await Headquarters.findByPk(result?.idHeadquarter);
    const paymentType = await PaymentTypes.findByPk(result?.idPaymentType);
    const student = await Students.findByPk(result?.idStudent);
    const userCreate = await Users.findByPk(result?.userCreate);
    const userUpdate = await Users.findByPk(result?.userUpdate);
    const peopleCreate = await Peoples.findByPk(userCreate?.idPeople);
    const peopleCanceled = await Peoples.findByPk(userUpdate?.idPeople);

    const voucherType = result!.idPaymentStatus === PaymentStatusEnum.APPROVED;
    const time = getHour(voucherType ? result?.createdAt : result?.updatedAt);

    const params = {
      address: headquarter!.address,
      title: voucherType ? "Boleta electrónica" : "Anulación de boleta",
      code: result!.code,
      date: formateDate(voucherType ? result?.createdAt : result?.updatedAt),
      hour: time,
      student: student?.names + " " + student?.lastName || "",
      customer: result!.customer,
      document: result!.documentNumber,
      cellphone: result!.cellphone,
      email: result!.email,
      attended: `${peopleCreate?.names} ${peopleCreate?.lastName}`,
      paymentType: paymentType!.name,
      comment: result!.comment || "",
      total: `S/ ${(result!.amount + (result!.otherAmounts || 0)).toFixed(2)}`,
      ...(!voucherType && {
        canceled: `${peopleCanceled!.names} ${peopleCanceled!.lastName}`,
        reasonCanceled: result!.cancellationComment || "",
      }),
    };

    return {
      message: "El registro se ha actualizado correctamente",
      data: {
        isActive: voucherType,
        params,
      },
      status: 200,
    };
  }

  async GenerateExcel(
    request: PaymentExcelRequestDto,
  ): Promise<IApiResponse<string | null>> {
    const query: Record<string, unknown> = {
      idStudent: request.idStudent,
      idPaymentType: request.idPaymentType,
      idHeadquarter: request.idHeadquarter,
      idPaymentStatus: request.idPaymentStatus,
      code: request.code,
    };

    if (!request.isAdmin) query.userCreate = request.userId;

    const filters = buildFilters<IPaymentListQuery>(query);

    const results = await Payments.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Students,
          as: "students",
          attributes: ["names", "lastName"],
        },
        {
          model: PaymentTypes,
          as: "typePayment",
          attributes: ["name"],
        },
        {
          model: PaymentStatus,
          as: "paymentStatus",
          attributes: ["name"],
        },
      ],
    });

    const transformed = await Promise.all(
      results.map(async (register) => {
        const headquarter = await Headquarters.findByPk(
          register?.idHeadquarter,
        );
        const user = await Users.findByPk(register?.userCreate, {
          attributes: [],
          include: [
            {
              model: Peoples,
              as: "people",
              attributes: ["names", "lastName"],
            },
          ],
        });

        return {
          code: register?.code,
          student: `${register?.students?.names} ${register?.students?.lastName}`,
          paymentType: register?.typePayment?.name,
          headquarter: headquarter?.name,
          amount: register.amount,
          otherAmounts: register?.otherAmounts,
          user: user?.people?.names + " " + user?.people?.lastName,
          state: register?.paymentStatus?.name,
        };
      }),
    );

    const headers = [
      "N° DE RECIBO",
      "ALUMNO",
      "TIPO DE PAGO",
      "SEDE",
      "MONTO",
      "OTRO MONTO",
      "USUARIO",
      "ESTADO",
    ];

    // Usar la clase genérica
    const excel = new ExcelService<(typeof transformed)[0]>("Pagos");
    excel.setHeaders(headers);
    excel.addRows(transformed, (row) => [
      row.code,
      row.student,
      row.paymentType,
      row.headquarter,
      row.amount,
      row.otherAmounts,
      row.user,
      row.state,
    ]);

    const result = await excel.generateBuffer();

    const buffer = Buffer.from(result);
    const base64Excel = buffer.toString("base64");

    return {
      message: "El Excel se generó correctamente",
      data: base64Excel,
      status: 200,
    };
  }
}
