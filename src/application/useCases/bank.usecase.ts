import type { BankCreateDto } from "../dtos/bank/bankCreate.dto";
import type { BankDetailResponseDto } from "../dtos/bank/bankDetail.Response.dto";
import type { BankListRequestDto } from "../dtos/bank/bankListRequest.dto";
import type { BankListResponseDto } from "../dtos/bank/bankListResponse.dto";
import type { BankUpdateDto } from "../dtos/bank/bankUpdate.dto";
import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { IBankRepository } from "../repositories/iBank.repository";

export class BankUseCase {
  _bankRepository;

  constructor(dependencies: { bankRepository: IBankRepository }) {
    this._bankRepository = dependencies.bankRepository;
  }

  async ListAll(
    request: BankListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<BankListResponseDto[]>>> {
    return await this._bankRepository.ListAll(request);
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._bankRepository.Select();
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<BankDetailResponseDto | null>> {
    return await this._bankRepository.GetById(id);
  }

  async Create(
    request: BankCreateDto,
  ): Promise<IApiResponse<BankDetailResponseDto | null>> {
    return await this._bankRepository.Create(request);
  }

  async Update(
    request: BankUpdateDto,
  ): Promise<IApiResponse<BankDetailResponseDto | null>> {
    return await this._bankRepository.Update(request);
  }
}
