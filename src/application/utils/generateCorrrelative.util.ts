import type { IPaymentModel } from "@/domain/models/Payment.model";

export const generateCorrelative = (lastPayment: IPaymentModel | null) => {
  let newCode = "000000001";

  if (!lastPayment) return newCode;

  const lastCode = parseInt(lastPayment.code, 10);
  return (newCode = String(lastCode + 1).padStart(9, "0"));
};
