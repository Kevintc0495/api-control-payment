import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class StudentListRequestDto extends PaginationRequestDto {
  documentNumber: string = "";
  lastName: string = "";
  names: string = "";
  state: string = "";
}
