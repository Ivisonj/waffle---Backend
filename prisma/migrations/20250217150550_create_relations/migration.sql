-- AddForeignKey
ALTER TABLE "Newsletters" ADD CONSTRAINT "Newsletters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
