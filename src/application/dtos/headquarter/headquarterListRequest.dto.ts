import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class HeadquarterListRequestDto extends PaginationRequestDto {
  name: string = "";
  state: string = "";
}
