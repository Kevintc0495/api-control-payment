import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { UserCreateDto } from "../dtos/user/userCreate.dto";
import type { UserDetailResponseDto } from "../dtos/user/userDetailResponse.dto";
import type { UserListRequestDto } from "../dtos/user/userListRequest.dto";
import type { UserListResponseDto } from "../dtos/user/userListResponse.dto";
import type { UserUpdateDto } from "../dtos/user/userUpdate.dto";
import type { IUserRepository } from "../repositories/iUser.repository";

export class UserUseCase {
  _userRepository;

  constructor(dependencies: { userRepository: IUserRepository }) {
    this._userRepository = dependencies.userRepository;
  }

  async ListAll(
    request: UserListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<UserListResponseDto[]>>> {
    return await this._userRepository.ListAll(request);
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<UserDetailResponseDto | null>> {
    return await this._userRepository.GetById(id);
  }

  async Create(
    request: UserCreateDto,
  ): Promise<IApiResponse<UserDetailResponseDto | null>> {
    return await this._userRepository.Create(request);
  }

  async Update(
    request: UserUpdateDto,
  ): Promise<IApiResponse<UserDetailResponseDto | null>> {
    return await this._userRepository.Update(request);
  }
}
