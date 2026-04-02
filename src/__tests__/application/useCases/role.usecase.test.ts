import { RoleUseCase } from "../../../application/useCases/role.usecase";
import type { IRoleRepository } from "../../../application/repositories/iRole.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../../../application/dtos/common/paginationResponse.dto";
import type { RoleListResponseDto } from "../../../application/dtos/role/roleListResponse.dto";
import type { RoleDetailResponseDto } from "../../../application/dtos/role/roleDetailResponse.dto";
import type { SelectResponseDto } from "../../../application/dtos/common/selectResponse";

const mockRepository: jest.Mocked<IRoleRepository> = {
  ListAll: jest.fn(),
  Select: jest.fn(),
  GetById: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
};

const makeUseCase = () => new RoleUseCase({ roleRepository: mockRepository });

const paginatedResponse: IApiResponse<
  PaginationResponseDto<RoleListResponseDto[]>
> = {
  status: 200,
  message: "OK",
  data: {
    count: 1,
    data: [{ id: 1, name: "Administrador", state: "1" }],
    page: 0,
    pageSize: 10,
  },
};

const detailResponse: IApiResponse<RoleDetailResponseDto | null> = {
  status: 200,
  message: "OK",
  data: { id: 1, name: "Administrador", state: "1" },
};

const selectResponse: IApiResponse<SelectResponseDto[]> = {
  status: 200,
  message: "OK",
  data: [{ id: "1", label: "Administrador" }],
};

beforeEach(() => jest.clearAllMocks());

describe("RoleUseCase", () => {
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
      const payload = { name: "Administrador", state: "1" };

      const result = await makeUseCase().Create(payload);

      expect(mockRepository.Create).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });

  describe("Update", () => {
    it("delegates to repository with the given payload", async () => {
      mockRepository.Update.mockResolvedValue(detailResponse);
      const payload = { id: 1, name: "Super Admin", state: "1" };

      const result = await makeUseCase().Update(payload);

      expect(mockRepository.Update).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });
});
