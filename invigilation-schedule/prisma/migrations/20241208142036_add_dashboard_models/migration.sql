/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `subject` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `invigilator_count` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "invigilator_count" INTEGER NOT NULL
);
INSERT INTO "new_Exam" ("date", "id", "venue") SELECT "date", "id", "venue" FROM "Exam";
DROP TABLE "Exam";
ALTER TABLE "new_Exam" RENAME TO "Exam";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
