-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'USER');

-- CreateTable
CREATE TABLE "ChiTietPhieuNhapKho" (
    "id" VARCHAR(50) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "total_price" INTEGER NOT NULL DEFAULT 0,
    "id_book" VARCHAR(50),
    "id_receipt" VARCHAR(50),

    CONSTRAINT "ChiTietPhieuNhapKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietPhieuYeuCau" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "date" DATE NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_book" VARCHAR(50),
    "id_request_form" VARCHAR(50),

    CONSTRAINT "ChiTietPhieuYeuCau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoaiSach" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,

    CONSTRAINT "LoaiSach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mon" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(100) NOT NULL,

    CONSTRAINT "Mon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhaXuatBan" (
    "id" VARCHAR(50) NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "phone" INTEGER NOT NULL,

    CONSTRAINT "NhaXuatBan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhanBanSach" (
    "id" SERIAL NOT NULL,
    "isbn" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "price" VARCHAR NOT NULL,
    "id_book" VARCHAR(50) NOT NULL,

    CONSTRAINT "nhanbansach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuNhapKho" (
    "id" VARCHAR(50) NOT NULL,
    "received_date" DATE NOT NULL,
    "id_user" VARCHAR(50) NOT NULL,

    CONSTRAINT "PhieuNhapKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuYeuCau" (
    "id" VARCHAR(50) NOT NULL,
    "id_user" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "request_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,

    CONSTRAINT "PhieuYeuCau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sach" (
    "id" VARCHAR(50) NOT NULL,
    "id_type_book" VARCHAR(50) NOT NULL,
    "id_subject" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "publisher" VARCHAR(50) NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "id_user" VARCHAR(50) NOT NULL,
    "id_publisher" VARCHAR(50) NOT NULL,

    CONSTRAINT "Sach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaiKhoan" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SUPER_ADMIN',

    CONSTRAINT "TaiKhoan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_email_key" ON "TaiKhoan"("email");

-- AddForeignKey
ALTER TABLE "ChiTietPhieuNhapKho" ADD CONSTRAINT "ChiTietPhieuNhapKho_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Sach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietPhieuNhapKho" ADD CONSTRAINT "ChiTietPhieuNhapKho_id_receipt_fkey" FOREIGN KEY ("id_receipt") REFERENCES "PhieuNhapKho"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietPhieuYeuCau" ADD CONSTRAINT "ChiTietPhieuYeuCau_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Sach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChiTietPhieuYeuCau" ADD CONSTRAINT "ChiTietPhieuYeuCau_id_request_form_fkey" FOREIGN KEY ("id_request_form") REFERENCES "PhieuYeuCau"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhanBanSach" ADD CONSTRAINT "NhanBanSach_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Sach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhieuNhapKho" ADD CONSTRAINT "PhieuNhapKho_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhieuYeuCau" ADD CONSTRAINT "PhieuYeuCau_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sach" ADD CONSTRAINT "Sach_id_publisher_fkey" FOREIGN KEY ("id_publisher") REFERENCES "NhaXuatBan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sach" ADD CONSTRAINT "Sach_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "Mon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sach" ADD CONSTRAINT "Sach_id_type_book_fkey" FOREIGN KEY ("id_type_book") REFERENCES "LoaiSach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sach" ADD CONSTRAINT "Sach_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
