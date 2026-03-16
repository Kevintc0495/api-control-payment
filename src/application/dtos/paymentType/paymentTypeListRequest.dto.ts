import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class PaymentTypeListRequestDto extends PaginationRequestDto {
  name: string = "";
  state: string = "";
}
