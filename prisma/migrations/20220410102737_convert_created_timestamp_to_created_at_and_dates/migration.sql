/*
  Warnings:

  - You are about to drop the column `createdTimestamp` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `createdTimestamp` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdTimestamp` on the `User` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "createdTimestamp",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdTimestamp",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdTimestamp",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL;
