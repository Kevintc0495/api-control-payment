import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { UserCreateDto } from "../dtos/user/userCreate.dto";
import type { UserDetailResponseDto } from "../dtos/user/userDetailResponse.dto";
import type { UserListRequestDto } from "../dtos/user/userListRequest.dto";
import type { UserListResponseDto } from "../dtos/user/userListResponse.dto";
import type { UserUpdateDto } from "../dtos/user/userUpdate.dto";

export interface IUserRepository {
  ListAll(
    request: UserListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<UserListResponseDto[]>>>;
  GetById(id: number): Promise<IApiResponse<UserDetailResponseDto | null>>;
  Create(
    request: UserCreateDto,
  ): Promise<IApiResponse<UserDetailResponseDto | null>>;
  Update(
    request: UserUpdateDto,
  ): Promise<IApiResponse<UserDetailResponseDto | null>>;
}
