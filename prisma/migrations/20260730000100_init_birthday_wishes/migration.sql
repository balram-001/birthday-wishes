-- CreateTable
CREATE TABLE "BirthdayWish" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "friendName" TEXT NOT NULL,
    "message" TEXT,
    "photoData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BirthdayWish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BirthdayWish_slug_key" ON "BirthdayWish"("slug");

-- CreateIndex
CREATE INDEX "BirthdayWish_slug_idx" ON "BirthdayWish"("slug");
