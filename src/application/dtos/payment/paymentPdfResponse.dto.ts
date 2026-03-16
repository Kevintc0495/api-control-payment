import type { IPdfModel } from "@/application/models/common/iPdf.model";

export interface PaymentPdfResponseDto {
  isActive: boolean;
  params: IPdfModel;
}
