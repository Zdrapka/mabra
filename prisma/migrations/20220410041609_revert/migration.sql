/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `createdTimestamp` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `created_at` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "createdAt",
ADD COLUMN     "createdTimestamp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;
