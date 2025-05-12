import {
  ACCOUNT_STATUS_OPTIONS,
  ASSETS_UNDER_CUSTODY,
  COUNTRY_OPTIONS,
  GENDER_OPTIOPNS,
  INCOME_OPTION,
  KYC_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  SOURCE_OF_INCOME_OPTION,
} from '@/constants/form.constant';
import { FormFields, FormFieldsSection } from '@/types';
import { addressFormFields } from '../../constants/form-fields';

const userDetailsFormFields: FormFields[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your last name',
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: '@username',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    placeholder: '+353 123 456 789',
  },

  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    as: 'date',
    required: true,
    placeholder: 'DD/MM/YYYY',
  },
  {
    name: 'nationality',
    label: 'Nationality',
    as: 'comboBox',
    required: true,
    options: NATIONALITY_OPTIONS,
    placeholder: 'Select a nationality',
  },
  {
    name: 'placeOfBirth',
    label: 'Place of Birth',
    as: 'comboBox',
    required: true,
    placeholder: 'Select place of birth',
    options: COUNTRY_OPTIONS,
  },
  {
    name: 'residenceCountry',
    label: 'Residence Country',
    as: 'comboBox',
    required: true,
    placeholder: 'Select residence country',
    options: COUNTRY_OPTIONS,
  },
  {
    name: 'kycStatus',
    label: 'KYC Status',
    as: 'comboBox',
    required: true,
    options: KYC_STATUS_OPTIONS,
    editable: true,
  },
  {
    name: 'accountStatus',
    label: 'Account Status',
    as: 'comboBox',
    required: true,
    options: ACCOUNT_STATUS_OPTIONS,
    editable: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    as: 'radio',
    required: true,
    options: GENDER_OPTIOPNS,
  },
];

const financialDetailsFields: FormFields[] = [
  {
    name: 'sourceOfIncome',
    label: 'Source of income',
    as: 'comboBox',
    options: SOURCE_OF_INCOME_OPTION,
    required: true,
  },
  {
    name: 'annualIncome',
    label: 'Annual income?',
    as: 'comboBox',
    options: INCOME_OPTION,
    required: true,
  },
  {
    name: 'taxRegistrationNumber',
    label: 'Tax registration number',
    type: 'string',
    placeholder: 'XXXX-XXXX',
    required: true,
  },
  {
    name: 'taxRegistrationCountry',
    label: 'Country of tax registration',
    as: 'comboBox',
    options: COUNTRY_OPTIONS,
    required: true,
  },
  {
    name: 'valueOfAssetsUnderCustody',
    label: 'Value of assets under custody',
    as: 'comboBox',
    options: ASSETS_UNDER_CUSTODY,
    required: true,
  },
  {
    name: 'numberOfAssetsUnderCustody',
    label: 'Number of assets under custody',
    placeholder: '1',
    type: 'number',
    required: true,
  },
  {
    name: 'originOfFunds',
    label: 'Origin of funds',
    placeholder: 'Origin of funds',
    type: 'string',
    required: true,
  },
];

export const documentsFormFields: FormFields[] = [
  {
    name: 'proofOfAddress',
    label: 'Proof Of Address',
    as: 'file',
    showUploadedUrlPreview: true,
    required: true,
    placeholder: 'https://example.com/proof-of-address.png',
  },
  {
    name: 'proofOfIncome',
    label: 'Proof Of Income',
    as: 'file',
    showUploadedUrlPreview: true,
    required: true,
    placeholder: 'https://example.com/proof-of-income.png',
  },
  {
    name: 'kycSelfie',
    label: 'Selfie',
    as: 'file',
    showUploadedUrlPreview: true,
    required: true,
    placeholder: 'https://example.com/selfie.png',
  },
];

export const subFormsIndividualCustomer: FormFieldsSection[] = [
  {
    title: 'User Details',
    fields: userDetailsFormFields,
  },
  {
    title: 'Address',
    fields: addressFormFields,
  },
  {
    title: 'Financial Details',
    fields: financialDetailsFields,
  },
  {
    title: 'Documents',
    fields: documentsFormFields,
  },
];
