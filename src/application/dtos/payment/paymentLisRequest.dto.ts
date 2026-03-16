import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class PaymentListRequestDto extends PaginationRequestDto {
  idStudent: number = 0;
  idPaymentType: number = 0;
  idHeadquarter: number = 0;
  idPaymentStatus: number = 0;
  code: string = "";
}
