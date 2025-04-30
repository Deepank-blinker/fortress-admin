import {
  DOCUMENTS_FIELDS,
} from '@/types';
import { Country } from 'country-state-city';
import {
  PERMISSIONS,
} from './interface.constant';

export const CODE_RESEND_TIMEOUT = 30;

export const USER_PERMISSION_OPTIONS = [
  { value: 'OPERATOR', label: 'Operator' },
  { value: 'VIEWER', label: 'Viewer' },
];

export const ADDRESS_TYPE_OPTION = [
  { value: 'HOME', label: 'Home' },
  { value: 'WORK', label: 'Work' },
  { value: 'OTHER', label: 'Other' },
];

export const SOURCE_OF_INCOME_OPTION = [
  { value: 'SALARY', label: 'Salary' },
  { value: 'DIVIDENDS', label: 'Dividends' },
  {
    value: 'SALE_PROPERTY',
    label: 'Sale of a property',
  },
  { value: 'SAVINGS', label: 'Savings' },
  {
    value: 'DIVORCE_SETTLEMENTS',
    label: 'Divorce settlements',
  },
  { value: 'INHERITANCE', label: 'Inheritance' },
  {
    value: 'LOAN',
    label: 'Loan',
  },
  {
    value: 'INVESTMENTS',
    label: 'Sales of Shares,Investments,Trading Income',
  },
  {
    value: 'OTHER',
    label: 'Other Additional Income (e.g. Rental property)',
  },
];

export const INCOME_OPTION = [
  {
    value: 'ANNUAL_INCOME_GROUP_1',
    label: 'Below 50,000 EUR',
  },
  {
    value: 'ANNUAL_INCOME_GROUP_2',
    label: '50,000 EUR - 100,000 EUR',
  },
  {
    value: 'ANNUAL_INCOME_GROUP_3',
    label: '100,000 EUR - 300,000 EUR',
  },
  {
    value: 'ANNUAL_INCOME_GROUP_4',
    label: 'Above 300,000 EUR',
  },
];

export const ASSETS_UNDER_CUSTODY = [
  {
    value: 'Less than 1,000,000 EUR',
    label: 'Less than 1,000,000 EUR',
  },
  {
    value: '1,000,000 EUR - 5,000,000 EUR',
    label: '1,000,000 EUR - 5,000,000 EUR',
  },
  {
    value: '5,000,000 EUR - 10,000,000 EUR',
    label: '5,000,000 EUR - 10,000,000 EUR',
  },
  {
    value: 'More than 10,000,000 EUR',
    label: 'More than 10,000,000 EUR',
  },
];

// password verification
export const PASSWORD_VERIFICATION = [
  {
    text: 'Minimum of 10 characters',
    test: (password: string) => password.length >= 10,
  },
  {
    text: 'Contains at least 1 symbol',
    test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    text: 'Contains at least 1 number',
    test: (password: string) => /\d/.test(password),
  },
  {
    text: 'Contains Lowercase and Uppercase letters',
    test: (password: string) =>
      /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
];

export const DocumentDataInitialValues: DOCUMENTS_FIELDS = {
  countryOfIssuance: '',
  documentId: '',
  expiryDate: '',
};


// country Option
export const COUNTRY_OPTIONS = Country.getAllCountries().map((c) => ({
  label: `${c.flag} ${c.name}`,
  value: c.name,
}));

// choose permission
export const PERMISSIONS_OPTIONS = [
  { label: 'Admin', value: PERMISSIONS.ADMIN },
  { label: 'Operator', value: PERMISSIONS.OPERATOR },
  { label: 'Viewer', value: PERMISSIONS.VIEWER },
];
