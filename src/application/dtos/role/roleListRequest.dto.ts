import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class RoleListRequestDto extends PaginationRequestDto {
  name: string = "";
  state: string = "";
}
