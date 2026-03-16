import type { NextFunction, Request, Response } from "express";
import type { PaymentStatusUseCase } from "@/application/useCases/paymentStatus.usecase";

export class PaymentStatusController {
  _paymentStatusUseCase;

  constructor(dependencies: { paymentStatusUseCase: PaymentStatusUseCase }) {
    this._paymentStatusUseCase = dependencies.paymentStatusUseCase;
  }

  async Select(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._paymentStatusUseCase.Select();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
