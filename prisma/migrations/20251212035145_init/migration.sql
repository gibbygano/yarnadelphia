-- CreateTable
CREATE TABLE "cart" (
    "id" UUID NOT NULL,
    "items" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);
