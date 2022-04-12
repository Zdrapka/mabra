/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "createdAt",
DROP COLUMN "ownerId",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL;
