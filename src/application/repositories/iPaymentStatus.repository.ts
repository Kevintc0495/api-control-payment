import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";

export interface IPaymentStatusRepository {
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
}
