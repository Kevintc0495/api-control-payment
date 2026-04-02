import ExcelJS from "exceljs";
import type { IExcelService } from "@/application/services/iExcel.service";

export class ExcelService<T> implements IExcelService<T> {
  private workbook: ExcelJS.Workbook;
  private sheet: ExcelJS.Worksheet;

  constructor(sheetName: string = "Datos") {
    this.workbook = new ExcelJS.Workbook();
    this.sheet = this.workbook.addWorksheet(sheetName);
  }

  setHeaders(headers: string[]) {
    this.sheet.columns = headers.map((header) => ({
      header,
      key: header,
      width: 15,
    }));
  }

  addRows(data: T[], mapper: (item: T) => unknown[]) {
    data.forEach((item) => {
      this.sheet.addRow(mapper(item));
    });
  }

  async autoSizeColumns() {
    this.sheet.columns.forEach((column) => {
      let maxLength = 0;

      if (typeof column.eachCell === "function") {
        column.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value?.toString() || "";
          maxLength = Math.max(maxLength, cellValue.length);
        });

        column.width = maxLength < 15 ? 15 : maxLength + 2;
      }
    });
  }

  async generateBuffer(): Promise<Buffer> {
    await this.autoSizeColumns();
    return (await this.workbook.xlsx.writeBuffer()) as unknown as Buffer;
  }
}
