/*
  Warnings:

  - You are about to drop the column `created_at` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "created_at",
DROP COLUMN "owner_id",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;
