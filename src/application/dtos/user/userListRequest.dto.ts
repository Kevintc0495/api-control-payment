import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class UserListRequestDto extends PaginationRequestDto {
  documentNumber: string = "";
  lastName: string = "";
  names: string = "";
  state: string = "";
}
