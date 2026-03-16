import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { PaymentTypeCreateDto } from "../dtos/paymentType/paymentTypeCreate.dto";
import type { PaymentTypeDetailResponseDto } from "../dtos/paymentType/paymentTypeDetail.Response.dto";
import type { PaymentTypeListRequestDto } from "../dtos/paymentType/paymentTypeListRequest.dto";
import type { PaymentTypeListResponseDto } from "../dtos/paymentType/paymentTypeListResponse.dto";
import type { PaymentTypeUpdateDto } from "../dtos/paymentType/paymentTypeUpdate.dto";

export interface IPaymentTypeRepository {
  ListAll(
    request: PaymentTypeListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<PaymentTypeListResponseDto[]>>>;
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
  GetById(
    id: number,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>>;
  Create(
    request: PaymentTypeCreateDto,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>>;
  Update(
    request: PaymentTypeUpdateDto,
  ): Promise<IApiResponse<PaymentTypeDetailResponseDto | null>>;
}
