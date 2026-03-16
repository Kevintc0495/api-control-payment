import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class BankListRequestDto extends PaginationRequestDto {
  name: string = "";
  state: string = "";
}
