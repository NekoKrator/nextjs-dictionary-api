/*
  Warnings:

  - You are about to drop the column `status` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "status";

-- DropEnum
DROP TYPE "WordStatus";
