-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Picture" ALTER COLUMN "uploaderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
