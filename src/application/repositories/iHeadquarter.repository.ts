import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { HeadquarterCreateDto } from "../dtos/headquarter/headquarterCreate.dto";
import type { HeadquarterDetailResponseDto } from "../dtos/headquarter/headquarterDetailResponse.dto";
import type { HeadquarterListRequestDto } from "../dtos/headquarter/headquarterListRequest.dto";
import type { HeadquarterListResponseDto } from "../dtos/headquarter/headquarterListResponse.dto";
import type { HeadquarterUpdateDto } from "../dtos/headquarter/headquarterUpdate.dto";

export interface IHeadquarterRepository {
  ListAll(
    request: HeadquarterListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<HeadquarterListResponseDto[]>>>;
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
  GetById(
    id: number,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>>;
  Create(
    request: HeadquarterCreateDto,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>>;
  Update(
    request: HeadquarterUpdateDto,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>>;
}
