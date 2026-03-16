import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { DocumentTypeCreateDto } from "../dtos/documentType/documentTypeCreate.dto";
import type { DocumentTypeDetailResponseDto } from "../dtos/documentType/documentTypeDetail.Response.dto";
import type { DocumentTypeListRequestDto } from "../dtos/documentType/documentTypeListRequest.dto";
import type { DocumentTypeListResponseDto } from "../dtos/documentType/documentTypeListResponse.dto";
import type { DocumentTypeUpdateDto } from "../dtos/documentType/documentTypeUpdate.dto";
import type { IDocumentTypeRepository } from "../repositories/iDocumentType.repository";

export class DocumentTypeUseCase {
  _documentTypeRepository;

  constructor(dependencies: {
    documentTypeRepository: IDocumentTypeRepository;
  }) {
    this._documentTypeRepository = dependencies.documentTypeRepository;
  }

  async ListAll(
    request: DocumentTypeListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<DocumentTypeListResponseDto[]>>
  > {
    return await this._documentTypeRepository.ListAll(request);
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._documentTypeRepository.Select();
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>> {
    return await this._documentTypeRepository.GetById(id);
  }

  async Create(
    request: DocumentTypeCreateDto,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>> {
    return await this._documentTypeRepository.Create(request);
  }

  async Update(
    request: DocumentTypeUpdateDto,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>> {
    return await this._documentTypeRepository.Update(request);
  }
}
