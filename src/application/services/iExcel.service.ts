export interface IExcelService<T> {
  setHeaders(headers: string[]): void;
  addRows(data: T[], mapper: (item: T) => unknown[]): void;
  generateBuffer(): Promise<Buffer>;
}
