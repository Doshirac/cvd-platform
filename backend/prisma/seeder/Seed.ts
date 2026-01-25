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
  code?: string;
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
                        prevention: 'Lifestyle modifications: Stop smoking completely, maintain healthy weight (BMI 18.5-24.9), regular aerobic exercise (150+ min/week moderate intensity). Medical management: Control blood pressure (<130/80 mmHg), optimize LDL cholesterol (<70 mg/dL for high risk), manage diabetes (HbA1c <7%). Diet: Mediterranean diet, limit saturated fats, increase fiber intake.' 
                    },
                    { 
                        code: 'AMI', 
                        name: 'Acute Myocardial Infarction', 
                        description: 'Acute coronary artery occlusion with myocardial necrosis.', 
                        prevention: 'Primary prevention: Aggressive cardiovascular risk factor control, aspirin for high-risk patients, statin therapy. Secondary prevention: Dual antiplatelet therapy (DAPT), beta-blockers, ACE inhibitors/ARBs, high-intensity statins. Cardiac rehabilitation program participation.' 
                    },
                    { 
                        code: 'HF', 
                        name: 'Heart Failure', 
                        description: 'Pump failure with inadequate cardiac output.', 
                        prevention: 'Early treatment of hypertension and coronary artery disease. Dietary sodium restriction (<2g/day). Maintain healthy weight. Limit alcohol intake. Regular monitoring of symptoms and weight. Vaccinations (influenza, pneumococcal). Avoid NSAIDs and certain diabetes medications (thiazolidinediones).' 
                    },
                    { 
                        code: 'AF', 
                        name: 'Atrial Fibrillation', 
                        description: 'Irregular supraventricular tachyarrhythmia.', 
                        prevention: 'Blood pressure control (<130/80 mmHg). Weight management and treatment of obesity. Limit alcohol consumption. Treat obstructive sleep apnea. Regular exercise. Manage thyroid disorders. Control diabetes.' 
                    },
                    { 
                        code: 'STROKE', 
                        name: 'Stroke (Ischaemic)', 
                        description: 'Cerebral ischaemia → focal neurological deficit.', 
                        prevention: 'Blood pressure control is paramount (<130/80 mmHg). Anticoagulation for atrial fibrillation (CHA2DS2-VASc guided). Statin therapy for vascular protection. Smoking cessation. Diabetes management. Carotid intervention for significant stenosis. Healthy diet and regular exercise.' 
                    },
                    { 
                        code: 'PAD', 
                        name: 'Peripheral Artery Disease', 
                        description: 'Atherosclerosis of peripheral arteries; claudication.', 
                        prevention: 'Smoking cessation is the most important intervention. Statin therapy regardless of cholesterol levels. Antiplatelet therapy (aspirin or clopidogrel). Supervised exercise therapy (walking programs). Blood pressure and diabetes control. Foot care education.' 
                    },
                    { 
                        code: 'HHD', 
                        name: 'Hypertensive Heart Disease', 
                        description: 'Cardiac changes from chronic hypertension.', 
                        prevention: 'Strict blood pressure control (<130/80 mmHg). Lifestyle modifications: DASH diet, sodium restriction, weight loss, regular exercise, limited alcohol. Medication adherence. Regular echocardiographic monitoring for LVH regression.' 
                    },
                    { 
                        code: 'HCM', 
                        name: 'Hypertrophic Cardiomyopathy', 
                        description: 'Genetic LV hypertrophy; possible LVOT obstruction.', 
                        prevention: 'Genetic counseling and family screening with ECG and echocardiography. SCD risk stratification using validated calculators. ICD implantation for high-risk patients. Avoid dehydration and intense competitive sports. Annual follow-up with HCM specialists.' 
                    },
                    { 
                        code: 'DCM', 
                        name: 'Dilated Cardiomyopathy', 
                        description: 'LV dilation with systolic dysfunction.', 
                        prevention: 'Avoid excessive alcohol consumption. Genetic testing and family screening when appropriate. Early treatment of underlying causes (viral myocarditis, thyroid disorders). Avoid cardiotoxic drugs. Guideline-directed medical therapy initiation.' 
                    },
                    { 
                        code: 'VHD', 
                        name: 'Valvular Heart Disease', 
                        description: 'Valve stenosis/regurgitation (AS, MR, etc.).', 
                        prevention: 'Prevention of rheumatic heart disease with prompt streptococcal pharyngitis treatment. Infective endocarditis prophylaxis in high-risk patients. Regular dental care. Monitoring of known mild valve disease. Blood pressure control to prevent further valve damage.' 
                    },
                    { 
                        code: 'MYO', 
                        name: 'Myocarditis', 
                        description: 'Inflammation of myocardium (often viral/immune).', 
                        prevention: 'Vaccination against preventable viral infections (influenza, COVID-19). Avoid intense physical activity during viral illnesses. Prompt treatment of infections. Avoid known cardiotoxic substances. Rest during acute illness phase.' 
                    },
                    { 
                        code: 'PERI', 
                        name: 'Pericarditis', 
                        description: 'Inflammation of pericardium with pleuritic chest pain.', 
                        prevention: 'Treatment of underlying infections and autoimmune conditions. Avoid strenuous exercise during acute phase and for 3 months after. Complete course of anti-inflammatory treatment. Colchicine for recurrence prevention.' 
                    },
                    { 
                        code: 'ENDO', 
                        name: 'Infective Endocarditis', 
                        description: 'Endocardial/valvular infection by microorganisms.', 
                        prevention: 'Excellent dental hygiene with regular dental visits. Antibiotic prophylaxis before dental procedures in highest-risk patients only (prosthetic valves, previous IE, certain congenital heart disease). Avoid IV drug use. Prompt treatment of skin infections.' 
                    },
                    { 
                        code: 'PE', 
                        name: 'Pulmonary Embolism', 
                        description: 'Pulmonary artery thromboembolism.', 
                        prevention: 'VTE prophylaxis in hospitalized patients (pharmacological and/or mechanical). Early mobilization after surgery. Compression stockings for long travel. Anticoagulation for high-risk patients. Weight management. Smoking cessation.' 
                    },
                    { 
                        code: 'DVT', 
                        name: 'Deep Vein Thrombosis', 
                        description: 'Thrombus in deep veins (often legs).', 
                        prevention: 'VTE prophylaxis during hospitalization and after surgery. Avoid prolonged immobility. Adequate hydration. Compression stockings for long flights. Early ambulation. Consider anticoagulation for high-risk patients.' 
                    },
                ],
            });

            await this.prisma.symptom.createMany({
                skipDuplicates: true,
                data: [
                    { code: "CP", term: "Chest pain", category: "symptom" },
                    { code: "SOB", term: "Dyspnea", category: "symptom" },
                    { code: "ORTHO", term: "Orthopnea", category: "symptom" },
                    { code: "PND", term: "Paroxysmal nocturnal dyspnea", category: "symptom" },
                    { code: "PALP", term: "Palpitations", category: "symptom" },
                    { code: "SYNC", term: "Syncope", category: "symptom" },
                    { code: "CLAUD", term: "Claudication", category: "symptom" },
                    { code: "LEG_SWELL", term: "Leg swelling", category: "sign" },
                    { code: "PL_CP", term: "Pleuritic chest pain", category: "symptom" },
                    { code: "UNI_WEAK", term: "Unilateral weakness", category: "sign" },
                    { code: "APH", term: "Aphasia", category: "sign" },
                    { code: "FEVER", term: "Fever", category: "sign" },
                    { code: "MURMUR", term: "New murmur", category: "sign" },
                    { code: "PERI_RUB", term: "Pericardial rub", category: "sign" },
                    { code: "LOW_EX", term: "Reduced exercise tolerance", category: "symptom" },
                    { code: "FATIGUE", term: "Fatigue", category: "symptom" },
                    { code: "DIZZY", term: "Dizziness", category: "symptom" },
                    { code: "NAUSEA", term: "Nausea", category: "symptom" },
                    { code: "DIAPHOR", term: "Diaphoresis", category: "sign" },
                    { code: "CYANOSIS", term: "Cyanosis", category: "sign" },
                    { code: "JVD", term: "Jugular venous distension", category: "sign" },
                    { code: "RALES", term: "Pulmonary rales", category: "sign" },
                    { code: "HEPATO", term: "Hepatomegaly", category: "sign" },
                    { code: "COUGH", term: "Cough", category: "symptom" },
                    { code: "HEMOPT", term: "Hemoptysis", category: "symptom" },
                    { code: "WEIGHT_G", term: "Weight gain", category: "sign" },
                    { code: "ANOREX", term: "Anorexia", category: "symptom" },
                    { code: "CHEST_TI", term: "Chest tightness", category: "symptom" },
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
                        name: 'Eurostat - Cardiovascular Disease Statistics', 
                        description: 'Comprehensive statistics on cardiovascular diseases across European Union member states...',
                        organization: 'European Commission',
                        link: 'https://ec.europa.eu/eurostat/' 
                    },
                    { 
                        name: 'CDC WONDER Database', 
                        description: 'Wide-ranging Online Data for Epidemiologic Research covering mortality, natality, and disease data...',
                        organization: 'Centers for Disease Control and Prevention',
                        link: 'https://wonder.cdc.gov/' 
                    },
                    { 
                        name: 'WHO Global Health Observatory', 
                        description: 'Global health statistics and data visualizations for cardiovascular diseases worldwide...',
                        organization: 'World Health Organization',
                        link: 'https://www.who.int/data' 
                    },
                    { 
                        name: 'Heart Disease and Stroke Statistics', 
                        description: 'Annual update on heart disease and stroke statistics with latest data on prevalence...',
                        organization: 'American Heart Association',
                        link: 'https://www.heart.org/en/health-topics' 
                    },
                    { 
                        name: 'ESC Guidelines on Cardiovascular Disease Prevention', 
                        description: 'Comprehensive clinical practice guidelines for cardiovascular disease prevention in clinical...',
                        organization: 'European Society of Cardiology',
                        link: 'https://www.escardio.org/Guidelines' 
                    },
                    { 
                        name: 'PubMed Cardiovascular Research', 
                        description: 'Database of biomedical literature with extensive cardiovascular research publications...',
                        organization: 'National Center for Biotechnology Information',
                        link: 'https://pubmed.ncbi.nlm.nih.gov/' 
                    },
                    { 
                        name: 'Cardiovascular Clinical Trials Registry', 
                        description: 'Database of privately and publicly funded clinical studies related to cardiovascular conditions...',
                        organization: 'U.S. National Library of Medicine',
                        link: 'https://clinicaltrials.gov/' 
                    },
                    { 
                        name: 'Heart Health Information and Support', 
                        description: 'Patient education resources and latest research findings on heart and circulatory diseases...',
                        organization: 'British Heart Foundation',
                        link: 'https://www.bhf.org.uk/informationsupport' 
                    },
                    { 
                        name: 'Mayo Clinic Heart Disease Center', 
                        description: 'Expert medical information on symptoms, causes, diagnosis and treatment of heart conditions...',
                        organization: 'Mayo Clinic',
                        link: 'https://www.mayoclinic.org/diseases-conditions' 
                    },
                    { 
                        name: 'Cleveland Clinic Heart & Vascular Institute', 
                        description: 'Leading cardiovascular care information including conditions, treatments and prevention...',
                        organization: 'Cleveland Clinic',
                        link: 'https://my.clevelandclinic.org/health' 
                    },
                    { 
                        name: 'UpToDate Cardiovascular Medicine', 
                        description: 'Evidence-based clinical decision support resource for cardiovascular medicine...',
                        organization: 'Wolters Kluwer',
                        link: 'https://www.uptodate.com/' 
                    },
                    { 
                        name: 'Cochrane Heart Group', 
                        description: 'Systematic reviews of cardiovascular interventions and treatments based on clinical trials...',
                        organization: 'Cochrane Collaboration',
                        link: 'https://www.cochranelibrary.com/' 
                    },
                    { 
                        name: 'NHLBI Cardiovascular Research', 
                        description: 'Research and educational resources on heart, lung, blood diseases, and sleep disorders...',
                        organization: 'National Heart, Lung, and Blood Institute',
                        link: 'https://www.nhlbi.nih.gov/' 
                    },
                    { 
                        name: 'Heart Rhythm Disorders Resource Center', 
                        description: 'Educational resources on arrhythmias, electrophysiology, and device therapy...',
                        organization: 'Heart Rhythm Society',
                        link: 'https://www.hrsonline.org/' 
                    },
                    { 
                        name: 'Interventional Cardiology Guidelines', 
                        description: 'Clinical guidelines and resources for interventional cardiovascular procedures...',
                        organization: 'Society for Cardiovascular Angiography and Interventions',
                        link: 'https://scai.org/' 
                    },
                    { 
                        name: 'ACC Clinical Guidelines', 
                        description: 'Evidence-based clinical practice guidelines for cardiovascular care and prevention...',
                        organization: 'American College of Cardiology',
                        link: 'https://www.acc.org/' 
                    },
                    { 
                        name: 'Circulation - Cardiovascular Journal', 
                        description: 'Peer-reviewed journal publishing original research in cardiovascular medicine...',
                        organization: 'American Heart Association',
                        link: 'https://www.ahajournals.org/journal/circ' 
                    },
                    { 
                        name: 'JACC Family of Journals', 
                        description: 'Comprehensive cardiovascular journals covering clinical and translational research...',
                        organization: 'American College of Cardiology',
                        link: 'https://www.jacc.org/' 
                    },
                    { 
                        name: 'European Heart Journal', 
                        description: 'Flagship journal of ESC publishing cardiovascular research and clinical practice...',
                        organization: 'European Society of Cardiology',
                        link: 'https://academic.oup.com/eurheartj' 
                    },
                    { 
                        name: 'Heart Health Resources Australia', 
                        description: 'Research, prevention resources and patient support for cardiovascular health...',
                        organization: 'Heart Foundation Australia',
                        link: 'https://www.heartfoundation.org.au/' 
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
                // IHD - Ischaemic Heart Disease
                { diseaseId: D['IHD'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['IHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['IHD'], symptomId: S['Reduced exercise tolerance'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['IHD'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['IHD'], symptomId: S['Diaphoresis'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // AMI - Acute Myocardial Infarction
                { diseaseId: D['AMI'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AMI'], symptomId: S['Diaphoresis'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AMI'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AMI'], symptomId: S['Nausea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['AMI'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['AMI'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // HF - Heart Failure
                { diseaseId: D['HF'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Orthopnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Leg swelling'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Paroxysmal nocturnal dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Reduced exercise tolerance'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Jugular venous distension'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Pulmonary rales'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HF'], symptomId: S['Weight gain'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // AF - Atrial Fibrillation
                { diseaseId: D['AF'], symptomId: S['Palpitations'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AF'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AF'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['AF'], symptomId: S['Dizziness'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['AF'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['AF'], symptomId: S['Chest tightness'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // STROKE - Ischaemic Stroke
                { diseaseId: D['STROKE'], symptomId: S['Unilateral weakness'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['STROKE'], symptomId: S['Aphasia'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['STROKE'], symptomId: S['Dizziness'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['STROKE'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // PAD - Peripheral Artery Disease
                { diseaseId: D['PAD'], symptomId: S['Claudication'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PAD'], symptomId: S['Reduced exercise tolerance'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PAD'], symptomId: S['Leg swelling'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['PAD'], symptomId: S['Cyanosis'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // HHD - Hypertensive Heart Disease
                { diseaseId: D['HHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HHD'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.possible },
                { diseaseId: D['HHD'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HHD'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // HCM - Hypertrophic Cardiomyopathy
                { diseaseId: D['HCM'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HCM'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HCM'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['HCM'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['HCM'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // DCM - Dilated Cardiomyopathy
                { diseaseId: D['DCM'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['DCM'], symptomId: S['Fatigue'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['DCM'], symptomId: S['Leg swelling'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['DCM'], symptomId: S['Orthopnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['DCM'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // VHD - Valvular Heart Disease
                { diseaseId: D['VHD'], symptomId: S['New murmur'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['VHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['VHD'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['VHD'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['VHD'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // MYO - Myocarditis
                { diseaseId: D['MYO'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['MYO'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['MYO'], symptomId: S['Fever'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['MYO'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['MYO'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // PERI - Pericarditis
                { diseaseId: D['PERI'], symptomId: S['Pleuritic chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PERI'], symptomId: S['Pericardial rub'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PERI'], symptomId: S['Fever'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['PERI'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // ENDO - Infective Endocarditis
                { diseaseId: D['ENDO'], symptomId: S['Fever'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ENDO'], symptomId: S['New murmur'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ENDO'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['ENDO'], symptomId: S['Anorexia'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['ENDO'], symptomId: S['Weight gain'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // PE - Pulmonary Embolism
                { diseaseId: D['PE'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PE'], symptomId: S['Pleuritic chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PE'], symptomId: S['Hemoptysis'], priority: SymptomPriority.primary, typicality: Typicality.possible },
                { diseaseId: D['PE'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['PE'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['PE'], symptomId: S['Cyanosis'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // DVT - Deep Vein Thrombosis
                { diseaseId: D['DVT'], symptomId: S['Leg swelling'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['DVT'], symptomId: S['Cyanosis'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
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