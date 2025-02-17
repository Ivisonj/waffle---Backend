-- CreateTable
CREATE TABLE "Newsletters" (
    "id" UUID NOT NULL,
    "resource_id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "opened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_channel" TEXT,

    CONSTRAINT "Newsletters_pkey" PRIMARY KEY ("id")
);
