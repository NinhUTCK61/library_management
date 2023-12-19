import { TaiKhoan } from "@prisma/client";
import { tokenConfig } from "../config/token";
import { signJwt } from "../utils";

class AuthService {
  signTokens(user: TaiKhoan) {
    const access_token = signJwt({ user }, tokenConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: `${tokenConfig.ACCESS_TOKEN_EXPIRES_IN}d`,
    });

    const refresh_token = signJwt({ user }, tokenConfig.REFRESH_TOKEN_SECRET, {
      expiresIn: `${tokenConfig.REFRESH_TOKEN_EXPIRES_IN}d`,
    });

    return { access_token, refresh_token };
  }
}

export default AuthService;
