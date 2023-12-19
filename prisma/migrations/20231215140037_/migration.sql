/*
  Warnings:

  - You are about to alter the column `phone` on the `NhaXuatBan` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - You are about to alter the column `phone` on the `TaiKhoan` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "NhaXuatBan" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "TaiKhoan" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(10);
