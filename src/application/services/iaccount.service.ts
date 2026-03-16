import type { ChangePasswordRequestDto } from "../dtos/account/changePassword.dto";
import type { LoginDto } from "../dtos/account/loginRequest.dto";
import type { LoginResponseDto } from "../dtos/account/loginResponse.dto";
import type { RecoveryPasswordRequestDto } from "../dtos/account/recoveryPassword.dto";
import type { IApiResponse } from "../dtos/common/apiResponse.dto";
import type { TokenPayload } from "../models/common/token-payload.model";

export interface IAccountService {
  Login(request: LoginDto): Promise<IApiResponse<LoginResponseDto>>;
  GenerateAccessToken(request: TokenPayload): Promise<string>;
  RecoveryPassword(
    request: RecoveryPasswordRequestDto,
  ): Promise<IApiResponse<boolean>>;
  ChangePassword(
    request: ChangePasswordRequestDto,
  ): Promise<IApiResponse<boolean>>;
}
