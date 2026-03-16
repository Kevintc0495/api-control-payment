import type { NextFunction, Request, Response } from "express";
import { PaymentListRequestDto } from "@/application/dtos/payment/paymentLisRequest.dto";
import type { PaymentUseCase } from "@/application/useCases/payment.usecase";
import type { PaymentCreateDto } from "@/application/dtos/payment/paymentCreate.dto";
import type { PaymentUpdateDto } from "@/application/dtos/payment/paymentUpdate.dto";
import { PaymentByIdDto } from "@/application/dtos/payment/paymentById.dto";
import { PaymentExcelRequestDto } from "@/application/dtos/payment/paymentExcelRequest.dto";

export class PaymentController {
  _paymentUseCase;

  constructor(dependencies: { paymentUseCase: PaymentUseCase }) {
    this._paymentUseCase = dependencies.paymentUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new PaymentListRequestDto();
      request.code = String(req.query.code ?? "");
      request.idHeadquarter = Number(req.query.idHeadquarter ?? 0);
      request.idPaymentStatus = Number(req.query.idPaymentStatus ?? 0);
      request.idPaymentType = Number(req.query.idPaymentType ?? 0);
      request.idStudent = Number(req.query.idStudent ?? 0);

      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._paymentUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new PaymentByIdDto();
      request.id = Number(req.params.id ?? 0);
      request.isAdmin = req.user?.isAdmin ?? false;
      request.userId = Number(req.user?.id ?? 0);
      const result = await this._paymentUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PaymentCreateDto = req.body;
      request.idHeadquarter = Number(req.params.idHeadquarter);
      request.idStudent = Number(req.params.idStudent);
      request.idPaymentStatus = Number(req.params.idPaymentStatus);
      request.idPaymentType = Number(req.params.idPaymentType);
      request.idBank = request.idBank
        ? Number(req.params.idBank)
        : request.idBank;
      request.userCreate = Number(req.user?.id);
      const result = await this._paymentUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PaymentUpdateDto = req.body;
      request.id = Number(req.params.id);
      request.idHeadquarter = Number(req.params.idHeadquarter);
      request.idStudent = Number(req.params.idStudent);
      request.idPaymentStatus = Number(req.params.idPaymentStatus);
      request.idPaymentType = Number(req.params.idPaymentType);
      request.idBank = request.idBank
        ? Number(req.params.idBank)
        : request.idBank;
      request.userUpdate = Number(req.user?.id);
      const result = await this._paymentUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async GeneratePdf(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._paymentUseCase.GeneratePdf(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GenerateExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new PaymentExcelRequestDto();
      request.code = String(req.query.code ?? "");
      request.idHeadquarter = Number(req.query.idHeadquarter ?? 0);
      request.idPaymentStatus = Number(req.query.idPaymentStatus ?? 0);
      request.idPaymentType = Number(req.query.idPaymentType ?? 0);
      request.idStudent = Number(req.query.idStudent ?? 0);
      request.isAdmin = Boolean(req.user?.isAdmin);
      request.userId = Number(req.user?.id);
      const result = await this._paymentUseCase.GenerateExcel(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
