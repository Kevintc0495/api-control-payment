import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { IHeadquarterRepository } from "../repositories/iHeadquarter.repository";
import type { HeadquarterCreateDto } from "../dtos/headquarter/headquarterCreate.dto";
import type { HeadquarterDetailResponseDto } from "../dtos/headquarter/headquarterDetailResponse.dto";
import type { HeadquarterListRequestDto } from "../dtos/headquarter/headquarterListRequest.dto";
import type { HeadquarterListResponseDto } from "../dtos/headquarter/headquarterListResponse.dto";
import type { HeadquarterUpdateDto } from "../dtos/headquarter/headquarterUpdate.dto";

export class HeadquarterUseCase {
  _headquarterRepository;

  constructor(dependencies: { headquarterRepository: IHeadquarterRepository }) {
    this._headquarterRepository = dependencies.headquarterRepository;
  }

  async ListAll(
    request: HeadquarterListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<HeadquarterListResponseDto[]>>
  > {
    return await this._headquarterRepository.ListAll(request);
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._headquarterRepository.Select();
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>> {
    return await this._headquarterRepository.GetById(id);
  }

  async Create(
    request: HeadquarterCreateDto,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>> {
    return await this._headquarterRepository.Create(request);
  }

  async Update(
    request: HeadquarterUpdateDto,
  ): Promise<IApiResponse<HeadquarterDetailResponseDto | null>> {
    return await this._headquarterRepository.Update(request);
  }
}
