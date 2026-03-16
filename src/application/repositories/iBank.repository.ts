import type { BankCreateDto } from "../dtos/bank/bankCreate.dto";
import type { BankDetailResponseDto } from "../dtos/bank/bankDetail.Response.dto";
import type { BankListRequestDto } from "../dtos/bank/bankListRequest.dto";
import type { BankListResponseDto } from "../dtos/bank/bankListResponse.dto";
import type { BankUpdateDto } from "../dtos/bank/bankUpdate.dto";
import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";

export interface IBankRepository {
  ListAll(
    request: BankListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<BankListResponseDto[]>>>;
  GetById(id: number): Promise<IApiResponse<BankDetailResponseDto | null>>;
  Create(
    request: BankCreateDto,
  ): Promise<IApiResponse<BankDetailResponseDto | null>>;
  Update(
    request: BankUpdateDto,
  ): Promise<IApiResponse<BankDetailResponseDto | null>>;
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
}
