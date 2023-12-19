/*
  Warnings:

  - The `type` column on the `PhieuYeuCau` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PhieuYeuCau" DROP COLUMN "type",
ADD COLUMN     "type" "RequestType" NOT NULL DEFAULT 'BORROW';
