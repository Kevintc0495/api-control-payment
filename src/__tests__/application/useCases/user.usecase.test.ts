import { UserUseCase } from "../../../application/useCases/user.usecase";
import type { IUserRepository } from "../../../application/repositories/iUser.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../../../application/dtos/common/paginationResponse.dto";
import type { UserListResponseDto } from "../../../application/dtos/user/userListResponse.dto";
import type { UserDetailResponseDto } from "../../../application/dtos/user/userDetailResponse.dto";

const mockRepository: jest.Mocked<IUserRepository> = {
  ListAll: jest.fn(),
  GetById: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
};

const makeUseCase = () => new UserUseCase({ userRepository: mockRepository });

const paginatedResponse: IApiResponse<
  PaginationResponseDto<UserListResponseDto[]>
> = {
  status: 200,
  message: "OK",
  data: { count: 1, data: [], page: 0, pageSize: 10 },
};

const detailResponse: IApiResponse<UserDetailResponseDto | null> = {
  status: 200,
  message: "OK",
  data: {
    id: 1,
    idRole: 1,
    idDocumentsType: 1,
    names: "Admin",
    lastName: "User",
    documentNumber: "12345678",
    email: "admin@example.com",
    cellPhone: "999999999",
    age: "30",
    birthday: "1996-01-01",
    address: "Av. Principal 123",
    state: "1",
  },
};

beforeEach(() => jest.clearAllMocks());

describe("UserUseCase", () => {
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
        idRole: 1,
        idDocumentsType: 1,
        names: "Admin",
        lastName: "User",
        documentNumber: "12345678",
        email: "admin@example.com",
        password: "hashed_password",
        repeatPassword: "hashed_password",
        cellPhone: "999999999",
        age: "30",
        birthday: "1996-01-01",
        address: "Av. Principal 123",
        state: "1",
        userCreate: 1,
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
        idRole: 1,
        idDocumentsType: 1,
        names: "Admin",
        lastName: "User",
        documentNumber: "12345678",
        email: "updated@example.com",
        password: "new_password",
        repeatPassword: "new_password",
        cellPhone: "999999999",
        age: "30",
        birthday: "1996-01-01",
        address: "Av. Nueva 456",
        state: "0",
        userUpdate: 1,
      };

      const result = await makeUseCase().Update(payload);

      expect(mockRepository.Update).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });
});
