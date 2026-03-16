import type { NextFunction, Request, Response } from "express";
import { UserListRequestDto } from "@/application/dtos/user/userListRequest.dto";
import type { UserUseCase } from "@/application/useCases/user.usecase";
import type { UserCreateDto } from "@/application/dtos/user/userCreate.dto";
import type { UserUpdateDto } from "@/application/dtos/user/userUpdate.dto";

export class UserController {
  _userUseCase;

  constructor(dependencies: { userUseCase: UserUseCase }) {
    this._userUseCase = dependencies.userUseCase;
  }

  async ListAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new UserListRequestDto();
      request.documentNumber = String(req.query.documentNumber ?? "");
      request.names = String(req.query.names ?? "");
      request.lastName = String(req.query.lastName ?? "");
      request.state = String(req.query.state ?? "");

      request.page = Number(req.query.page);
      request.rowsPerPage = Number(req.query.rowsPerPage);

      const result = await this._userUseCase.ListAll(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = Number(req.params.id ?? 0);
      const result = await this._userUseCase.GetById(request);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserCreateDto = req.body;
      request.userCreate = Number(req.user?.id);
      const result = await this._userUseCase.Create(request);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserUpdateDto = req.body;
      request.id = Number(req.params.id);
      request.userUpdate = Number(req.user?.id);
      const result = await this._userUseCase.Update(request);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
