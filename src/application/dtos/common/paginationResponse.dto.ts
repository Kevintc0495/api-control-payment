export interface PaginationResponseDto<T> {
  count: number;
  data: T;
  page: number;
  pageSize: number;
}
