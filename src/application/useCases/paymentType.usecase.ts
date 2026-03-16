import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { PaymentTypeCreateDto } from "../dtos/paymentType/paymentTypeCreate.dto";
import type { PaymentTypeDetailResponseDto } from "../dtos/paymentType/paymentTypeDetail.Response.dto";
import type { PaymentTypeListRequestDto } from "../dtos/paymentType/paymentTypeListRequest.dto";
import type { PaymentTypeListResponseDto } from "../dtos/paymentType/paymentTypeListResponse.dto";
import type { PaymentTypeUpdateDto } from "../dtos/paymentType/paymentTypeUpdate.dto";
import type { IPaymentTypeRepository } from "../repositories/iPaymentType.repository";

export class PaymentTypeUseCase {
  _paymentTypeRepository;

  constructor(dependencies: { paymentTypeRepository: IPaymentTypeRepository }) {
    this._paymentTypeRepository = dependencies.paymentTypeRepository;
  }

  async ListAll(
    request: PaymentTypeListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<PaymentTypeListResponseDto[]>>
  > {
    return await this._paymentTypeRepository.ListAll(request);
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._paymentTypeRepository.Select();
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>> {
    return await this._paymentTypeRepository.GetById(id);
  }

  async Create(
    request: PaymentTypeCreateDto,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>> {
    return await this._paymentTypeRepository.Create(request);
  }

  async Update(
    request: PaymentTypeUpdateDto,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>> {
    return await this._paymentTypeRepository.Update(request);
  }
}
