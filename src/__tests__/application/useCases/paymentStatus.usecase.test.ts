import { PaymentStatusUseCase } from "../../../application/useCases/paymentStatus.usecase";
import type { IPaymentStatusRepository } from "../../../application/repositories/iPaymentStatus.repository";
import type { IApiResponse } from "../../../application/dtos/common/apiResponse.dto";
import type { SelectResponseDto } from "../../../application/dtos/common/selectResponse";

const mockRepository: jest.Mocked<IPaymentStatusRepository> = {
  Select: jest.fn(),
};

const makeUseCase = () =>
  new PaymentStatusUseCase({ paymentStatusRepository: mockRepository });

const selectResponse: IApiResponse<SelectResponseDto[]> = {
  status: 200,
  message: "OK",
  data: [
    { id: "1", label: "Aprobado" },
    { id: "2", label: "Anulado" },
  ],
};

beforeEach(() => jest.clearAllMocks());

describe("PaymentStatusUseCase", () => {
  describe("Select", () => {
    it("delegates to repository and returns result", async () => {
      mockRepository.Select.mockResolvedValue(selectResponse);

      const result = await makeUseCase().Select();

      expect(mockRepository.Select).toHaveBeenCalledTimes(1);
      expect(result).toBe(selectResponse);
    });

    it("returns all payment statuses from repository", async () => {
      mockRepository.Select.mockResolvedValue(selectResponse);

      const result = await makeUseCase().Select();

      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ id: "1", label: "Aprobado" });
      expect(result.data[1]).toEqual({ id: "2", label: "Anulado" });
    });
  });
});
