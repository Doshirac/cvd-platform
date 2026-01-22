import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DiseaseCard } from '../DiseaseCard';
import type { Disease } from '@shared/api/diseases/diseases.types';

// Create a mock store for Storybook
const mockStore = configureStore({
  reducer: {
    diseases: () => ({
      items: [],
      symptomList: [
        { code: 'CP', term: 'Chest Pain', category: 'Cardiac' },
        { code: 'SOB', term: 'Shortness of Breath', category: 'Respiratory' },
        { code: 'FTG', term: 'Fatigue', category: 'General' },
        { code: 'HP', term: 'Heart Palpitations', category: 'Cardiac' },
        { code: 'DZ', term: 'Dizziness', category: 'Neurological' },
        { code: 'NS', term: 'Nausea', category: 'Gastrointestinal' },
        { code: 'SW', term: 'Swelling', category: 'General' },
      ],
      riskFactors: [
        { code: 'HC', name: 'High Cholesterol', definition: 'Elevated cholesterol levels' },
        { code: 'HTN', name: 'Hypertension', definition: 'High blood pressure' },
        { code: 'DM', name: 'Diabetes', definition: 'Diabetes mellitus' },
        { code: 'SMK', name: 'Smoking', definition: 'Tobacco use' },
        { code: 'OBS', name: 'Obesity', definition: 'Excess body weight' },
        { code: 'HD', name: 'Heart Disease', definition: 'Pre-existing heart condition' },
        { code: 'AGE', name: 'Age', definition: 'Advanced age' },
        { code: 'IHD', name: 'Ischemic Heart Disease', definition: 'Reduced blood flow to heart' },
      ],
      loading: false,
      error: null,
    }),
  },
});

const mockDisease: Disease = {
  id: 1,
  code: 'IHD',
  name: 'Ischemic Heart Disease',
  description: 'Ischemic heart disease is a condition where blood flow to the heart muscle is reduced, usually due to coronary artery disease (atherosclerosis). This can lead to angina, heart attacks, and heart failure.',
  prevention: 'Regular exercise, maintaining a healthy diet, avoiding smoking, controlling blood pressure and cholesterol levels, managing diabetes, and reducing stress can help prevent ischemic heart disease.',
  symptoms: ['CP', 'SOB', 'FTG', 'HP'],
  risks: ['HC', 'HTN', 'DM', 'SMK', 'OBS'],
};

const meta: Meta<typeof DiseaseCard> = {
  title: 'Shared/DiseaseCard',
  component: DiseaseCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
**DiseaseCard** displays comprehensive information about a cardiovascular disease.

Features:
- Disease icon with gradient background
- Hover effect with enhanced gradient
- Shows disease ID badge
- Displays primary symptoms with tooltips
- Shows risk factors with tooltips
- Responsive design with optimized mobile layout
- Supports both light and dark themes
- Can be wrapped with Link component for navigation
        `,
      },
    },
  },
  argTypes: {
    disease: {
      description: 'The disease object to display',
      table: { category: 'data' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: { category: 'appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DiseaseCard>;

export const Default: Story = {
  args: {
    disease: mockDisease,
  },
};

export const InGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', maxWidth: '1200px' }}>
      <DiseaseCard disease={mockDisease} />
      <DiseaseCard disease={{
        id: 2,
        code: 'AF',
        name: 'Atrial Fibrillation',
        description: 'An irregular and often rapid heart rate that can increase risk of stroke, heart failure and other heart-related complications.',
        prevention: 'Manage blood pressure, avoid excessive alcohol, maintain healthy weight, stay physically active.',
        symptoms: ['HP', 'DZ', 'SOB'],
        risks: ['HTN', 'HD', 'AGE'],
      }} />
      <DiseaseCard disease={{
        id: 3,
        code: 'CHF',
        name: 'Congestive Heart Failure',
        description: "A chronic condition where the heart doesn't pump blood as well as it should.",
        prevention: 'Control risk factors, take prescribed medications, monitor fluid intake.',
        symptoms: ['SOB', 'FTG', 'CP', 'SW'],
        risks: ['HTN', 'IHD', 'DM', 'OBS'],
      }} />
    </div>
  ),
};

export const WithManySymptoms: Story = {
  args: {
    disease: {
      ...mockDisease,
      symptoms: ['CP', 'SOB', 'FTG', 'HP', 'DZ', 'NS', 'SW'],
    },
  },
};

export const WithLongName: Story = {
  args: {
    disease: {
      ...mockDisease,
      name: 'Chronic Thromboembolic Pulmonary Hypertension with Multiple Comorbidities',
    },
  },
};

export const MinimalData: Story = {
  args: {
    disease: {
      id: 10,
      code: 'MINCARD',
      name: 'Minimal Cardiomyopathy',
      description: 'A disease with minimal symptoms and risk factors.',
      prevention: 'Regular checkups.',
      symptoms: ['CP'],
      risks: ['AGE'],
    },
  },
};
