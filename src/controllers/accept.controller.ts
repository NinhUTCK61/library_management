import {
  BookStatus,
  ChiTietPhieuYeuCau,
  NhanBanSach,
  PrismaClient,
  RequestType,
} from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class AcceptController {
  async update(req: Request, res: Response) {
    const data = req.body.books;
    const dataRequest = req.body.requestDetail;
    try {
      for (const item of data) {
        await prisma.nhanBanSach.update({
          where: {
            id: item.id,
          },
          data: {
            status: item.status,
          },
        });
      }

      for (const item of dataRequest) {
        await prisma.chiTietPhieuYeuCau.delete({
          where: {
            id: item.id,
          },
        });
      }

      return res.status(200).json({
        message: "Cập nhật thành công",
      });
    } catch (e) {
      return res.status(200).json({
        message: "Cập nhật thất bại",
      });
    }
  }
}

export default AcceptController;
