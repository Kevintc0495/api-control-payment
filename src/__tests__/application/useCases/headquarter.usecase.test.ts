import { HeadquarterUseCase } from "../../../application/useCases/headquarter.usecase";
import type { IHeadquarterRepository } from "../../../application/repositories/iHeadquarter.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../../../application/dtos/common/paginationResponse.dto";
import type { HeadquarterListResponseDto } from "../../../application/dtos/headquarter/headquarterListResponse.dto";
import type { HeadquarterDetailResponseDto } from "../../../application/dtos/headquarter/headquarterDetailResponse.dto";
import type { SelectResponseDto } from "../../../application/dtos/common/selectResponse";

const mockRepository: jest.Mocked<IHeadquarterRepository> = {
  ListAll: jest.fn(),
  Select: jest.fn(),
  GetById: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
};

const makeUseCase = () =>
  new HeadquarterUseCase({ headquarterRepository: mockRepository });

const paginatedResponse: IApiResponse<
  PaginationResponseDto<HeadquarterListResponseDto[]>
> = {
  status: 200,
  message: "OK",
  data: {
    count: 1,
    data: [
      { id: 1, name: "Sede Central", address: "Av. Principal 123", state: "1" },
    ],
    page: 0,
    pageSize: 10,
  },
};

const detailResponse: IApiResponse<HeadquarterDetailResponseDto | null> = {
  status: 200,
  message: "OK",
  data: {
    id: 1,
    name: "Sede Central",
    address: "Av. Principal 123",
    state: "1",
  },
};

const selectResponse: IApiResponse<SelectResponseDto[]> = {
  status: 200,
  message: "OK",
  data: [{ id: "1", label: "Sede Central" }],
};

beforeEach(() => jest.clearAllMocks());

describe("HeadquarterUseCase", () => {
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
      const payload = {
        name: "Sede Norte",
        address: "Calle Norte 456",
        state: "1",
      };

      const result = await makeUseCase().Create(payload);

      expect(mockRepository.Create).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });

  describe("Update", () => {
    it("delegates to repository with the given payload", async () => {
      mockRepository.Update.mockResolvedValue(detailResponse);
      const payload = {
        id: 1,
        name: "Sede Central Actualizada",
        address: "Av. Nueva 999",
        state: "1",
      };

      const result = await makeUseCase().Update(payload);

      expect(mockRepository.Update).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });
});
