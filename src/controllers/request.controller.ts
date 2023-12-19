import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RequestController {
  async create(req: Request, res: Response) {
    const input = req.body;
    const results = await prisma.phieuYeuCau.create({
      data: {
        id_user: input.id_user,
        type: input.type,
        request_date: new Date(),
        due_date: new Date(),
      },
    });

    if (!results) {
      return res.status(200).json({
        message: "Tạo phiếu yêu cầu thất bại",
      });
    }

    return res.status(200).json({
      message: "Tạo phiếu yêu cầu thành công",
      results,
    });
  }

  async createDetail(req: Request, res: Response) {
    const input = req.body;

    const results = await prisma.chiTietPhieuYeuCau.create({
      data: {
        title: input.title,
        date: new Date(),
        quantity: input.quantity,
        id_request_form: input.id_request_form,
        NhanBanSach: {
          connect: input.nhanbansach.map((item: string) => {
            return {
              id: item,
            };
          }),
        },
      },

      include: {
        NhanBanSach: true,
        PhieuYeuCau: true,
      },
    });

    if (!results) {
      return res.status(200).json({
        message: "Tạo phiếu yêu cầu thất bại",
      });
    }

    return res.status(200).json({
      message: "Tạo phiếu yêu cầu thành công",
      results,
    });
  }

  async getAllRequest(req: Request, res: Response) {
    const results = await prisma.phieuYeuCau.findMany({
      where: {
        id_user: req.params.id,
      },
    });

    if (!results) {
      return res.status(200).json({
        message: "Không có phiếu yêu cầu nào",
      });
    }

    return res.status(200).json({
      message: "Lấy phiếu yêu cầu thành công",
      results,
    });
  }

  async indexForUser(req: Request, res: Response) {
    const results = await prisma.chiTietPhieuYeuCau.findMany({
      where: {
        id: req.params.id,
      },
      include: {
        NhanBanSach: true,
        PhieuYeuCau: true,
      },
    });

    if (!results) {
      return res.status(200).json({
        message: "Không có phiếu yêu cầu nào",
      });
    }

    return res.status(200).json({
      message: "Lấy phiếu yêu cầu thành công",
      results,
    });
  }

  async indexForAdmin(req: Request, res: Response) {
    const results = await prisma.chiTietPhieuYeuCau.findMany({
      include: {
        NhanBanSach: true,
        PhieuYeuCau: true,
      },
    });

    if (!results) {
      return res.status(200).json({
        message: "Không có phiếu yêu cầu nào",
      });
    }

    return res.status(200).json({
      message: "Lấy phiếu yêu cầu thành công",
      results,
    });
  }
}

export default RequestController;
