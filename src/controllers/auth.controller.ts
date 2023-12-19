import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AuthService from "../services/auth.service";
import bcrypt, { hash } from "bcrypt";

const authService = new AuthService();
const prisma = new PrismaClient();

class AuthController {
  async login(req: Request, res: Response) {
    const input = req.body;
    const userExist = await prisma.taiKhoan.findFirst({
      where: {
        email: input.email,
      },
    });

    if (!userExist) {
      return res.status(200).json({
        type: "error",
        message: "Tài khoản không tồn tại",
      });
    }

    const isCorrect = await bcrypt.compare(input.password, userExist.password);

    if (!isCorrect) {
      return res.status(200).json({
        type: "error",
        message: "Sai mật khẩu",
      });
    }

    const { access_token, refresh_token } = authService.signTokens(userExist);
    const { password, ...user } = userExist;

    return res.status(200).json({
      type: "success",
      message: "Đăng nhập thành công",
      user,
      access_token,
      refresh_token,
    });
  }

  async logout(req: Request, res: Response) {
    res.cookie("access_token", "", { maxAge: -1 });
    res.cookie("refresh_token", "", { maxAge: -1 });
    res.cookie("logged_in", "", {
      maxAge: -1,
    });

    return res.status(200).json({
      message: "Đăng xuất thành công",
    });
  }

  async register(req: Request, res: Response) {
    const input = req.body;
    const userExist = await prisma.taiKhoan.findFirst({
      where: {
        email: input.email,
      },
    });

    if (userExist) {
      return res.status(200).json({
        message: "Email đã được sử dụng",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(input.password, salt);

    const newUser = await prisma.taiKhoan.create({
      data: {
        ...input,
        password: hashedPassword,
      },
    });

    const { access_token, refresh_token } = authService.signTokens(newUser);
    const { password, ...user } = newUser;

    return res.status(200).json({
      message: "Đăng ký thành công",
      user,
      access_token,
      refresh_token,
    });
  }
}

export default AuthController;
