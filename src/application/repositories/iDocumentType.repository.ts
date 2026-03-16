import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { DocumentTypeCreateDto } from "../dtos/documentType/documentTypeCreate.dto";
import type { DocumentTypeDetailResponseDto } from "../dtos/documentType/documentTypeDetail.Response.dto";
import type { DocumentTypeListRequestDto } from "../dtos/documentType/documentTypeListRequest.dto";
import type { DocumentTypeListResponseDto } from "../dtos/documentType/documentTypeListResponse.dto";
import type { DocumentTypeUpdateDto } from "../dtos/documentType/documentTypeUpdate.dto";

export interface IDocumentTypeRepository {
  ListAll(
    request: DocumentTypeListRequestDto,
  ): Promise<
    IApiResponse<PaginationResponseDto<DocumentTypeListResponseDto[]>>
  >;
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
  GetById(
    id: number,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>>;
  Create(
    request: DocumentTypeCreateDto,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>>;
  Update(
    request: DocumentTypeUpdateDto,
  ): Promise<IApiResponse<DocumentTypeDetailResponseDto | null>>;
}
