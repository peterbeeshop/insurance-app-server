-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "ClaimType" AS ENUM ('theft', 'accident', 'medical', 'other');

-- CreateEnum
CREATE TYPE "ClaimStatusType" AS ENUM ('pending', 'approved', 'denied');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "Claim" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "ClaimType" NOT NULL,
    "description" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "images" TEXT[],
    "status" "ClaimStatusType" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Claim_userId_idx" ON "Claim"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Claim_userId_status_key" ON "Claim"("userId", "status");

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
