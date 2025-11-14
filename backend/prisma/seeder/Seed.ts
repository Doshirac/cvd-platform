import { PrismaClient } from "@prisma/client";
import { ISeeder } from "./interfaces/ISeeder";
import { logger } from "../../src/utils/logger";
import { seedingMessages as msg} from "./constants/messages";

const { $Enums } = require('@prisma/client');
const SymptomPriority = $Enums.SymptomPriority;
const Typicality = $Enums.Typicality;
const RiskDirection = $Enums.RiskDirection;
const Locale = $Enums.Locale;

type Disease = {
  id: number;
  code: string;
  name: string;
  description?: string;
  prevention?: string;
};

type Symptom = {
  id: number;
  term: string;
  category?: "sign" | "symptom";
};

type RiskFactor = {
  id: number;
  code?: string;
  name: string;
  definition?: string;
};

export class Seed implements ISeeder {
    constructor(private readonly prisma: PrismaClient) {}

    async run(): Promise<void> {
        try {
            logger.log(msg.SEEDING_STARTED);

            await this.prisma.disease.deleteMany();
            await this.prisma.symptom.deleteMany();
            await this.prisma.riskFactor.deleteMany();
            await this.prisma.diseaseSymptom.deleteMany();
            await this.prisma.diseaseRiskFactor.deleteMany();
            await this.prisma.source.deleteMany();

            await this.prisma.disease.createMany({
                skipDuplicates: true,
                data: [
                    { 
                        code: 'IHD', 
                        name: 'Ischaemic Heart Disease', 
                        description: 'Coronary atherosclerosis → decreased myocardial blood flow.', 
                        prevention: 'Stop smoking, control BP/LDL, exercise, diet.' 
                    },
                    { 
                        code: 'AMI', 
                        name: 'Acute Myocardial Infarction', 
                        description: 'Acute coronary artery occlusion with myocardial necrosis.', 
                        prevention: 'Aggressive risk-factor control; GDMT.' 
                    },
                    { 
                        code: 'HF', 
                        name: 'Heart Failure', 
                        description: 'Pump failure with inadequate cardiac output.', 
                        prevention: 'Treat HTN/CAD; salt restriction; weight control.' 
                    },
                    { 
                        code: 'AF', 
                        name: 'Atrial Fibrillation', 
                        description: 'Irregular supraventricular tachyarrhythmia.', 
                        prevention: 'BP control, weight loss, limit alcohol.' 
                    },
                    { 
                        code: 'STROKE', 
                        name: 'Stroke (Ischaemic)', 
                        description: 'Cerebral ischaemia → focal neurological deficit.', 
                        prevention: 'BP control, AF anticoagulation, statins, no smoking.' 
                    },
                    { 
                        code: 'PAD', 
                        name: 'Peripheral Artery Disease', 
                        description: 'Atherosclerosis of peripheral arteries; claudication.', 
                        prevention: 'Smoking cessation, statins, antiplatelets, walking.' 
                    },
                    { 
                        code: 'HHD', 
                        name: 'Hypertensive Heart Disease', 
                        description: 'Cardiac changes from chronic hypertension.', 
                        prevention: 'Tight BP control; lifestyle.' 
                    },
                    { 
                        code: 'HCM', 
                        name: 'Hypertrophic Cardiomyopathy', 
                        description: 'Genetic LV hypertrophy; possible LVOT obstruction.', 
                        prevention: 'Family screening, SCD risk stratification.' 
                    },
                    { 
                        code: 'DCM', 
                        name: 'Dilated Cardiomyopathy', 
                        description: 'LV dilation with systolic dysfunction.', 
                        prevention: 'Avoid alcohol/toxins; treat causes.' 
                    },
                    { 
                        code: 'VHD', 
                        name: 'Valvular Heart Disease', 
                        description: 'Valve stenosis/regurgitation (AS, MR, etc.).', 
                        prevention: 'IE prevention; treat rheumatic disease early.' 
                    },
                    { 
                        code: 'MYO', 
                        name: 'Myocarditis', 
                        description: 'Inflammation of myocardium (often viral/immune).', 
                        prevention: 'Vaccination; infection prevention; rest in acute phase.' 
                    },
                    { 
                        code: 'PERI', 
                        name: 'Pericarditis', 
                        description: 'Inflammation of pericardium with pleuritic chest pain.', 
                        prevention: 'Treat triggers; avoid exertion during acute phase.' 
                    },
                    { 
                        code: 'ENDO', 
                        name: 'Infective Endocarditis', 
                        description: 'Endocardial/valvular infection by microorganisms.', 
                        prevention: 'Dental hygiene; targeted prophylaxis in high risk.' 
                    },
                    { 
                        code: 'PE', 
                        name: 'Pulmonary Embolism', 
                        description: 'Pulmonary artery thromboembolism.', 
                        prevention: 'VTE prophylaxis; early mobilization.' 
                    },
                    { 
                        code: 'DVT', 
                        name: 'Deep Vein Thrombosis', 
                        description: 'Thrombus in deep veins (often legs).', 
                        prevention: 'VTE prophylaxis; hydration; movement.' 
                    },
                ],
            });

            await this.prisma.symptom.createMany({
                skipDuplicates: true,
                data: [
                    { 
                        term: 'Chest pain', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Dyspnea', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Orthopnea', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Paroxysmal nocturnal dyspnea', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Palpitations', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Syncope', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Claudication', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Leg swelling',
                         category: 'sign' 
                        },
                    { 
                        term: 'Pleuritic chest pain', 
                        category: 'symptom' 
                    },
                    { 
                        term: 'Unilateral weakness', 
                        category: 'sign' 
                    },
                    { 
                        term: 'Aphasia', 
                        category: 'sign' 
                    },
                    { 
                        term: 'Fever', 
                        category: 'sign' 
                    },
                    { 
                        term: 'New murmur', 
                        category: 'sign' 
                    },
                    { 
                        term: 'Pericardial rub', 
                        category: 'sign' 
                    },
                    { 
                        term: 'Reduced exercise tolerance', 
                        category: 'symptom' 
                    },
                ],
            });

            await this.prisma.riskFactor.createMany({
                skipDuplicates: true,
                data: [
                    { 
                        code: 'HTN', 
                        name: 'Hypertension', 
                        definition: 'BP ≥ 140/90 mmHg (context dependent).' 
                    },
                    { 
                        code: 'LDL_HIGH', 
                        name: 'High LDL', 
                        definition: 'LDL above guideline threshold.' 
                    },
                    { 
                        code: 'SMOKING', 
                        name: 'Smoking', 
                        definition: 'Active tobacco use.' 
                    },
                    { 
                        code: 'DM', 
                        name: 'Diabetes Mellitus', 
                        definition: 'Type 1/2 diabetes mellitus.' 
                    },
                    { 
                        code: 'OBESITY', 
                        name: 'Obesity', 
                        definition: 'BMI ≥ 30 kg/m².' 
                    },
                    { 
                        code: 'AF_RF', 
                        name: 'Atrial Fibrillation (as risk)', 
                        definition: 'AF as risk for stroke/embolism.' 
                    },
                    { 
                        code: 'CKD', 
                        name: 'Chronic Kidney Disease', 
                        definition: 'eGFR < 60 mL/min/1.73 m² or markers of damage.' 
                    },
                    { 
                        code: 'FH_CVD', 
                        name: 'Family History of CVD', 
                        definition: 'Premature CVD in first-degree relative.' 
                    },
                    { 
                        code: 'SEDENTARY', 
                        name: 'Sedentary lifestyle', 
                        definition: 'Low physical activity.' 
                    },
                    { 
                        code: 'HYPERTRIG', 
                        name: 'Hypertriglyceridemia', 
                        definition: 'TG above guideline threshold.' 
                    },
                    { 
                        code: 'ALCOHOL', 
                        name: 'Excess alcohol', 
                        definition: 'Harmful alcohol intake.' 
                    },
                    { 
                        code: 'INFECTION', 
                        name: 'Infection', 
                        definition: 'Infectious triggers (IE/pericarditis/myocarditis).' 
                    },
                ],
            });

            await this.prisma.source.createMany({
                skipDuplicates: true,
                data: [
                    { 
                        name: 'Eurostat', 
                        link: 'https://ec.europa.eu/eurostat/' 
                    },
                    { 
                        name: 'CDC WONDER', 
                        link: 'https://wonder.cdc.gov/' 
                    },
                    { 
                        name: 'WHO', 
                        link: 'https://www.who.int/data' 
                    },
                ],
            });

            const diseases = await this.prisma.disease.findMany();
            const symptoms = await this.prisma.symptom.findMany();
            const riskFactors = await this.prisma.riskFactor.findMany();

            const D: Record<string, number> = Object.fromEntries(
                diseases.map((d: { id: number; code: string | null }) => [d.code!, d.id])
            );
            const S: Record<string, number> = Object.fromEntries(
                symptoms.map((s: { id: number; term: string }) => [s.term, s.id])
            );
            const R: Record<string, number> = Object.fromEntries(
                riskFactors
                    .filter((r: { id: number; code: string | null }) => r.code !== null)
                    .map((r: { id: number; code: string | null }) => [r.code!, r.id])
            );

            const diseaseSymptomsData = [
                // IHD / AMI
                { diseaseId: D['IHD'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['IHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['AMI'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AMI'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // HF
                { diseaseId: D['HF'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Orthopnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Paroxysmal nocturnal dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Reduced exercise tolerance'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // AF
                { diseaseId: D['AF'], symptomId: S['Palpitations'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AF'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // STROKE
                { diseaseId: D['STROKE'], symptomId: S['Unilateral weakness'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['STROKE'], symptomId: S['Aphasia'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // PAD
                { diseaseId: D['PAD'], symptomId: S['Claudication'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PAD'], symptomId: S['Leg swelling'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // VHD
                { diseaseId: D['VHD'], symptomId: S['New murmur'], priority: SymptomPriority.primary, typicality: Typicality.typical },

                // PERI
                { diseaseId: D['PERI'], symptomId: S['Pleuritic chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PERI'], symptomId: S['Pericardial rub'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // MYO
                { diseaseId: D['MYO'], symptomId: S['Chest pain'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['MYO'], symptomId: S['Fever'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // ENDO
                { diseaseId: D['ENDO'], symptomId: S['Fever'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ENDO'], symptomId: S['New murmur'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // PE
                { diseaseId: D['PE'], symptomId: S['Pleuritic chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PE'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },

                // DVT
                { diseaseId: D['DVT'], symptomId: S['Leg swelling'], priority: SymptomPriority.primary, typicality: Typicality.typical },

                // HHD / HCM / DCM — базовые связи
                { diseaseId: D['HHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['HCM'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['DCM'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
            ];

            await this.prisma.diseaseSymptom.createMany({
                data: diseaseSymptomsData,
                skipDuplicates: true,
            });

            const diseaseRiskFactorsData = [
                // Atherosclerotic cluster
                { diseaseId: D['IHD'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['IHD'], riskFactorId: R['LDL_HIGH'], direction: RiskDirection.risk },
                { diseaseId: D['IHD'], riskFactorId: R['SMOKING'], direction: RiskDirection.risk },
                { diseaseId: D['AMI'], riskFactorId: R['SMOKING'], direction: RiskDirection.risk },
                { diseaseId: D['AMI'], riskFactorId: R['LDL_HIGH'], direction: RiskDirection.risk },
                { diseaseId: D['PAD'], riskFactorId: R['SMOKING'], direction: RiskDirection.risk },
                { diseaseId: D['PAD'], riskFactorId: R['LDL_HIGH'], direction: RiskDirection.risk },
                { diseaseId: D['PAD'], riskFactorId: R['DM'], direction: RiskDirection.risk },

                // Metabolic cluster
                { diseaseId: D['HF'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['HF'], riskFactorId: R['OBESITY'], direction: RiskDirection.risk },
                { diseaseId: D['DCM'], riskFactorId: R['ALCOHOL'], direction: RiskDirection.risk },
                { diseaseId: D['HHD'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['HHD'], riskFactorId: R['OBESITY'], direction: RiskDirection.risk },

                // Arrhythmia & stroke
                { diseaseId: D['AF'], riskFactorId: R['OBESITY'], direction: RiskDirection.risk },
                { diseaseId: D['STROKE'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['STROKE'], riskFactorId: R['AF_RF'], direction: RiskDirection.risk },

                // Valvular / Infections / Inflammation
                { diseaseId: D['ENDO'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },
                { diseaseId: D['PERI'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },
                { diseaseId: D['MYO'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },

                // Thromboembolism
                { diseaseId: D['PE'], riskFactorId: R['OBESITY'], direction: RiskDirection.risk },
                { diseaseId: D['DVT'], riskFactorId: R['OBESITY'], direction: RiskDirection.risk },

                // Additional factors
                { diseaseId: D['IHD'], riskFactorId: R['SEDENTARY'], direction: RiskDirection.risk },
                { diseaseId: D['IHD'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },
                { diseaseId: D['IHD'], riskFactorId: R['HYPERTRIG'], direction: RiskDirection.risk },
                { diseaseId: D['AMI'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['HF'], riskFactorId: R['DM'], direction: RiskDirection.risk },
                { diseaseId: D['STROKE'], riskFactorId: R['DM'], direction: RiskDirection.risk },
                { diseaseId: D['PAD'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
            ];

            await this.prisma.diseaseRiskFactor.createMany({
                data: diseaseRiskFactorsData,
                skipDuplicates: true,
            });

            // Russian translations for diseases
            await this.prisma.diseaseTranslation.createMany({
                skipDuplicates: true,
                data: [
                    { diseaseId: D['IHD'], locale: Locale.ru, name: 'Ишемическая болезнь сердца', description: 'Атеросклероз коронарных артерий → снижение кровотока в миокарде.', prevention: 'Прекращение курения, контроль АД/ЛПНП, физическая активность, диета.' },
                    { diseaseId: D['AMI'], locale: Locale.ru, name: 'Острый инфаркт миокарда', description: 'Острая окклюзия коронарной артерии с некрозом миокарда.', prevention: 'Агрессивный контроль факторов риска; ГДМТ.' },
                    { diseaseId: D['HF'], locale: Locale.ru, name: 'Сердечная недостаточность', description: 'Снижение насосной функции с недостаточным сердечным выбросом.', prevention: 'Лечение АГ/ИБС; ограничение соли; контроль веса.' },
                    { diseaseId: D['AF'], locale: Locale.ru, name: 'Фибрилляция предсердий', description: 'Нерегулярная суправентрикулярная тахиаритмия.', prevention: 'Контроль АД, снижение веса, ограничение алкоголя.' },
                    { diseaseId: D['STROKE'], locale: Locale.ru, name: 'Инсульт (ишемический)', description: 'Церебральная ишемия → очаговый неврологический дефицит.', prevention: 'Контроль АД, антикоагуляция при ФП, статины, отказ от курения.' },
                    { diseaseId: D['PAD'], locale: Locale.ru, name: 'Заболевание периферических артерий', description: 'Атеросклероз периферических артерий; хромота.', prevention: 'Отказ от курения, статины, антиагреганты, ходьба.' },
                    { diseaseId: D['HHD'], locale: Locale.ru, name: 'Гипертензивное сердечное заболевание', description: 'Сердечные изменения при хронической гипертензии.', prevention: 'Жесткий контроль АД; изменение образа жизни.' },
                    { diseaseId: D['HCM'], locale: Locale.ru, name: 'Гипертрофическая кардиомиопатия', description: 'Генетическая гипертрофия ЛЖ; возможна обструкция ЛВОТ.', prevention: 'Скрининг семьи, стратификация риска ВСС.' },
                    { diseaseId: D['DCM'], locale: Locale.ru, name: 'Дилатационная кардиомиопатия', description: 'Дилатация ЛЖ с систолической дисфункцией.', prevention: 'Избегать алкоголя/токсинов; лечить причины.' },
                    { diseaseId: D['VHD'], locale: Locale.ru, name: 'Порок клапанов сердца', description: 'Стеноз/регургитация клапанов (АС, МР и др.).', prevention: 'Профилактика ИЭ; раннее лечение ревматизма.' },
                ],
            });

            // Russian translations for symptoms
            await this.prisma.symptomTranslation.createMany({
                skipDuplicates: true,
                data: [
                    { symptomId: S['Chest pain'], locale: Locale.ru, term: 'Боль в груди' },
                    { symptomId: S['Dyspnea'], locale: Locale.ru, term: 'Одышка' },
                    { symptomId: S['Orthopnea'], locale: Locale.ru, term: 'Ортопноэ' },
                    { symptomId: S['Palpitations'], locale: Locale.ru, term: 'Сердцебиение' },
                    { symptomId: S['Syncope'], locale: Locale.ru, term: 'Обморок' },
                    { symptomId: S['Claudication'], locale: Locale.ru, term: 'Хромота' },
                    { symptomId: S['Leg swelling'], locale: Locale.ru, term: 'Отек ног' },
                    { symptomId: S['Pleuritic chest pain'], locale: Locale.ru, term: 'Плевритная боль в груди' },
                    { symptomId: S['Unilateral weakness'], locale: Locale.ru, term: 'Односторонняя слабость' },
                    { symptomId: S['Aphasia'], locale: Locale.ru, term: 'Афазия' },
                ],
            });

            // Russian translations for risk factors
            await this.prisma.riskFactorTranslation.createMany({
                skipDuplicates: true,
                data: [
                    { riskFactorId: R['HTN'], locale: Locale.ru, name: 'Артериальная гипертензия', definition: 'АД ≥ 140/90 мм рт. ст. (в зависимости от контекста).' },
                    { riskFactorId: R['LDL_HIGH'], locale: Locale.ru, name: 'Высокий ЛПНП', definition: 'ЛПНП выше порогового значения по рекомендациям.' },
                    { riskFactorId: R['SMOKING'], locale: Locale.ru, name: 'Курение', definition: 'Активное употребление табака.' },
                    { riskFactorId: R['DM'], locale: Locale.ru, name: 'Сахарный диабет', definition: 'Сахарный диабет 1/2 типа.' },
                    { riskFactorId: R['OBESITY'], locale: Locale.ru, name: 'Ожирение', definition: 'ИМТ ≥ 30 кг/м².' },
                    { riskFactorId: R['AF_RF'], locale: Locale.ru, name: 'Фибрилляция предсердий (как риск)', definition: 'ФП как фактор риска инсульта/эмболии.' },
                    { riskFactorId: R['CKD'], locale: Locale.ru, name: 'Хроническая болезнь почек', definition: 'СКФ < 60 мл/мин/1,73 м² или маркеры повреждения.' },
                    { riskFactorId: R['FH_CVD'], locale: Locale.ru, name: 'Семейный анамнез ССЗ', definition: 'Преждевременное ССЗ у родственника первой линии.' },
                    { riskFactorId: R['SEDENTARY'], locale: Locale.ru, name: 'Сидячий образ жизни', definition: 'Низкая физическая активность.' },
                    { riskFactorId: R['HYPERTRIG'], locale: Locale.ru, name: 'Гипертриглицеридемия', definition: 'ТГ выше порогового значения по рекомендациям.' },
                ],
            });

            logger.log(msg.SEEDING_COMPLETED);
        } catch (err) {
            logger.error(`${msg.SEEDING_FAILED} ${err}`);
            throw err;
        }
    }
}