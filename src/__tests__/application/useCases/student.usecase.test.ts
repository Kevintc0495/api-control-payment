import { StudentUseCase } from "../../../application/useCases/student.usecase";
import type { IStudentRepository } from "../../../application/repositories/iStudent.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../../../application/dtos/common/paginationResponse.dto";
import type { StudentListResponseDto } from "../../../application/dtos/student/studentListResponse.dto";
import type { StudentDetailResponseDto } from "../../../application/dtos/student/studentDetailResponse.dto";
import type { SelectResponseDto } from "../../../application/dtos/common/selectResponse";

const mockRepository: jest.Mocked<IStudentRepository> = {
  ListAll: jest.fn(),
  Select: jest.fn(),
  GetById: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
};

const makeUseCase = () =>
  new StudentUseCase({ studentRepository: mockRepository });

const studentDetail = {
  id: 1,
  idDocumentsType: 1,
  idHeadquarter: 1,
  names: "Carlos",
  lastName: "Torres",
  age: "10",
  birthday: "2015-05-01",
  address: "Av. Los Pinos 123",
  tutorNames: "Juan",
  tutorLastName: "Torres",
  cellphoneTutor: "987654321",
  cellPhone: "999888777",
  documentNumber: "12345678",
  email: "carlos@example.com",
  schooling: "Primaria",
  grate: "4to",
  school: "Colegio San Juan",
  diagnosis: true,
  medicalReport: false,
  certificateDisability: false,
  conadisCard: false,
  psychologicalReport: true,
  state: "1",
};

const paginatedResponse: IApiResponse<
  PaginationResponseDto<StudentListResponseDto[]>
> = {
  status: 200,
  message: "OK",
  data: { count: 1, data: [], page: 0, pageSize: 10 },
};

const detailResponse: IApiResponse<StudentDetailResponseDto | null> = {
  status: 200,
  message: "OK",
  data: studentDetail,
};

const selectResponse: IApiResponse<SelectResponseDto[]> = {
  status: 200,
  message: "OK",
  data: [{ id: "1", label: "Carlos Torres" }],
};

beforeEach(() => jest.clearAllMocks());

describe("StudentUseCase", () => {
  describe("ListAll", () => {
    it("delegates to repository and returns result", async () => {
      mockRepository.ListAll.mockResolvedValue(paginatedResponse);
      const request = {
        page: 0,
        rowsPerPage: 10,
        documentNumber: "",
        lastName: "",
        names: "",
        state: "",
      };

      const result = await makeUseCase().ListAll(request);

      expect(mockRepository.ListAll).toHaveBeenCalledTimes(1);
      expect(mockRepository.ListAll).toHaveBeenCalledWith(request);
      expect(result).toBe(paginatedResponse);
    });
  });

  describe("Select", () => {
    it("delegates to repository and returns result", async () => {
      mockRepository.Select.mockResolvedValue(selectResponse);

      const result = await makeUseCase().Select();

      expect(mockRepository.Select).toHaveBeenCalledTimes(1);
      expect(result).toBe(selectResponse);
    });
  });

  describe("GetById", () => {
    it("delegates to repository with the given id", async () => {
      mockRepository.GetById.mockResolvedValue(detailResponse);

      const result = await makeUseCase().GetById(1);

      expect(mockRepository.GetById).toHaveBeenCalledWith(1);
      expect(result).toBe(detailResponse);
    });
  });

  describe("Create", () => {
    it("delegates to repository with the given payload", async () => {
      mockRepository.Create.mockResolvedValue(detailResponse);
      const payload = { ...studentDetail, password: "pass123" };
      delete (payload as { id?: number }).id;

      const result = await makeUseCase().Create(payload);

      expect(mockRepository.Create).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });

  describe("Update", () => {
    it("delegates to repository with the given payload", async () => {
      mockRepository.Update.mockResolvedValue(detailResponse);
      const payload = {
        ...studentDetail,
        names: "Carlos Alberto",
        password: "pass123",
      };

      const result = await makeUseCase().Update(payload);

      expect(mockRepository.Update).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });
});
