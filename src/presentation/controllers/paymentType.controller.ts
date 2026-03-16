import type { NextFunction, Request, Response } from "express";
import type { PaymentTypeUseCase } from "@/application/useCases/paymentType.usecase";
import type { PaymentTypeCreateDto } from "@/application/dtos/paymentType/paymentTypeCreate.dto";
import type { PaymentTypeUpdateDto } from "@/application/dtos/paymentType/paymentTypeUpdate.dto";
import { PaymentTypeListRequestDto } from "@/application/dtos/paymentType/paymentTypeListRequest.dto";

export class PaymentTypeController {
  _paymentTypeUseCase;

  constructor(dependencies: { paymentTypeUseCase: PaymentTypeUseCase }) {
    this._paymentTypeUseCase = dependencies.paymentTypeUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new PaymentTypeListRequestDto();
      request.name = String(req.query.name ?? "");
      request.state = String(req.query.state ?? "");
      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._paymentTypeUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._paymentTypeUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._paymentTypeUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PaymentTypeCreateDto = req.body;
      const result = await this._paymentTypeUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PaymentTypeUpdateDto = req.body;
      request.id = Number(req.params.id);
      const result = await this._paymentTypeUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
