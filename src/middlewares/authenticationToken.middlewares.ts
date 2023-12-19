import { NextFunction, Request, Response } from "express";
import { deserializeRequest, verifyJwt } from "../utils";
import { Role, TaiKhoan } from "@prisma/client";

export const admin = (req: Request, res: Response, next: NextFunction) => {
  const decoded = deserializeRequest({ req, res });
  req.body = {
    ...req.body,
    user: decoded?.user as TaiKhoan,
  };
  console.log(decoded?.user);
  if (!decoded?.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (decoded?.user?.role !== Role.SUPER_ADMIN) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  next();
};

export const user = (req: Request, res: Response, next: NextFunction) => {
  const decoded = deserializeRequest({ req, res });
  req.body = {
    ...req.body,
    user: decoded?.user as TaiKhoan,
  };
  if (!decoded?.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};
