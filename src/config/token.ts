import { addDays } from "date-fns";
import { CookieOptions } from "express";

export const tokenConfig = {
  ACCESS_TOKEN_EXPIRES_IN: 15,
  REFRESH_TOKEN_EXPIRES_IN: 30,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

// Cookie options
export const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: addDays(new Date(), tokenConfig.ACCESS_TOKEN_EXPIRES_IN),
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: addDays(new Date(), tokenConfig.REFRESH_TOKEN_EXPIRES_IN),
};
