import type { NextFunction, Request, Response } from "express";
import { RoleListRequestDto } from "@/application/dtos/role/roleListRequest.dto";
import type { RoleCreateDto } from "@/application/dtos/role/roleCreate.dto";
import type { RoleUseCase } from "@/application/useCases/role.usecase";
import type { RoleUpdateDto } from "@/application/dtos/role/roleUpdate.dto";

export class RoleController {
  _roleUseCase;

  constructor(dependencies: { roleUseCase: RoleUseCase }) {
    this._roleUseCase = dependencies.roleUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new RoleListRequestDto();
      request.name = String(req.query.name ?? "");
      request.state = String(req.query.state ?? "");
      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._roleUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._roleUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._roleUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RoleCreateDto = req.body;
      const result = await this._roleUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RoleUpdateDto = req.body;
      request.id = Number(req.params.id);
      const result = await this._roleUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
