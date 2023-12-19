import { Request, Response } from "express";
import { SignOptions, sign, verify } from "jsonwebtoken";
import { tokenConfig } from "../config/token";
import { TaiKhoan } from "@prisma/client";

export const signJwt = (
  payload: Record<string, unknown>,
  secret: string,
  options: SignOptions = {}
) =>
  sign(payload, secret, {
    ...(options && options),
  });

export const verifyJwt = <T>(token: string, secret: string): T | null =>
  verify(token, secret) as T;

export const deserializeRequest = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  // Get the token
  let access_token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    access_token = req.headers.authorization.split(" ")[1]!;
  } else if (req.cookies?.access_token) {
    access_token = req.cookies.access_token as string;
  }

  const notAuthenticated = {
    req,
    res,
    user: null,
  };

  if (!access_token) {
    return notAuthenticated;
  }

  let decoded;

  // Validate Access Token
  try {
    decoded = verifyJwt<{ user: TaiKhoan }>(
      access_token,
      tokenConfig.ACCESS_TOKEN_SECRET
    );
  } catch (error) {
    res.cookie("access_token", "", { maxAge: -1 });
    res.cookie("refresh_token", "", { maxAge: -1 });
    res.cookie("logged_in", "", {
      maxAge: -1,
    });
  }

  if (!decoded?.user) {
    return notAuthenticated;
  }

  return {
    req,
    res,
    user: decoded.user,
  };
};
