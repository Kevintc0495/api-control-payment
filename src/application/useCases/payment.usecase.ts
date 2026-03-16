import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { PaymentListRequestDto } from "../dtos/payment/paymentLisRequest.dto";
import type { PaymentListResponseDto } from "../dtos/payment/paymentListResponse.dto";
import type { PaymentByIdDto } from "../dtos/payment/paymentById.dto";
import type { PaymentDetailResponseDto } from "../dtos/payment/paymentDetailResponse.dto";
import type { PaymentCreateDto } from "../dtos/payment/paymentCreate.dto";
import type { PaymentUpdateDto } from "../dtos/payment/paymentUpdate.dto";
import type { IPaymentRepository } from "../repositories/iPayment.repository";
import type { PaymentPdfResponseDto } from "../dtos/payment/paymentPdfResponse.dto";
import type { PaymentExcelRequestDto } from "../dtos/payment/paymentExcelRequest.dto";

export class PaymentUseCase {
  _paymentRepository;

  constructor(dependencies: { paymentRepository: IPaymentRepository }) {
    this._paymentRepository = dependencies.paymentRepository;
  }

  async ListAll(
    request: PaymentListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<PaymentListResponseDto[]>>> {
    return await this._paymentRepository.ListAll(request);
  }

  async GetById(
    request: PaymentByIdDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>> {
    return await this._paymentRepository.GetById(request);
  }

  async Create(
    request: PaymentCreateDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>> {
    return await this._paymentRepository.Create(request);
  }

  async Update(
    request: PaymentUpdateDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>> {
    return await this._paymentRepository.Update(request);
  }

  async GeneratePdf(
    request: number,
  ): Promise<IApiResponse<PaymentPdfResponseDto | null>> {
    return await this._paymentRepository.GeneratePdf(request);
  }

  async GenerateExcel(
    request: PaymentExcelRequestDto,
  ): Promise<IApiResponse<string | null>> {
    return await this._paymentRepository.GenerateExcel(request);
  }
}
