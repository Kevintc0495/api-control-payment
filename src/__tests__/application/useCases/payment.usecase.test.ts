import { PaymentUseCase } from "../../../application/useCases/payment.usecase";
import type { IPaymentRepository } from "../../../application/repositories/iPayment.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { PaginationResponseDto } from "../../../application/dtos/common/paginationResponse.dto";
import type { PaymentListResponseDto } from "../../../application/dtos/payment/paymentListResponse.dto";
import type { PaymentDetailResponseDto } from "../../../application/dtos/payment/paymentDetailResponse.dto";
import type { PaymentPdfResponseDto } from "../../../application/dtos/payment/paymentPdfResponse.dto";

const mockRepository: jest.Mocked<IPaymentRepository> = {
  ListAll: jest.fn(),
  GetById: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
  GeneratePdf: jest.fn(),
  GenerateExcel: jest.fn(),
};

const makeUseCase = () =>
  new PaymentUseCase({ paymentRepository: mockRepository });

const paginatedResponse: IApiResponse<
  PaginationResponseDto<PaymentListResponseDto[]>
> = {
  status: 200,
  message: "OK",
  data: { count: 1, data: [], page: 0, pageSize: 10 },
};

const detailResponse: IApiResponse<PaymentDetailResponseDto | null> = {
  status: 200,
  message: "OK",
  data: {
    id: 1,
    idHeadquarter: 1,
    idStudent: 1,
    idPaymentStatus: 1,
    idPaymentType: 1,
    idBank: 1,
    customer: "Juan Pérez",
    documentNumber: "12345678",
    cellphone: "999999999",
    email: "juan@example.com",
    code: "PAY-001",
    cancellationComment: "",
    comment: "",
    amount: 150,
    otherAmounts: 0,
    createBy: "",
    updateBy: "",
    canceledBy: "",
  },
};

const pdfResponse: IApiResponse<PaymentPdfResponseDto | null> = {
  status: 200,
  message: "OK",
  data: null,
};

const excelResponse: IApiResponse<string | null> = {
  status: 200,
  message: "OK",
  data: "https://storage.example.com/report.xlsx",
};

beforeEach(() => jest.clearAllMocks());

describe("PaymentUseCase", () => {
  describe("ListAll", () => {
    it("delegates to repository and returns result", async () => {
      mockRepository.ListAll.mockResolvedValue(paginatedResponse);
      const request = {
        page: 0,
        rowsPerPage: 10,
        idStudent: 0,
        idPaymentType: 0,
        idHeadquarter: 0,
        idPaymentStatus: 0,
        code: "",
      };

      const result = await makeUseCase().ListAll(request);

      expect(mockRepository.ListAll).toHaveBeenCalledTimes(1);
      expect(mockRepository.ListAll).toHaveBeenCalledWith(request);
      expect(result).toBe(paginatedResponse);
    });
  });

  describe("GetById", () => {
    it("delegates to repository with the given request", async () => {
      mockRepository.GetById.mockResolvedValue(detailResponse);
      const request = { id: 1, isAdmin: true, userId: 1 };

      const result = await makeUseCase().GetById(request);

      expect(mockRepository.GetById).toHaveBeenCalledWith(request);
      expect(result).toBe(detailResponse);
    });
  });

  describe("Create", () => {
    it("delegates to repository with the given payload", async () => {
      mockRepository.Create.mockResolvedValue(detailResponse);
      const payload = {
        idHeadquarter: 1,
        idStudent: 1,
        idPaymentStatus: 1,
        idPaymentType: 1,
        idBank: 1,
        customer: "Juan Pérez",
        documentNumber: "12345678",
        cellphone: "999999999",
        email: "juan@example.com",
        code: "PAY-001",
        cancellationComment: "",
        comment: "",
        amount: 150,
        otherAmounts: 0,
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
        idStudent: 1,
        idPaymentStatus: 2,
        idPaymentType: 1,
        idBank: 1,
        idHeadquarter: 1,
        customer: "Juan Pérez",
        documentNumber: "12345678",
        cellphone: "999999999",
        email: "juan@example.com",
        code: "PAY-001",
        comment: "",
        cancellationComment: "Anulado por error",
        amount: 150,
        otherAmounts: "",
        userUpdate: 1,
      };

      const result = await makeUseCase().Update(payload);

      expect(mockRepository.Update).toHaveBeenCalledWith(payload);
      expect(result).toBe(detailResponse);
    });
  });

  describe("GeneratePdf", () => {
    it("delegates to repository with the payment id", async () => {
      mockRepository.GeneratePdf.mockResolvedValue(pdfResponse);

      const result = await makeUseCase().GeneratePdf(1);

      expect(mockRepository.GeneratePdf).toHaveBeenCalledWith(1);
      expect(result).toBe(pdfResponse);
    });
  });

  describe("GenerateExcel", () => {
    it("delegates to repository with the given request", async () => {
      mockRepository.GenerateExcel.mockResolvedValue(excelResponse);
      const request = {
        idStudent: 0,
        idPaymentType: 0,
        idHeadquarter: 0,
        idPaymentStatus: 0,
        code: "",
        isAdmin: true,
        userId: 1,
      };

      const result = await makeUseCase().GenerateExcel(request);

      expect(mockRepository.GenerateExcel).toHaveBeenCalledWith(request);
      expect(result).toBe(excelResponse);
    });
  });
});
