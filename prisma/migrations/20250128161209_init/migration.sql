-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('text', 'picture');

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderName" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actualtSendTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MessageType" NOT NULL,
    "content" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelSamplePicture" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vaginaColorName" TEXT NOT NULL,
    "bodyPartName" TEXT NOT NULL,
    "pictureFramingName" TEXT NOT NULL,

    CONSTRAINT "ModelSamplePicture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PictureFromSender" (
    "id" SERIAL NOT NULL,
    "verySuggestiveScore" DOUBLE PRECISION NOT NULL,
    "suggestiveScore" DOUBLE PRECISION NOT NULL,
    "mildlySuggestiveScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PictureFromSender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyPart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BodyPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PictureFraming" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PictureFraming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaginaColor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VaginaColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "kidsCount" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelSocialAccount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "socialAccountName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "ModelSocialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialAccountType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SocialAccountType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conversation_modelId_idx" ON "Conversation"("modelId");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_vaginaColorName_idx" ON "ModelSamplePicture"("vaginaColorName");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_bodyPartName_idx" ON "ModelSamplePicture"("bodyPartName");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_pictureFramingName_idx" ON "ModelSamplePicture"("pictureFramingName");

-- CreateIndex
CREATE UNIQUE INDEX "BodyPart_name_key" ON "BodyPart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PictureFraming_name_key" ON "PictureFraming"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VaginaColor_name_key" ON "VaginaColor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Model_userName_key" ON "Model"("userName");

-- CreateIndex
CREATE INDEX "ModelSocialAccount_modelId_idx" ON "ModelSocialAccount"("modelId");

-- CreateIndex
CREATE INDEX "ModelSocialAccount_socialAccountName_idx" ON "ModelSocialAccount"("socialAccountName");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccountType_name_key" ON "SocialAccountType"("name");
