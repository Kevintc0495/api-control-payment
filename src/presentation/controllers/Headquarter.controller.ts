import type { NextFunction, Request, Response } from "express";
import type { HeadquarterUseCase } from "@/application/useCases/headquarter.usecase";
import type { HeadquarterCreateDto } from "@/application/dtos/headquarter/headquarterCreate.dto";
import type { HeadquarterUpdateDto } from "@/application/dtos/headquarter/headquarterUpdate.dto";
import { HeadquarterListRequestDto } from "@/application/dtos/headquarter/headquarterListRequest.dto";

export class HeadquarterController {
  _headquarterUseCase;

  constructor(dependencies: { headquarterUseCase: HeadquarterUseCase }) {
    this._headquarterUseCase = dependencies.headquarterUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new HeadquarterListRequestDto();
      request.name = String(req.query.name ?? "");
      request.state = String(req.query.state ?? "");
      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._headquarterUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._headquarterUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._headquarterUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: HeadquarterCreateDto = req.body;
      const result = await this._headquarterUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: HeadquarterUpdateDto = req.body;
      request.id = Number(req.params.id);
      const result = await this._headquarterUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
