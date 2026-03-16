import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { RoleCreateDto } from "../dtos/role/roleCreate.dto";
import type { RoleDetailResponseDto } from "../dtos/role/roleDetailResponse.dto";
import type { RoleListRequestDto } from "../dtos/role/roleListRequest.dto";
import type { RoleListResponseDto } from "../dtos/role/roleListResponse.dto";
import type { RoleUpdateDto } from "../dtos/role/roleUpdate.dto";
import type { IRoleRepository } from "../repositories/iRole.repository";

export class RoleUseCase {
  _roleRepository;

  constructor(dependencies: { roleRepository: IRoleRepository }) {
    this._roleRepository = dependencies.roleRepository;
  }

  async ListAll(
    request: RoleListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<RoleListResponseDto[]>>> {
    return await this._roleRepository.ListAll(request);
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._roleRepository.Select();
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>> {
    return await this._roleRepository.GetById(id);
  }

  async Create(
    request: RoleCreateDto,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>> {
    return await this._roleRepository.Create(request);
  }

  async Update(
    request: RoleUpdateDto,
  ): Promise<IApiResponse<RoleDetailResponseDto | null>> {
    return await this._roleRepository.Update(request);
  }
}
