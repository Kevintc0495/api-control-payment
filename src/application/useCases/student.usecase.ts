import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../dtos/common/paginationResponse.dto";
import type { SelectResponseDto } from "../dtos/common/selectResponse";
import type { StudentCreateDto } from "../dtos/student/studentCreate.dto";
import type { StudentDetailResponseDto } from "../dtos/student/studentDetailResponse.dto";
import type { StudentListRequestDto } from "../dtos/student/studentListRequest.dto";
import type { StudentListResponseDto } from "../dtos/student/studentListResponse.dto";
import type { StudentUpdateDto } from "../dtos/student/studentUpdate.dto";
import type { IStudentRepository } from "../repositories/iStudent.repository";

export class StudentUseCase {
  _studentRepository;

  constructor(dependencies: { studentRepository: IStudentRepository }) {
    this._studentRepository = dependencies.studentRepository;
  }

  async ListAll(
    request: StudentListRequestDto,
  ): Promise<IApiResponse<PaginationResponseDto<StudentListResponseDto[]>>> {
    return await this._studentRepository.ListAll(request);
  }

  async Select(): Promise<IApiResponse<SelectResponseDto[]>> {
    return await this._studentRepository.Select();
  }

  async GetById(
    id: number,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>> {
    return await this._studentRepository.GetById(id);
  }

  async Create(
    request: StudentCreateDto,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>> {
    return await this._studentRepository.Create(request);
  }

  async Update(
    request: StudentUpdateDto,
  ): Promise<IApiResponse<StudentDetailResponseDto | null>> {
    return await this._studentRepository.Update(request);
  }
}
