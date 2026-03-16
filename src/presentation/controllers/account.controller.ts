import type { NextFunction, Request, Response } from "express";
import type { LoginDto } from "@/application/dtos/account/loginRequest.dto";
import type { IAccountService } from "@/application/services/iaccount.service";
import { cookieConfig } from "@/infrastructure/config/cookie.config";
import type { RecoveryPasswordRequestDto } from "@/application/dtos/account/recoveryPassword.dto";
import type { ChangePasswordRequestDto } from "@/application/dtos/account/changePassword.dto";

export class AccountController {
  _accountService;

  constructor(dependencies: { accountService: IAccountService }) {
    this._accountService = dependencies.accountService;
  }

  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginDto = req.body;

      const result = await this._accountService.Login(request);
      const token = await this._accountService.GenerateAccessToken(result.data);

      res.cookie("authorization", token, cookieConfig);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async RecoveryPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RecoveryPasswordRequestDto = req.body;
      const result = await this._accountService.RecoveryPassword(request);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async ChangePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ChangePasswordRequestDto = req.body;
      const result = await this._accountService.ChangePassword(request);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
