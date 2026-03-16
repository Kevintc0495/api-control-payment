import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { PaymentListRequestDto } from "../dtos/payment/paymentLisRequest.dto";
import type { PaymentListResponseDto } from "../dtos/payment/paymentListResponse.dto";
import type { PaymentByIdDto } from "../dtos/payment/paymentById.dto";
import type { PaymentDetailResponseDto } from "../dtos/payment/paymentDetailResponse.dto";
import type { PaymentCreateDto } from "../dtos/payment/paymentCreate.dto";
import type { PaymentUpdateDto } from "../dtos/payment/paymentUpdate.dto";
import type { PaymentPdfResponseDto } from "../dtos/payment/paymentPdfResponse.dto";
import type { PaymentExcelRequestDto } from "../dtos/payment/paymentExcelRequest.dto";

export interface IPaymentRepository {
  ListAll(
    request: PaymentListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<PaymentListResponseDto[]>>>;
  GetById(
    request: PaymentByIdDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>>;
  Create(
    request: PaymentCreateDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>>;
  Update(
    request: PaymentUpdateDto,
  ): Promise<IApiResponse<PaymentDetailResponseDto | null>>;
  GeneratePdf(id: number): Promise<IApiResponse<PaymentPdfResponseDto | null>>;
  GenerateExcel(
    request: PaymentExcelRequestDto,
  ): Promise<IApiResponse<string | null>>;
}
