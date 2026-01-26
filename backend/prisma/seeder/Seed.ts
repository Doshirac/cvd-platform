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
                    { 
                        code: 'AAA', 
                        name: 'Abdominal Aortic Aneurysm', 
                        description: 'Pathological dilation of the abdominal aorta (>3 cm diameter).', 
                        prevention: 'Smoking cessation is paramount. Blood pressure control. Screening ultrasound for men 65-75 with smoking history. Surveillance for small aneurysms. Lipid management. Avoid heavy lifting if known aneurysm.' 
                    },
                    { 
                        code: 'TAD', 
                        name: 'Thoracic Aortic Dissection', 
                        description: 'Tear in aortic intima with blood entering the media.', 
                        prevention: 'Strict blood pressure control (<130/80 mmHg). Avoid isometric exercises. Beta-blockers for Marfan syndrome. Regular aortic imaging surveillance. Genetic screening for connective tissue disorders.' 
                    },
                    { 
                        code: 'RHD', 
                        name: 'Rheumatic Heart Disease', 
                        description: 'Valvular damage following acute rheumatic fever from streptococcal infection.', 
                        prevention: 'Primary prevention: Prompt treatment of streptococcal pharyngitis with penicillin. Secondary prevention: Long-term penicillin prophylaxis. Echocardiographic surveillance. Dental hygiene for IE prevention.' 
                    },
                    { 
                        code: 'CHD', 
                        name: 'Congenital Heart Disease', 
                        description: 'Structural heart abnormalities present at birth (ASD, VSD, ToF, etc.).', 
                        prevention: 'Maternal health: Folic acid supplementation, rubella vaccination, avoid teratogens (alcohol, certain medications). Genetic counseling. Regular prenatal ultrasound screening.' 
                    },
                    { 
                        code: 'CAR_ARR', 
                        name: 'Cardiac Arrest/Arrhythmia', 
                        description: 'Sudden cessation of cardiac function due to lethal arrhythmia (VF/VT).', 
                        prevention: 'ICD implantation for high-risk patients. Treatment of underlying heart disease. Avoidance of QT-prolonging drugs. Electrolyte balance. CPR training for family members.' 
                    },
                    { 
                        code: 'CARD_TAM', 
                        name: 'Cardiac Tamponade', 
                        description: 'Pericardial fluid accumulation compressing the heart.', 
                        prevention: 'Early treatment of pericarditis. Monitoring during anticoagulation. Surgical drainage when indicated. Treatment of underlying malignancy or infection.' 
                    },
                    { 
                        code: 'CMP_RES', 
                        name: 'Restrictive Cardiomyopathy', 
                        description: 'Impaired ventricular filling due to stiff myocardium (amyloidosis, sarcoidosis).', 
                        prevention: 'Treatment of underlying cause (amyloidosis, hemochromatosis). Iron chelation therapy. Avoid nephrotoxic agents in amyloidosis. Regular cardiac surveillance.' 
                    },
                    { 
                        code: 'ARVC', 
                        name: 'Arrhythmogenic Right Ventricular Cardiomyopathy', 
                        description: 'Fibro-fatty replacement of RV myocardium causing arrhythmias.', 
                        prevention: 'Genetic screening and family evaluation. Restriction from competitive sports. ICD for high-risk patients. Beta-blocker therapy. Avoid strenuous exercise.' 
                    },
                    { 
                        code: 'PH', 
                        name: 'Pulmonary Hypertension', 
                        description: 'Elevated pulmonary arterial pressure (mPAP ≥20 mmHg at rest).', 
                        prevention: 'Treatment of underlying cause (COPD, left heart disease, PE). Avoid hypoxia (high altitude). Supervised exercise rehabilitation. Early initiation of targeted therapy.' 
                    },
                    { 
                        code: 'COR_PUL', 
                        name: 'Cor Pulmonale', 
                        description: 'Right heart failure secondary to pulmonary disease.', 
                        prevention: 'Optimal treatment of underlying lung disease. Smoking cessation. Oxygen therapy for hypoxia. Treatment of sleep apnea. Pulmonary rehabilitation.' 
                    },
                    { 
                        code: 'ANGINA', 
                        name: 'Stable Angina Pectoris', 
                        description: 'Predictable chest discomfort with exertion due to coronary stenosis.', 
                        prevention: 'Same as IHD prevention. Anti-anginal medications (nitrates, beta-blockers). Risk factor modification. Stress testing and coronary evaluation.' 
                    },
                    { 
                        code: 'UA_NSTEMI', 
                        name: 'Unstable Angina/NSTEMI', 
                        description: 'Acute coronary syndrome without ST elevation.', 
                        prevention: 'Aggressive atherosclerosis prevention. Dual antiplatelet therapy. Early invasive strategy for high-risk patients. Cardiac rehabilitation.' 
                    },
                    { 
                        code: 'SICK_SIN', 
                        name: 'Sick Sinus Syndrome', 
                        description: 'Sinus node dysfunction causing bradycardia and pauses.', 
                        prevention: 'Avoidance of drugs that slow heart rate when not needed. Pacemaker implantation for symptomatic patients. Regular ECG monitoring in elderly.' 
                    },
                    { 
                        code: 'AV_BLOCK', 
                        name: 'Atrioventricular Block', 
                        description: 'Impaired conduction between atria and ventricles.', 
                        prevention: 'Avoidance of AV node blocking drugs in predisposed patients. Lyme disease prevention. Prompt treatment of myocarditis. Pacemaker for high-grade block.' 
                    },
                    { 
                        code: 'WPW', 
                        name: 'Wolff-Parkinson-White Syndrome', 
                        description: 'Accessory pathway causing pre-excitation and tachyarrhythmias.', 
                        prevention: 'Catheter ablation of accessory pathway. Avoidance of AV nodal blocking agents in AF with WPW. Risk stratification with EP study.' 
                    },
                    { 
                        code: 'VTACH', 
                        name: 'Ventricular Tachycardia', 
                        description: 'Rapid ventricular rhythm (≥100 bpm) from ventricular focus.', 
                        prevention: 'ICD implantation for secondary prevention. Beta-blockers. Treatment of underlying structural heart disease. Catheter ablation. Electrolyte correction.' 
                    },
                    { 
                        code: 'AORTIC_S', 
                        name: 'Aortic Stenosis', 
                        description: 'Narrowing of aortic valve causing outflow obstruction.', 
                        prevention: 'Treatment of rheumatic fever. Blood pressure control. Lipid management (controversial). Regular echocardiographic surveillance. Timely valve replacement.' 
                    },
                    { 
                        code: 'MITRAL_R', 
                        name: 'Mitral Regurgitation', 
                        description: 'Incompetent mitral valve with systolic backflow into LA.', 
                        prevention: 'Prevention of IE. Treatment of ischemic heart disease. BP control. Early intervention for severe symptomatic MR. Regular echocardiography.' 
                    },
                    { 
                        code: 'CARD_SHK', 
                        name: 'Cardiogenic Shock', 
                        description: 'Profound cardiac pump failure with tissue hypoperfusion.', 
                        prevention: 'Early reperfusion in AMI. Hemodynamic monitoring in high-risk patients. Avoid nephrotoxins. Early mechanical support consideration.' 
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
                    { code: "BACK_PAIN", term: "Back pain", category: "symptom" },
                    { code: "ABD_PAIN", term: "Abdominal pain", category: "symptom" },
                    { code: "PULSE_AB", term: "Pulsatile abdominal mass", category: "sign" },
                    { code: "HYPOTEN", term: "Hypotension", category: "sign" },
                    { code: "TACHY", term: "Tachycardia", category: "sign" },
                    { code: "BRADY", term: "Bradycardia", category: "sign" },
                    { code: "PERIPH_ED", term: "Peripheral edema", category: "sign" },
                    { code: "ASCITES", term: "Ascites", category: "sign" },
                    { code: "CONFUSION", term: "Confusion", category: "symptom" },
                    { code: "COLD_EXT", term: "Cold extremities", category: "sign" },
                    { code: "OLIGURIA", term: "Oliguria", category: "sign" },
                    { code: "WHEEZE", term: "Wheezing", category: "symptom" },
                    { code: "NIGHT_SW", term: "Night sweats", category: "symptom" },
                    { code: "JOINT_P", term: "Joint pain", category: "symptom" },
                    { code: "SKIN_RASH", term: "Skin rash", category: "sign" },
                    { code: "SPLENO", term: "Splenomegaly", category: "sign" },
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
                    { 
                        code: 'AGE', 
                        name: 'Advanced age', 
                        definition: 'Age > 65 years as cardiovascular risk factor.' 
                    },
                    { 
                        code: 'MALE', 
                        name: 'Male sex', 
                        definition: 'Male sex as cardiovascular risk factor.' 
                    },
                    { 
                        code: 'GENETIC', 
                        name: 'Genetic predisposition', 
                        definition: 'Inherited genetic variants affecting cardiovascular risk.' 
                    },
                    { 
                        code: 'IMMOBIL', 
                        name: 'Immobility', 
                        definition: 'Prolonged bed rest, surgery, or long travel.' 
                    },
                    { 
                        code: 'COAG_DIS', 
                        name: 'Coagulation disorders', 
                        definition: 'Inherited or acquired hypercoagulable states.' 
                    },
                    { 
                        code: 'MALIG', 
                        name: 'Malignancy', 
                        definition: 'Active cancer as prothrombotic risk factor.' 
                    },
                    { 
                        code: 'PROSTH_V', 
                        name: 'Prosthetic valve', 
                        definition: 'Mechanical or bioprosthetic heart valve.' 
                    },
                    { 
                        code: 'IV_DRUG', 
                        name: 'IV drug use', 
                        definition: 'Intravenous drug abuse as IE risk factor.' 
                    },
                    { 
                        code: 'CONN_TIS', 
                        name: 'Connective tissue disease', 
                        definition: 'Marfan, Ehlers-Danlos and similar syndromes.' 
                    },
                    { 
                        code: 'SLEEP_AP', 
                        name: 'Sleep apnea', 
                        definition: 'Obstructive or central sleep apnea syndrome.' 
                    },
                    { 
                        code: 'COPD', 
                        name: 'COPD', 
                        definition: 'Chronic obstructive pulmonary disease.' 
                    },
                    { 
                        code: 'THYROID', 
                        name: 'Thyroid disorder', 
                        definition: 'Hyperthyroidism or hypothyroidism.' 
                    },
                    { 
                        code: 'PREV_CVD', 
                        name: 'Previous CVD event', 
                        definition: 'History of MI, stroke, or other CVD event.' 
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

                // AAA - Abdominal Aortic Aneurysm
                { diseaseId: D['AAA'], symptomId: S['Abdominal pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AAA'], symptomId: S['Pulsatile abdominal mass'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AAA'], symptomId: S['Back pain'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['AAA'], symptomId: S['Hypotension'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // TAD - Thoracic Aortic Dissection
                { diseaseId: D['TAD'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['TAD'], symptomId: S['Back pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['TAD'], symptomId: S['Hypotension'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['TAD'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // RHD - Rheumatic Heart Disease
                { diseaseId: D['RHD'], symptomId: S['New murmur'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['RHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['RHD'], symptomId: S['Joint pain'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['RHD'], symptomId: S['Fever'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // CHD - Congenital Heart Disease
                { diseaseId: D['CHD'], symptomId: S['Cyanosis'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CHD'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CHD'], symptomId: S['New murmur'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['CHD'], symptomId: S['Reduced exercise tolerance'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // CAR_ARR - Cardiac Arrest/Arrhythmia
                { diseaseId: D['CAR_ARR'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CAR_ARR'], symptomId: S['Palpitations'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CAR_ARR'], symptomId: S['Chest pain'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['CAR_ARR'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // CARD_TAM - Cardiac Tamponade
                { diseaseId: D['CARD_TAM'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CARD_TAM'], symptomId: S['Hypotension'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CARD_TAM'], symptomId: S['Jugular venous distension'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CARD_TAM'], symptomId: S['Tachycardia'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // CMP_RES - Restrictive Cardiomyopathy
                { diseaseId: D['CMP_RES'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CMP_RES'], symptomId: S['Fatigue'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CMP_RES'], symptomId: S['Peripheral edema'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['CMP_RES'], symptomId: S['Ascites'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // ARVC - Arrhythmogenic RV Cardiomyopathy
                { diseaseId: D['ARVC'], symptomId: S['Palpitations'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ARVC'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ARVC'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['ARVC'], symptomId: S['Chest pain'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // PH - Pulmonary Hypertension
                { diseaseId: D['PH'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PH'], symptomId: S['Fatigue'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['PH'], symptomId: S['Peripheral edema'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['PH'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // COR_PUL - Cor Pulmonale
                { diseaseId: D['COR_PUL'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['COR_PUL'], symptomId: S['Peripheral edema'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['COR_PUL'], symptomId: S['Cyanosis'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['COR_PUL'], symptomId: S['Wheezing'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // ANGINA - Stable Angina Pectoris
                { diseaseId: D['ANGINA'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ANGINA'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['ANGINA'], symptomId: S['Reduced exercise tolerance'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['ANGINA'], symptomId: S['Diaphoresis'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // UA_NSTEMI - Unstable Angina/NSTEMI
                { diseaseId: D['UA_NSTEMI'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['UA_NSTEMI'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['UA_NSTEMI'], symptomId: S['Diaphoresis'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['UA_NSTEMI'], symptomId: S['Nausea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // SICK_SIN - Sick Sinus Syndrome
                { diseaseId: D['SICK_SIN'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['SICK_SIN'], symptomId: S['Dizziness'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['SICK_SIN'], symptomId: S['Bradycardia'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['SICK_SIN'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // AV_BLOCK - Atrioventricular Block
                { diseaseId: D['AV_BLOCK'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AV_BLOCK'], symptomId: S['Bradycardia'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AV_BLOCK'], symptomId: S['Dizziness'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['AV_BLOCK'], symptomId: S['Fatigue'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // WPW - Wolff-Parkinson-White Syndrome
                { diseaseId: D['WPW'], symptomId: S['Palpitations'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['WPW'], symptomId: S['Dizziness'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['WPW'], symptomId: S['Syncope'], priority: SymptomPriority.secondary, typicality: Typicality.possible },
                { diseaseId: D['WPW'], symptomId: S['Chest tightness'], priority: SymptomPriority.secondary, typicality: Typicality.possible },

                // VTACH - Ventricular Tachycardia
                { diseaseId: D['VTACH'], symptomId: S['Palpitations'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['VTACH'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['VTACH'], symptomId: S['Hypotension'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['VTACH'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // AORTIC_S - Aortic Stenosis
                { diseaseId: D['AORTIC_S'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AORTIC_S'], symptomId: S['Syncope'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AORTIC_S'], symptomId: S['Chest pain'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['AORTIC_S'], symptomId: S['New murmur'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // MITRAL_R - Mitral Regurgitation
                { diseaseId: D['MITRAL_R'], symptomId: S['Dyspnea'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['MITRAL_R'], symptomId: S['Fatigue'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['MITRAL_R'], symptomId: S['New murmur'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['MITRAL_R'], symptomId: S['Palpitations'], priority: SymptomPriority.secondary, typicality: Typicality.typical },

                // CARD_SHK - Cardiogenic Shock
                { diseaseId: D['CARD_SHK'], symptomId: S['Hypotension'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CARD_SHK'], symptomId: S['Cold extremities'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CARD_SHK'], symptomId: S['Confusion'], priority: SymptomPriority.primary, typicality: Typicality.typical },
                { diseaseId: D['CARD_SHK'], symptomId: S['Oliguria'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
                { diseaseId: D['CARD_SHK'], symptomId: S['Dyspnea'], priority: SymptomPriority.secondary, typicality: Typicality.typical },
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

                // New diseases risk factors
                // AAA - Abdominal Aortic Aneurysm
                { diseaseId: D['AAA'], riskFactorId: R['SMOKING'], direction: RiskDirection.risk },
                { diseaseId: D['AAA'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['AAA'], riskFactorId: R['AGE'], direction: RiskDirection.risk },
                { diseaseId: D['AAA'], riskFactorId: R['MALE'], direction: RiskDirection.risk },

                // TAD - Thoracic Aortic Dissection
                { diseaseId: D['TAD'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['TAD'], riskFactorId: R['CONN_TIS'], direction: RiskDirection.risk },

                // RHD - Rheumatic Heart Disease
                { diseaseId: D['RHD'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },
                { diseaseId: D['RHD'], riskFactorId: R['AGE'], direction: RiskDirection.risk },

                // CHD - Congenital Heart Disease
                { diseaseId: D['CHD'], riskFactorId: R['GENETIC'], direction: RiskDirection.risk },
                { diseaseId: D['CHD'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },

                // CAR_ARR - Cardiac Arrest/Arrhythmia
                { diseaseId: D['CAR_ARR'], riskFactorId: R['PREV_CVD'], direction: RiskDirection.risk },
                { diseaseId: D['CAR_ARR'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },

                // CARD_TAM - Cardiac Tamponade
                { diseaseId: D['CARD_TAM'], riskFactorId: R['MALIG'], direction: RiskDirection.risk },
                { diseaseId: D['CARD_TAM'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },

                // CMP_RES - Restrictive Cardiomyopathy
                { diseaseId: D['CMP_RES'], riskFactorId: R['GENETIC'], direction: RiskDirection.risk },
                { diseaseId: D['CMP_RES'], riskFactorId: R['MALIG'], direction: RiskDirection.risk },

                // ARVC - Arrhythmogenic RV Cardiomyopathy
                { diseaseId: D['ARVC'], riskFactorId: R['GENETIC'], direction: RiskDirection.risk },
                { diseaseId: D['ARVC'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },

                // PH - Pulmonary Hypertension
                { diseaseId: D['PH'], riskFactorId: R['COPD'], direction: RiskDirection.risk },
                { diseaseId: D['PH'], riskFactorId: R['CONN_TIS'], direction: RiskDirection.risk },

                // COR_PUL - Cor Pulmonale
                { diseaseId: D['COR_PUL'], riskFactorId: R['COPD'], direction: RiskDirection.risk },
                { diseaseId: D['COR_PUL'], riskFactorId: R['SMOKING'], direction: RiskDirection.risk },

                // ANGINA - Stable Angina Pectoris
                { diseaseId: D['ANGINA'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['ANGINA'], riskFactorId: R['LDL_HIGH'], direction: RiskDirection.risk },
                { diseaseId: D['ANGINA'], riskFactorId: R['SMOKING'], direction: RiskDirection.risk },

                // UA_NSTEMI - Unstable Angina/NSTEMI
                { diseaseId: D['UA_NSTEMI'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['UA_NSTEMI'], riskFactorId: R['LDL_HIGH'], direction: RiskDirection.risk },
                { diseaseId: D['UA_NSTEMI'], riskFactorId: R['PREV_CVD'], direction: RiskDirection.risk },

                // SICK_SIN - Sick Sinus Syndrome
                { diseaseId: D['SICK_SIN'], riskFactorId: R['AGE'], direction: RiskDirection.risk },
                { diseaseId: D['SICK_SIN'], riskFactorId: R['PREV_CVD'], direction: RiskDirection.risk },

                // AV_BLOCK - Atrioventricular Block
                { diseaseId: D['AV_BLOCK'], riskFactorId: R['AGE'], direction: RiskDirection.risk },
                { diseaseId: D['AV_BLOCK'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },

                // WPW - Wolff-Parkinson-White Syndrome
                { diseaseId: D['WPW'], riskFactorId: R['GENETIC'], direction: RiskDirection.risk },
                { diseaseId: D['WPW'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },

                // VTACH - Ventricular Tachycardia
                { diseaseId: D['VTACH'], riskFactorId: R['PREV_CVD'], direction: RiskDirection.risk },
                { diseaseId: D['VTACH'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },

                // AORTIC_S - Aortic Stenosis
                { diseaseId: D['AORTIC_S'], riskFactorId: R['AGE'], direction: RiskDirection.risk },
                { diseaseId: D['AORTIC_S'], riskFactorId: R['HTN'], direction: RiskDirection.risk },

                // MITRAL_R - Mitral Regurgitation
                { diseaseId: D['MITRAL_R'], riskFactorId: R['PREV_CVD'], direction: RiskDirection.risk },
                { diseaseId: D['MITRAL_R'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },

                // CARD_SHK - Cardiogenic Shock
                { diseaseId: D['CARD_SHK'], riskFactorId: R['PREV_CVD'], direction: RiskDirection.risk },
                { diseaseId: D['CARD_SHK'], riskFactorId: R['DM'], direction: RiskDirection.risk },

                // Additional for existing diseases
                { diseaseId: D['DVT'], riskFactorId: R['IMMOBIL'], direction: RiskDirection.risk },
                { diseaseId: D['DVT'], riskFactorId: R['COAG_DIS'], direction: RiskDirection.risk },
                { diseaseId: D['PE'], riskFactorId: R['IMMOBIL'], direction: RiskDirection.risk },
                { diseaseId: D['PE'], riskFactorId: R['COAG_DIS'], direction: RiskDirection.risk },
                { diseaseId: D['ENDO'], riskFactorId: R['IV_DRUG'], direction: RiskDirection.risk },
                { diseaseId: D['ENDO'], riskFactorId: R['PROSTH_V'], direction: RiskDirection.risk },
                { diseaseId: D['AF'], riskFactorId: R['HTN'], direction: RiskDirection.risk },
                { diseaseId: D['AF'], riskFactorId: R['THYROID'], direction: RiskDirection.risk },
                { diseaseId: D['AF'], riskFactorId: R['SLEEP_AP'], direction: RiskDirection.risk },
                { diseaseId: D['HCM'], riskFactorId: R['GENETIC'], direction: RiskDirection.risk },
                { diseaseId: D['HCM'], riskFactorId: R['FH_CVD'], direction: RiskDirection.risk },
                { diseaseId: D['DCM'], riskFactorId: R['GENETIC'], direction: RiskDirection.risk },
                { diseaseId: D['VHD'], riskFactorId: R['AGE'], direction: RiskDirection.risk },
                { diseaseId: D['VHD'], riskFactorId: R['INFECTION'], direction: RiskDirection.risk },
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
                    { diseaseId: D['MYO'], locale: Locale.ru, name: 'Миокардит', description: 'Воспаление миокарда (часто вирусное/иммунное).', prevention: 'Вакцинация, избегать нагрузок при вирусных инфекциях.' },
                    { diseaseId: D['PERI'], locale: Locale.ru, name: 'Перикардит', description: 'Воспаление перикарда с плевритной болью в груди.', prevention: 'Лечение инфекций и аутоиммунных заболеваний; колхицин.' },
                    { diseaseId: D['ENDO'], locale: Locale.ru, name: 'Инфекционный эндокардит', description: 'Инфекция эндокарда/клапанов микроорганизмами.', prevention: 'Гигиена полости рта; антибиотикопрофилактика у группы высокого риска.' },
                    { diseaseId: D['PE'], locale: Locale.ru, name: 'Тромбоэмболия лёгочной артерии', description: 'Тромбоэмболия лёгочной артерии.', prevention: 'Профилактика ВТЭ, ранняя мобилизация, компрессионные чулки.' },
                    { diseaseId: D['DVT'], locale: Locale.ru, name: 'Тромбоз глубоких вен', description: 'Тромб в глубоких венах (чаще ног).', prevention: 'Профилактика ВТЭ, избегать длительной неподвижности.' },
                    { diseaseId: D['AAA'], locale: Locale.ru, name: 'Аневризма брюшной аорты', description: 'Патологическое расширение брюшной аорты (>3 см).', prevention: 'Отказ от курения, контроль АД, скрининг УЗИ.' },
                    { diseaseId: D['TAD'], locale: Locale.ru, name: 'Расслоение грудной аорты', description: 'Разрыв интимы аорты с проникновением крови в медию.', prevention: 'Жёсткий контроль АД, бета-блокаторы при синдроме Марфана.' },
                    { diseaseId: D['RHD'], locale: Locale.ru, name: 'Ревматическая болезнь сердца', description: 'Поражение клапанов после острой ревматической лихорадки.', prevention: 'Своевременное лечение стрептококковой ангины пенициллином.' },
                    { diseaseId: D['CHD'], locale: Locale.ru, name: 'Врождённый порок сердца', description: 'Структурные аномалии сердца, присутствующие с рождения.', prevention: 'Фолиевая кислота, вакцинация от краснухи, избегание тератогенов.' },
                    { diseaseId: D['CAR_ARR'], locale: Locale.ru, name: 'Остановка сердца/Аритмия', description: 'Внезапное прекращение сердечной деятельности из-за летальной аритмии.', prevention: 'ИКД для группы высокого риска, лечение основного заболевания.' },
                    { diseaseId: D['CARD_TAM'], locale: Locale.ru, name: 'Тампонада сердца', description: 'Скопление жидкости в перикарде, сдавливающее сердце.', prevention: 'Раннее лечение перикардита, дренирование при показаниях.' },
                    { diseaseId: D['CMP_RES'], locale: Locale.ru, name: 'Рестриктивная кардиомиопатия', description: 'Нарушение наполнения желудочков из-за ригидного миокарда.', prevention: 'Лечение основной причины (амилоидоз, гемохроматоз).' },
                    { diseaseId: D['ARVC'], locale: Locale.ru, name: 'Аритмогенная кардиомиопатия ПЖ', description: 'Фиброзно-жировое замещение миокарда ПЖ с аритмиями.', prevention: 'Генетический скрининг, ограничение спорта, ИКД.' },
                    { diseaseId: D['PH'], locale: Locale.ru, name: 'Лёгочная гипертензия', description: 'Повышение давления в лёгочной артерии (срДЛА ≥20 мм рт. ст.).', prevention: 'Лечение основной причины, избегать гипоксии.' },
                    { diseaseId: D['COR_PUL'], locale: Locale.ru, name: 'Лёгочное сердце', description: 'Правожелудочковая недостаточность вследствие заболевания лёгких.', prevention: 'Лечение заболевания лёгких, кислородотерапия, отказ от курения.' },
                    { diseaseId: D['ANGINA'], locale: Locale.ru, name: 'Стабильная стенокардия', description: 'Предсказуемый дискомфорт в груди при нагрузке из-за коронарного стеноза.', prevention: 'Контроль факторов риска, антиангинальные препараты.' },
                    { diseaseId: D['UA_NSTEMI'], locale: Locale.ru, name: 'Нестабильная стенокардия/NSTEMI', description: 'Острый коронарный синдром без подъёма ST.', prevention: 'Профилактика атеросклероза, двойная антитромбоцитарная терапия.' },
                    { diseaseId: D['SICK_SIN'], locale: Locale.ru, name: 'Синдром слабости синусового узла', description: 'Дисфункция синусового узла с брадикардией и паузами.', prevention: 'Избегать препаратов, замедляющих ЧСС; кардиостимулятор.' },
                    { diseaseId: D['AV_BLOCK'], locale: Locale.ru, name: 'Атриовентрикулярная блокада', description: 'Нарушение проведения между предсердиями и желудочками.', prevention: 'Избегать АВ-блокирующих препаратов, профилактика болезни Лайма.' },
                    { diseaseId: D['WPW'], locale: Locale.ru, name: 'Синдром Вольфа-Паркинсона-Уайта', description: 'Дополнительный путь проведения с преэкзитацией и тахиаритмиями.', prevention: 'Катетерная абляция дополнительного пути.' },
                    { diseaseId: D['VTACH'], locale: Locale.ru, name: 'Желудочковая тахикардия', description: 'Быстрый желудочковый ритм (≥100 уд/мин) из желудочкового очага.', prevention: 'ИКД, бета-блокаторы, лечение структурной патологии сердца.' },
                    { diseaseId: D['AORTIC_S'], locale: Locale.ru, name: 'Аортальный стеноз', description: 'Сужение аортального клапана с обструкцией выходного тракта.', prevention: 'Лечение ревматизма, контроль АД, своевременная замена клапана.' },
                    { diseaseId: D['MITRAL_R'], locale: Locale.ru, name: 'Митральная регургитация', description: 'Недостаточность митрального клапана с систолическим потоком в ЛП.', prevention: 'Профилактика ИЭ, лечение ИБС, контроль АД.' },
                    { diseaseId: D['CARD_SHK'], locale: Locale.ru, name: 'Кардиогенный шок', description: 'Глубокая насосная недостаточность с тканевой гипоперфузией.', prevention: 'Ранняя реперфузия при ОИМ, мониторинг гемодинамики.' },
                ],
            });

            // Russian translations for symptoms
            await this.prisma.symptomTranslation.createMany({
                skipDuplicates: true,
                data: [
                    { symptomId: S['Chest pain'], locale: Locale.ru, term: 'Боль в груди' },
                    { symptomId: S['Dyspnea'], locale: Locale.ru, term: 'Одышка' },
                    { symptomId: S['Orthopnea'], locale: Locale.ru, term: 'Ортопноэ' },
                    { symptomId: S['Paroxysmal nocturnal dyspnea'], locale: Locale.ru, term: 'Пароксизмальная ночная одышка' },
                    { symptomId: S['Palpitations'], locale: Locale.ru, term: 'Сердцебиение' },
                    { symptomId: S['Syncope'], locale: Locale.ru, term: 'Обморок' },
                    { symptomId: S['Claudication'], locale: Locale.ru, term: 'Хромота' },
                    { symptomId: S['Leg swelling'], locale: Locale.ru, term: 'Отёк ног' },
                    { symptomId: S['Pleuritic chest pain'], locale: Locale.ru, term: 'Плевритная боль в груди' },
                    { symptomId: S['Unilateral weakness'], locale: Locale.ru, term: 'Односторонняя слабость' },
                    { symptomId: S['Aphasia'], locale: Locale.ru, term: 'Афазия' },
                    { symptomId: S['Fever'], locale: Locale.ru, term: 'Лихорадка' },
                    { symptomId: S['New murmur'], locale: Locale.ru, term: 'Новый шум' },
                    { symptomId: S['Pericardial rub'], locale: Locale.ru, term: 'Шум трения перикарда' },
                    { symptomId: S['Reduced exercise tolerance'], locale: Locale.ru, term: 'Снижение толерантности к нагрузке' },
                    { symptomId: S['Fatigue'], locale: Locale.ru, term: 'Утомляемость' },
                    { symptomId: S['Dizziness'], locale: Locale.ru, term: 'Головокружение' },
                    { symptomId: S['Nausea'], locale: Locale.ru, term: 'Тошнота' },
                    { symptomId: S['Diaphoresis'], locale: Locale.ru, term: 'Потливость' },
                    { symptomId: S['Cyanosis'], locale: Locale.ru, term: 'Цианоз' },
                    { symptomId: S['Jugular venous distension'], locale: Locale.ru, term: 'Набухание ярёмных вен' },
                    { symptomId: S['Pulmonary rales'], locale: Locale.ru, term: 'Лёгочные хрипы' },
                    { symptomId: S['Hepatomegaly'], locale: Locale.ru, term: 'Гепатомегалия' },
                    { symptomId: S['Cough'], locale: Locale.ru, term: 'Кашель' },
                    { symptomId: S['Hemoptysis'], locale: Locale.ru, term: 'Кровохарканье' },
                    { symptomId: S['Weight gain'], locale: Locale.ru, term: 'Прибавка в весе' },
                    { symptomId: S['Anorexia'], locale: Locale.ru, term: 'Анорексия' },
                    { symptomId: S['Chest tightness'], locale: Locale.ru, term: 'Сдавление в груди' },
                    { symptomId: S['Back pain'], locale: Locale.ru, term: 'Боль в спине' },
                    { symptomId: S['Abdominal pain'], locale: Locale.ru, term: 'Боль в животе' },
                    { symptomId: S['Pulsatile abdominal mass'], locale: Locale.ru, term: 'Пульсирующее образование в животе' },
                    { symptomId: S['Hypotension'], locale: Locale.ru, term: 'Гипотония' },
                    { symptomId: S['Tachycardia'], locale: Locale.ru, term: 'Тахикардия' },
                    { symptomId: S['Bradycardia'], locale: Locale.ru, term: 'Брадикардия' },
                    { symptomId: S['Peripheral edema'], locale: Locale.ru, term: 'Периферические отёки' },
                    { symptomId: S['Ascites'], locale: Locale.ru, term: 'Асцит' },
                    { symptomId: S['Confusion'], locale: Locale.ru, term: 'Спутанность сознания' },
                    { symptomId: S['Cold extremities'], locale: Locale.ru, term: 'Холодные конечности' },
                    { symptomId: S['Oliguria'], locale: Locale.ru, term: 'Олигурия' },
                    { symptomId: S['Wheezing'], locale: Locale.ru, term: 'Свистящее дыхание' },
                    { symptomId: S['Night sweats'], locale: Locale.ru, term: 'Ночная потливость' },
                    { symptomId: S['Joint pain'], locale: Locale.ru, term: 'Боль в суставах' },
                    { symptomId: S['Skin rash'], locale: Locale.ru, term: 'Кожная сыпь' },
                    { symptomId: S['Splenomegaly'], locale: Locale.ru, term: 'Спленомегалия' },
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
                    { riskFactorId: R['ALCOHOL'], locale: Locale.ru, name: 'Злоупотребление алкоголем', definition: 'Вредное употребление алкоголя.' },
                    { riskFactorId: R['INFECTION'], locale: Locale.ru, name: 'Инфекция', definition: 'Инфекционные триггеры (ИЭ/перикардит/миокардит).' },
                    { riskFactorId: R['AGE'], locale: Locale.ru, name: 'Пожилой возраст', definition: 'Возраст > 65 лет как фактор риска ССЗ.' },
                    { riskFactorId: R['MALE'], locale: Locale.ru, name: 'Мужской пол', definition: 'Мужской пол как фактор риска ССЗ.' },
                    { riskFactorId: R['GENETIC'], locale: Locale.ru, name: 'Генетическая предрасположенность', definition: 'Наследственные генетические варианты, влияющие на риск ССЗ.' },
                    { riskFactorId: R['IMMOBIL'], locale: Locale.ru, name: 'Иммобилизация', definition: 'Длительный постельный режим, операция или долгое путешествие.' },
                    { riskFactorId: R['COAG_DIS'], locale: Locale.ru, name: 'Нарушения свёртывания', definition: 'Наследственные или приобретённые гиперкоагуляционные состояния.' },
                    { riskFactorId: R['MALIG'], locale: Locale.ru, name: 'Злокачественное новообразование', definition: 'Активный рак как протромботический фактор риска.' },
                    { riskFactorId: R['PROSTH_V'], locale: Locale.ru, name: 'Протез клапана', definition: 'Механический или биопротез клапана сердца.' },
                    { riskFactorId: R['IV_DRUG'], locale: Locale.ru, name: 'Внутривенные наркотики', definition: 'Злоупотребление внутривенными наркотиками как фактор риска ИЭ.' },
                    { riskFactorId: R['CONN_TIS'], locale: Locale.ru, name: 'Заболевание соединительной ткани', definition: 'Синдромы Марфана, Элерса-Данлоса и подобные.' },
                    { riskFactorId: R['SLEEP_AP'], locale: Locale.ru, name: 'Апноэ сна', definition: 'Синдром обструктивного или центрального апноэ сна.' },
                    { riskFactorId: R['COPD'], locale: Locale.ru, name: 'ХОБЛ', definition: 'Хроническая обструктивная болезнь лёгких.' },
                    { riskFactorId: R['THYROID'], locale: Locale.ru, name: 'Заболевание щитовидной железы', definition: 'Гипертиреоз или гипотиреоз.' },
                    { riskFactorId: R['PREV_CVD'], locale: Locale.ru, name: 'Перенесённое ССЗ', definition: 'Инфаркт, инсульт или другое ССЗ в анамнезе.' },
                ],
            });

            logger.log(msg.SEEDING_COMPLETED);
        } catch (err) {
            logger.error(`${msg.SEEDING_FAILED} ${err}`);
            throw err;
        }
    }
}