import type { NextFunction, Request, Response } from "express";
import { DocumentTypeListRequestDto } from "@/application/dtos/documentType/documentTypeListRequest.dto";
import type { DocumentTypeUseCase } from "@/application/useCases/documentType.usecase";
import type { DocumentTypeCreateDto } from "@/application/dtos/documentType/documentTypeCreate.dto";
import type { DocumentTypeUpdateDto } from "@/application/dtos/documentType/documentTypeUpdate.dto";

export class DocumentTypeController {
  _documentTypeUseCase;

  constructor(dependencies: { documentTypeUseCase: DocumentTypeUseCase }) {
    this._documentTypeUseCase = dependencies.documentTypeUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new DocumentTypeListRequestDto();
      request.name = String(req.query.name ?? "");
      request.state = String(req.query.state ?? "");
      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._documentTypeUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._documentTypeUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._documentTypeUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: DocumentTypeCreateDto = req.body;
      const result = await this._documentTypeUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: DocumentTypeUpdateDto = req.body;
      request.id = Number(req.params.id);
      const result = await this._documentTypeUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
