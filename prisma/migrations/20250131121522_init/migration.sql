-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'assistant');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('text', 'picture');

-- CreateTable
CREATE TABLE "Citizenship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Citizenship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnglishProficiencyLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EnglishProficiencyLevel_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "SkinTone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkinTone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ethnicity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ethnicity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialAccountType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SocialAccountType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderUserName" TEXT NOT NULL,
    "modelUserName" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actualtSendTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageIndex" INTEGER NOT NULL,
    "senderRole" "Role" NOT NULL,
    "type" "MessageType" NOT NULL,
    "text" TEXT,
    "pictureFromSenderUrl" TEXT,
    "pictureFromSenderKey" TEXT,
    "pictureFromModelUrl" TEXT,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PictureFromSender" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "verySuggestiveScore" DOUBLE PRECISION NOT NULL,
    "suggestiveScore" DOUBLE PRECISION NOT NULL,
    "mildlySuggestiveScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PictureFromSender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "childCount" INTEGER,
    "age" INTEGER,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelPhysicalAttributes" (
    "id" SERIAL NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "bust" INTEGER,
    "waist" INTEGER,
    "modelId" TEXT NOT NULL,
    "skinToneName" TEXT,
    "ethnicityName" TEXT,

    CONSTRAINT "ModelPhysicalAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelSamplePicture" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vaginaColorName" TEXT,
    "bodyPartName" TEXT NOT NULL,
    "pictureFramingName" TEXT NOT NULL,
    "consolidatedDescription" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "ModelSamplePicture_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Citizenship_name_key" ON "Citizenship"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EnglishProficiencyLevel_name_key" ON "EnglishProficiencyLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BodyPart_name_key" ON "BodyPart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PictureFraming_name_key" ON "PictureFraming"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VaginaColor_name_key" ON "VaginaColor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SkinTone_name_key" ON "SkinTone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ethnicity_name_key" ON "Ethnicity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccountType_name_key" ON "SocialAccountType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_senderUserName_key" ON "Conversation"("senderUserName");

-- CreateIndex
CREATE INDEX "Conversation_modelUserName_idx" ON "Conversation"("modelUserName");

-- CreateIndex
CREATE INDEX "Message_pictureFromModelUrl_idx" ON "Message"("pictureFromModelUrl");

-- CreateIndex
CREATE INDEX "Message_pictureFromSenderUrl_idx" ON "Message"("pictureFromSenderUrl");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "PictureFromSender_url_key" ON "PictureFromSender"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Model_userName_key" ON "Model"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "ModelPhysicalAttributes_modelId_key" ON "ModelPhysicalAttributes"("modelId");

-- CreateIndex
CREATE INDEX "ModelPhysicalAttributes_ethnicityName_idx" ON "ModelPhysicalAttributes"("ethnicityName");

-- CreateIndex
CREATE INDEX "ModelPhysicalAttributes_skinToneName_idx" ON "ModelPhysicalAttributes"("skinToneName");

-- CreateIndex
CREATE INDEX "ModelPhysicalAttributes_modelId_idx" ON "ModelPhysicalAttributes"("modelId");

-- CreateIndex
CREATE UNIQUE INDEX "ModelSamplePicture_url_key" ON "ModelSamplePicture"("url");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_modelId_idx" ON "ModelSamplePicture"("modelId");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_vaginaColorName_idx" ON "ModelSamplePicture"("vaginaColorName");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_bodyPartName_idx" ON "ModelSamplePicture"("bodyPartName");

-- CreateIndex
CREATE INDEX "ModelSamplePicture_pictureFramingName_idx" ON "ModelSamplePicture"("pictureFramingName");

-- CreateIndex
CREATE INDEX "ModelSocialAccount_modelId_idx" ON "ModelSocialAccount"("modelId");

-- CreateIndex
CREATE INDEX "ModelSocialAccount_socialAccountName_idx" ON "ModelSocialAccount"("socialAccountName");
