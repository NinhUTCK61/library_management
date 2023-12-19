/*
  Warnings:

  - The `status` column on the `NhanBanSach` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'BORROWED', 'LOST');

-- AlterTable
ALTER TABLE "NhanBanSach" DROP COLUMN "status",
ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE';
