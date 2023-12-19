-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('BORROW', 'RETURN', 'PAY');

-- AlterTable
ALTER TABLE "NhanBanSach" ADD COLUMN     "chiTietPhieuYeuCauId" VARCHAR(50);

-- AddForeignKey
ALTER TABLE "NhanBanSach" ADD CONSTRAINT "NhanBanSach_chiTietPhieuYeuCauId_fkey" FOREIGN KEY ("chiTietPhieuYeuCauId") REFERENCES "ChiTietPhieuYeuCau"("id") ON DELETE SET NULL ON UPDATE CASCADE;
