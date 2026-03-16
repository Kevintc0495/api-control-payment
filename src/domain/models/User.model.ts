export interface IUserModel {
  id?: number;
  idRole: number;
  idPeople: number;
  email: string;
  password: string;
  state: boolean;
  code: string;
  userCreate?: number;
  userUpdate?: number;
}
