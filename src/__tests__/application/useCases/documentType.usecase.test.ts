import { DocumentTypeUseCase } from "../../../application/useCases/documentType.usecase";
import type { IDocumentTypeRepository } from "../../../application/repositories/iDocumentType.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../../../application/dtos/common/paginationResponse.dto";
import type { DocumentTypeListResponseDto } from "../../../application/dtos/documentType/documentTypeListResponse.dto";
import type { DocumentTypeDetailResponseDto } from "../../../application/dtos/documentType/documentTypeDetail.Response.dto";
import type { SelectResponseDto } from "../../../application/dtos/common/selectResponse";

const mockRepository: jest.Mocked<IDocumentTypeRepository> = {
  ListAll: jest.fn(),
  Select: jest.fn(),
  GetById: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
};

const makeUseCase = () =>
  new DocumentTypeUseCase({ documentTypeRepository: mockRepository });

const paginatedResponse: IApiResponse<
  PaginationResponseDto<DocumentTypeListResponseDto[]>
> = {
  status: 200,
  message: "OK",
  data: {
    count: 1,
    data: [{ id: 1, name: "DNI", state: "1" }],
    page: 0,
    pageSize: 10,
  },
};

const detailResponse: IApiResponse<DocumentTypeDetailResponseDto | null> = {
  status: 200,
  message: "OK",
  data: { id: 1, name: "DNI", state: "1" },
};

const selectResponse: IApiResponse<SelectResponseDto[]> = {
  status: 200,
  message: "OK",
  data: [{ id: "1", label: "DNI" }],
};

beforeEach(() => jest.clearAllMocks());

describe("DocumentTypeUseCase", () => {
  describe("ListAll", () => {
    it("delegates to repository and returns result", async () => {
      mockRepository.ListAll.mockResolvedValue(paginatedResponse);
      const request = { page: 0, rowsPerPage: 10, name: "", state: "" };

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
      const payload = { name: "DNI", state: "1" };

      const result = await makeUseCase().Create(payload);

      expect(mockRepository.Create).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });

  describe("Update", () => {
    it("delegates to repository with the given payload", async () => {
      mockRepository.Update.mockResolvedValue(detailResponse);
      const payload = { id: 1, name: "Pasaporte", state: "1" };

      const result = await makeUseCase().Update(payload);

      expect(mockRepository.Update).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });
});
