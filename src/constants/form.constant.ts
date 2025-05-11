import { DOCUMENTS_FIELDS, KYC_STATUS, WALLET_TYPE } from '@/types';
import { Country } from 'country-state-city';
import {
  ACCOUNT_STATUS,
  DOCUMENTS_TYPE,
  ORGANIZATION_MEMBER_TYPE,
  PERMISSIONS,
  WALLET_STATUS,
} from './interface.constant';
import { NATIONALITIES } from './nationality';
import { toSentenceCase } from '@/utils';

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

// nationality Option
export const NATIONALITY_OPTIONS = NATIONALITIES.map((n) => ({
  label: n,
  value: n,
}));

export const GENDER_OPTIOPNS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
];

// choose permission
export const PERMISSIONS_OPTIONS = [
  PERMISSIONS.ADMIN,
  PERMISSIONS.OPERATOR,
  PERMISSIONS.VIEWER,
].map((permission) => ({
  label: toSentenceCase(permission, true),
  value: permission,
}));

export const KYC_STATUS_OPTIONS = [
  {
    value: KYC_STATUS.PENDING,
    label: toSentenceCase(KYC_STATUS.PENDING, true),
    className: '!text-[#3B3B3B]',
    buttonClassName: '!bg-[#F6C953]', // Golden Amber
  },
  {
    value: KYC_STATUS.APPROVED,
    label: toSentenceCase(KYC_STATUS.APPROVED, true),
    className: '!text-white',
    buttonClassName: '!bg-[#4CAF50]', // Emerald Green
  },
  {
    value: KYC_STATUS.REJECTED,
    label: toSentenceCase(KYC_STATUS.REJECTED, true),
    className: '!text-white',
    buttonClassName: '!bg-[#F44336]', // Bright Red
  },
];

export const ACCOUNT_STATUS_OPTIONS = [
  {
    value: ACCOUNT_STATUS.ACTIVE,
    label: toSentenceCase(ACCOUNT_STATUS.ACTIVE, true),
    className: '!text-white',
    buttonClassName: '!bg-[#2E7D32]', // Deep Green
  },
  {
    value: ACCOUNT_STATUS.AGREEMENT_NOT_SIGNED,
    label: toSentenceCase(ACCOUNT_STATUS.AGREEMENT_NOT_SIGNED, true),
    className: '!text-[#3B3B3B]',
    buttonClassName: '!bg-[#FFC107]', // Yellow (Caution)
  },
  {
    value: ACCOUNT_STATUS.BLOCKED,
    label: toSentenceCase(ACCOUNT_STATUS.BLOCKED, true),
    className: '!text-white',
    buttonClassName: '!bg-[#D32F2F]', // Crimson Red
  },
  {
    value: ACCOUNT_STATUS.FREEZED,
    label: toSentenceCase(ACCOUNT_STATUS.FREEZED, true),
    className: '!text-[#1A1A1A]',
    buttonClassName: '!bg-[#90A4AE]', // Steel Gray (Frozen)
  },
  {
    value: ACCOUNT_STATUS.PENDING,
    label: toSentenceCase(ACCOUNT_STATUS.PENDING, true),
    className: '!text-[#3B3B3B]',
    buttonClassName: '!bg-[#FFEB3B]', // Bright Yellow
  },
];

export const WALLET_STATUS_OPTIONS = [
  {
    value: WALLET_STATUS.PENDING,
    label: toSentenceCase(WALLET_STATUS.PENDING, true),
    className: '!text-[#3B3B3B]',
    buttonClassName: '!bg-[#FFCA28]', // Amber
  },
  {
    value: WALLET_STATUS.VERIFIED,
    label: toSentenceCase(WALLET_STATUS.VERIFIED, true),
    className: '!text-white',
    buttonClassName: '!bg-[#00C853]', // Bright Green
  },
  {
    value: WALLET_STATUS.REJECTED,
    label: toSentenceCase(WALLET_STATUS.REJECTED, true),
    className: '!text-white',
    buttonClassName: '!bg-[#E53935]', // Red
  },
  {
    value: WALLET_STATUS.NOT_CREATED,
    label: toSentenceCase(WALLET_STATUS.NOT_CREATED, true),
    className: '!text-[#333]',
    buttonClassName: '!bg-[#E0E0E0]', // Light Gray
  },
];

export const WALLET_TYPE_OPTIONS = [
  WALLET_TYPE.VAULT,
  WALLET_TYPE.WHITELISTED,
].map((type) => ({
  label: toSentenceCase(type, true),
  value: type,
}));
export const ORGANIZATION_MEMBER_TYPE_OPTIONS = [
  ORGANIZATION_MEMBER_TYPE.AUTHORISED_PERSON,
  ORGANIZATION_MEMBER_TYPE.BENEFICIARY,
  ORGANIZATION_MEMBER_TYPE.MEMBER,
].map((type) => ({
  label: toSentenceCase(type, true),
  value: type,
}));

export const CHAIN_OPTIONS = [
  { value: 'EVM', label: 'EVM' },
  { value: 'SOLANA', label: 'SOLANA' },
  { value: 'COSMOS', label: 'COSMOS' },
  { value: 'AKASH', label: 'AKASH' },
  { value: 'ARCHWAY', label: 'ARCHWAY' },
  { value: 'AXELAR', label: 'AXELAR' },
  { value: 'CELESTIA', label: 'CELESTIA' },
  { value: 'DYDX', label: 'DYDX' },
  { value: 'AGORIC', label: 'AGORIC' },
  { value: 'DYMENSION', label: 'DYMENSION' },
  { value: 'INJECTIVE', label: 'INJECTIVE' },
  { value: 'NILLION', label: 'NILLION' },
  { value: 'NOBLE', label: 'NOBLE' },
  { value: 'OSMOSIS', label: 'OSMOSIS' },
  { value: 'SEI', label: 'SEI' },
  { value: 'STRIDE', label: 'STRIDE' },
  { value: 'UTXO', label: 'BITCOIN' },
  { value: 'SUI', label: 'SUI' },
  { value: 'APTOS', label: 'APTOS' },
  { value: 'MOVEMENT', label: 'MOVEMENT' },
  { value: 'TON', label: 'TON' },
  { value: 'STACKS', label: 'STACKS' },
  { value: 'STARKNET', label: 'STARKNET' },
  { value: 'CARDANO', label: 'CARDANO' },
  { value: 'DASH', label: 'DASH' },
  { value: 'DOGECOIN', label: 'DOGECOIN' },
  { value: 'NEAR', label: 'NEAR' },
  { value: 'POLKADOT', label: 'POLKADOT' },
  { value: 'RIPPLE', label: 'RIPPLE' },
  { value: 'STELLAR', label: 'STELLAR' },
  { value: 'TEZOS', label: 'TEZOS' },
  { value: 'CRONOS', label: 'CRONOS' },
];

export const DOCUMENT_TYPE_OPTIONS = [
  DOCUMENTS_TYPE.PASSPORT,
  DOCUMENTS_TYPE.DRIVING_LICENSE,
  DOCUMENTS_TYPE.GOVERNMENT_ID,
  DOCUMENTS_TYPE.PERMANENT_RESIDENCE_PERMIT,
].map((type) => ({
  label: toSentenceCase(type, true),
  value: type,
}));

export const COUNTRY_REGULATED_AS_OPTIONS = [
  { value: 'VASP', label: 'VASP' },
  { value: 'CASP', label: 'CASP' },
  { value: 'CREDIT_INSTITUTION', label: 'Credit Institution' },
  { value: 'OTHER', label: 'Other' },
];
