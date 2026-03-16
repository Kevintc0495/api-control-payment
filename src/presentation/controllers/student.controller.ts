import type { NextFunction, Request, Response } from "express";
import { StudentListRequestDto } from "@/application/dtos/student/studentListRequest.dto";
import type { StudentUseCase } from "@/application/useCases/student.usecase";
import type { StudentCreateDto } from "@/application/dtos/student/studentCreate.dto";
import type { StudentUpdateDto } from "@/application/dtos/student/studentUpdate.dto";

export class StudentController {
  _studentUseCase;

  constructor(dependencies: { studentUseCase: StudentUseCase }) {
    this._studentUseCase = dependencies.studentUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new StudentListRequestDto();
      request.documentNumber = String(req.query.documentNumber ?? "");
      request.names = String(req.query.names ?? "");
      request.lastName = String(req.query.lastName ?? "");
      request.state = String(req.query.state ?? "");

      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._studentUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._studentUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._studentUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: StudentCreateDto = req.body;
      const result = await this._studentUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: StudentUpdateDto = req.body;
      request.id = Number(req.params.id);
      const result = await this._studentUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
