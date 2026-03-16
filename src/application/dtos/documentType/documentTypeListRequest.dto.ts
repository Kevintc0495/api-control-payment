import { PaginationRequestDto } from "../common/paginationRequest.dto";

export class DocumentTypeListRequestDto extends PaginationRequestDto {
  name: string = "";
  state: string = "";
}
