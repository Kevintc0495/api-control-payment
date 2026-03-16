import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { StudentCreateDto } from "../dtos/student/studentCreate.dto";
import type { StudentDetailResponseDto } from "../dtos/student/studentDetailResponse.dto";
import type { StudentListRequestDto } from "../dtos/student/studentListRequest.dto";
import type { StudentListResponseDto } from "../dtos/student/studentListResponse.dto";
import type { StudentUpdateDto } from "../dtos/student/studentUpdate.dto";

export interface IStudentRepository {
  ListAll(
    request: StudentListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<StudentListResponseDto[]>>>;
  Select(): Promise<IApiResponse<SelectResponseDto[]>>;
  GetById(id: number): Promise<IApiResponse<StudentDetailResponseDto | null>>;
  Create(
    request: StudentCreateDto,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>>;
  Update(
    request: StudentUpdateDto,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>>;
}
