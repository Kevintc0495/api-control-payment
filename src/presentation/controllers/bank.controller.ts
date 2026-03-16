import type { NextFunction, Request, Response } from "express";
import type { BankUseCase } from "@/application/useCases/bank.usecase";
import { BankListRequestDto } from "@/application/dtos/bank/bankListRequest.dto";
import type { BankCreateDto } from "@/application/dtos/bank/bankCreate.dto";
import type { BankUpdateDto } from "@/application/dtos/bank/bankUpdate.dto";

export class BankController {
  _bankUseCase;

  constructor(dependencies: { bankUseCase: BankUseCase }) {
    this._bankUseCase = dependencies.bankUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new BankListRequestDto();
      request.name = String(req.query.name ?? "");
      request.state = String(req.query.state ?? "");
      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._bankUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._bankUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._bankUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BankCreateDto = req.body;
      const result = await this._bankUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BankUpdateDto = req.body;
      request.id = Number(req.params.id);
      const result = await this._bankUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
