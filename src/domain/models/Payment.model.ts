export interface IPaymentModel {
  id?: number;
  idHeadquarter: number;
  // idUser: number;
  idStudent: number;
  idPaymentStatus: number;
  idPaymentType: number;
  idBank?: number;
  customer: string;
  documentNumber: string;
  cellphone: string;
  email: string;
  date: string;
  code: string;
  cancellationComment: string;
  comment: string;
  amount: number;
  otherAmounts: number;
  userCreate?: number;
  userUpdate?: number;
}
