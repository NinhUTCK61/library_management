import { Request, Response } from "express";
import { PrismaClient, BookStatus } from "@prisma/client";

const prisma = new PrismaClient();

class BookController {
  async indexForUser(req: Request, res: Response) {
    const books = await prisma.nhanBanSach.findMany({
      where: {
        status: BookStatus.AVAILABLE,
      },
      include: {
        Sach: {
          include: {
            NhaXuatBan: true,
            LoaiSach: true,
            Mon: true,
          },
        },
      },
    });
    if (!books) {
      return res.status(200).json({
        message: "Không có sách nào",
      });
    }
    return res.status(200).json({
      message: "Lấy sách thành công",
      books,
    });
  }

  async indexForAdmin(req: Request, res: Response) {
    const books = await prisma.nhanBanSach.findMany({
      include: {
        Sach: { include: { NhaXuatBan: true, LoaiSach: true, Mon: true } },
      },
    });
    if (!books) {
      return res.status(200).json({
        message: "Không có sách nào",
      });
    }
    return res.status(200).json({
      message: "Lấy sách thành công",
      books,
    });
  }

  async getAllForUser(req: Request, res: Response) {
    const books = await prisma.nhanBanSach.findMany({
      where: {
        status: BookStatus.AVAILABLE,
      },
      include: {
        Sach: true,
      },
    });
    if (!books) {
      return res.status(200).json({
        message: "Không có sách nào",
      });
    }
    return res.status(200).json({
      message: "Lấy sách thành công",
      books,
    });
  }
}

export default BookController;
