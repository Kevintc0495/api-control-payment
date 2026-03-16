import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import type { LoginDto } from "@/application/dtos/account/loginRequest.dto";
import type { LoginResponseDto } from "@/application/dtos/account/loginResponse.dto";
import type { IAccountService } from "@/application/services/iaccount.service";
import Users from "../persistence/models/Users.model";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import Peoples from "../persistence/models/Peoples.model";
import type { IApiResponse } from "@/application/dtos/common/apiResponse.dto";
import type { RecoveryPasswordRequestDto } from "@/application/dtos/account/recoveryPassword.dto";
import { RoleEnum } from "@/domain/enums/role.enum";
import type { PayloadAccessTokenDto } from "@/application/dtos/account/payloadAccessToken.dto";
import type { IEmailService } from "@/application/services/iemail.service";
import type { IEmailModel } from "@/application/models/common/iEmail.model";
import type { ChangePasswordRequestDto } from "@/application/dtos/account/changePassword.dto";
import { CodeErrorException } from "@/application/exceptions/code-error.exception";
import { ValidationException } from "@/application/exceptions/validation.exception";

export class AccountService implements IAccountService {
  _emailService;
  _emailUtil;

  constructor(dependencies: {
    emailService: IEmailService;
    emailUtil: IEmailModel;
  }) {
    this._emailService = dependencies.emailService;
    this._emailUtil = dependencies.emailUtil;
  }

  async Login(request: LoginDto): Promise<IApiResponse<LoginResponseDto>> {
    const { email, password } = request;

    const filterEmail = email.toLowerCase().trim();
    const user = await Users.findOne({ where: { email: filterEmail } });

    if (user == null) throw new NotFoundException("", filterEmail);

    if (!user.state) throw new ValidationException("Usuario inactivo");

    const decryptedPassword = CryptoJS.SHA256(password).toString();
    if (decryptedPassword !== user.password)
      throw new ValidationException("Contraseña incorrecta");

    const people = await Peoples.findByPk(user.idPeople);
    if (people == null)
      throw new NotFoundException("People", `${user.idPeople}`);

    const response = {
      message: "Acceso autorizado",
      data: {
        id: user.id,
        lastName: people?.lastName,
        name: people?.names,
        isAdmin: !!(user.idRole === 1),
      },
      status: 200,
    };

    return response;
  }

  async GenerateAccessToken(payload: PayloadAccessTokenDto): Promise<string> {
    const secretKey = String(process.env.SECRET);
    // const expiresIn = Math.floor(Date.now() / 1000) - 30;
    // return jwt.sign(payload, secretKey, { expiresIn });
    return jwt.sign(payload, secretKey);
  }

  async RecoveryPassword(
    request: RecoveryPasswordRequestDto,
  ): Promise<IApiResponse<boolean>> {
    const { email } = request;

    const filterEmail = email.toLowerCase().trim();

    const user = await Users.findOne({ where: { email: filterEmail } });
    if (!user) throw new NotFoundException("Usuario", filterEmail);

    if (user.idRole !== RoleEnum.ADMIN)
      throw new ValidationException(
        "Opción disponible solo para usuarios administradores",
      );

    const people = await Peoples.findByPk(user.idPeople);

    const codeValidation = Math.floor(100000 + Math.random() * 900000);
    user.code = codeValidation.toString();
    await user.save();

    const params = [
      {
        nombre: people?.names.split(" ")[0] || "",
        contenido: codeValidation.toString(),
      },
    ];

    const template = this._emailUtil.EmailTemplate("codeEmail", params);

    const message = {
      to: filterEmail,
      subject: "Código de recuperación",
      html: template,
    };

    await this._emailService.Send(message);

    setTimeout(async () => {
      user.code = "";
      await user.save();
    }, 300000);

    const response = {
      data: true,
      message: "Código de recuperación enviado a su bandeja",
      status: 200,
    };

    return response;
  }

  async ChangePassword(
    request: ChangePasswordRequestDto,
  ): Promise<IApiResponse<boolean>> {
    const { code, password, repeatPassword } = request;

    if (password !== repeatPassword)
      throw new ValidationException("Los campos de contraseña no coinciden");

    const user = await Users.findOne({ where: { code } });
    if (!user) throw new CodeErrorException("Código invalido");

    const hashedPassword = CryptoJS.SHA256(password).toString();
    user.password = hashedPassword;
    user.save();

    const response = {
      data: true,
      message: "Contraseña cambiada",
      status: 200,
    };

    return response;
  }
}
