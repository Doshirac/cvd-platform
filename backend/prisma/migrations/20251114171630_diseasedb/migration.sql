-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'ru');

-- CreateEnum
CREATE TYPE "SymptomCategory" AS ENUM ('sign', 'symptom');

-- CreateEnum
CREATE TYPE "SymptomPriority" AS ENUM ('primary', 'secondary');

-- CreateEnum
CREATE TYPE "Typicality" AS ENUM ('typical', 'possible', 'rare');

-- CreateEnum
CREATE TYPE "RiskDirection" AS ENUM ('risk', 'protective');

-- CreateTable
CREATE TABLE "Disease" (
    "disease_id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "prevention" TEXT,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("disease_id")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "symptom_id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "category" "SymptomCategory",

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("symptom_id")
);

-- CreateTable
CREATE TABLE "RiskFactor" (
    "risk_factor_id" SERIAL NOT NULL,
    "code" VARCHAR(10),
    "name" TEXT NOT NULL,
    "definition" TEXT,

    CONSTRAINT "RiskFactor_pkey" PRIMARY KEY ("risk_factor_id")
);

-- CreateTable
CREATE TABLE "DiseaseSymptom" (
    "disease_symptom_id" SERIAL NOT NULL,
    "disease_id" INTEGER NOT NULL,
    "symptom_id" INTEGER NOT NULL,
    "priority" "SymptomPriority" NOT NULL,
    "typicality" "Typicality" NOT NULL DEFAULT 'typical',

    CONSTRAINT "DiseaseSymptom_pkey" PRIMARY KEY ("disease_symptom_id")
);

-- CreateTable
CREATE TABLE "DiseaseRiskFactor" (
    "disease_risk_factor_id" SERIAL NOT NULL,
    "disease_id" INTEGER NOT NULL,
    "risk_factor_id" INTEGER NOT NULL,
    "direction" "RiskDirection" NOT NULL DEFAULT 'risk',

    CONSTRAINT "DiseaseRiskFactor_pkey" PRIMARY KEY ("disease_risk_factor_id")
);

-- CreateTable
CREATE TABLE "Source" (
    "source_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("source_id")
);

-- CreateTable
CREATE TABLE "disease_translation" (
    "id" SERIAL NOT NULL,
    "disease_id" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "prevention" TEXT,

    CONSTRAINT "disease_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symptom_translation" (
    "id" SERIAL NOT NULL,
    "symptom_id" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "term" TEXT NOT NULL,

    CONSTRAINT "symptom_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_factor_translation" (
    "id" SERIAL NOT NULL,
    "risk_factor_id" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT,
    "definition" TEXT,

    CONSTRAINT "risk_factor_translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disease_code_key" ON "Disease"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Symptom_term_key" ON "Symptom"("term");

-- CreateIndex
CREATE UNIQUE INDEX "RiskFactor_code_key" ON "RiskFactor"("code");

-- CreateIndex
CREATE INDEX "idx_disease_symptoms_d" ON "DiseaseSymptom"("disease_id");

-- CreateIndex
CREATE INDEX "idx_disease_symptoms_s" ON "DiseaseSymptom"("symptom_id");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseSymptom_disease_id_symptom_id_key" ON "DiseaseSymptom"("disease_id", "symptom_id");

-- CreateIndex
CREATE INDEX "idx_disease_risk_d" ON "DiseaseRiskFactor"("disease_id");

-- CreateIndex
CREATE INDEX "idx_disease_risk_rf" ON "DiseaseRiskFactor"("risk_factor_id");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseRiskFactor_disease_id_risk_factor_id_key" ON "DiseaseRiskFactor"("disease_id", "risk_factor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Source_name_key" ON "Source"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_link_key" ON "Source"("link");

-- CreateIndex
CREATE UNIQUE INDEX "disease_translation_disease_id_locale_key" ON "disease_translation"("disease_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "symptom_translation_symptom_id_locale_key" ON "symptom_translation"("symptom_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "risk_factor_translation_risk_factor_id_locale_key" ON "risk_factor_translation"("risk_factor_id", "locale");

-- AddForeignKey
ALTER TABLE "DiseaseSymptom" ADD CONSTRAINT "DiseaseSymptom_disease_id_fkey" FOREIGN KEY ("disease_id") REFERENCES "Disease"("disease_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseSymptom" ADD CONSTRAINT "DiseaseSymptom_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "Symptom"("symptom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRiskFactor" ADD CONSTRAINT "DiseaseRiskFactor_disease_id_fkey" FOREIGN KEY ("disease_id") REFERENCES "Disease"("disease_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRiskFactor" ADD CONSTRAINT "DiseaseRiskFactor_risk_factor_id_fkey" FOREIGN KEY ("risk_factor_id") REFERENCES "RiskFactor"("risk_factor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_translation" ADD CONSTRAINT "disease_translation_disease_id_fkey" FOREIGN KEY ("disease_id") REFERENCES "Disease"("disease_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "symptom_translation" ADD CONSTRAINT "symptom_translation_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "Symptom"("symptom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_factor_translation" ADD CONSTRAINT "risk_factor_translation_risk_factor_id_fkey" FOREIGN KEY ("risk_factor_id") REFERENCES "RiskFactor"("risk_factor_id") ON DELETE CASCADE ON UPDATE CASCADE;
