import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { RoleCreateDto } from "../dtos/role/roleCreate.dto";
import type { RoleDetailResponseDto } from "../dtos/role/roleDetailResponse.dto";
import type { RoleListRequestDto } from "../dtos/role/roleListRequest.dto";
import type { RoleListResponseDto } from "../dtos/role/roleListResponse.dto";
import type { RoleUpdateDto } from "../dtos/role/roleUpdate.dto";

export interface IRoleRepository {
  ListAll(
    request: RoleListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<RoleListResponseDto[]>>>;
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
  GetById(id: number): Promise<IApiResponse<RoleDetailResponseDto | null>>;
  Create(
    request: RoleCreateDto,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>>;
  Update(
    request: RoleUpdateDto,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>>;
}
