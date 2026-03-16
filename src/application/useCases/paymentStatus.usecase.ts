import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { IPaymentStatusRepository } from "../repositories/iPaymentStatus.repository";

export class PaymentStatusUseCase {
  _paymentStatusRepository;

  constructor(dependencies: {
    paymentStatusRepository: IPaymentStatusRepository;
  }) {
    this._paymentStatusRepository = dependencies.paymentStatusRepository;
  }
  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._paymentStatusRepository.Select();
  }
}
