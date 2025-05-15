import {
  TRANSACTION_REQUEST_TYPE,
  TRANSACTION_STATUS,
} from '@/constants/interface.constant';
import { DOCUMENTS_FIELDS, KYC_STATUS, WALLET_TYPE } from '@/types';
import { toSentenceCase } from '@/utils';
import { Country } from 'country-state-city';
import {
  ACCOUNT_STATUS,
  DOCUMENTS_TYPE,
  ORGANIZATION_MEMBER_TYPE,
  PERMISSIONS,
  WALLET_STATUS,
} from './interface.constant';
import { NATIONALITIES } from './nationality';

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
    className: '!text-neutral-0',
    buttonClassName: '!bg-yellow-400', // Amber
  },
  {
    value: KYC_STATUS.APPROVED,
    label: toSentenceCase(KYC_STATUS.APPROVED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-green-600', // Emerald
  },
  {
    value: KYC_STATUS.REJECTED,
    label: toSentenceCase(KYC_STATUS.REJECTED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-red-500', // Red
  },
];

export const ACCOUNT_STATUS_OPTIONS = [
  {
    value: ACCOUNT_STATUS.ACTIVE,
    label: toSentenceCase(ACCOUNT_STATUS.ACTIVE, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-green-700', // Dark Green
  },
  {
    value: ACCOUNT_STATUS.AGREEMENT_NOT_SIGNED,
    label: toSentenceCase(ACCOUNT_STATUS.AGREEMENT_NOT_SIGNED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-yellow-500', // Caution Yellow
  },
  {
    value: ACCOUNT_STATUS.BLOCKED,
    label: toSentenceCase(ACCOUNT_STATUS.BLOCKED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-red-700', // Crimson
  },
  {
    value: ACCOUNT_STATUS.FREEZED,
    label: toSentenceCase(ACCOUNT_STATUS.FREEZED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-slate-400', // Frozen Gray
  },
  {
    value: ACCOUNT_STATUS.PENDING,
    label: toSentenceCase(ACCOUNT_STATUS.PENDING, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-yellow-300', // Bright Yellow
  },
];

export const WALLET_STATUS_OPTIONS = [
  {
    value: WALLET_STATUS.PENDING,
    label: toSentenceCase(WALLET_STATUS.PENDING, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-amber-400', // Amber
  },
  {
    value: WALLET_STATUS.VERIFIED,
    label: toSentenceCase(WALLET_STATUS.VERIFIED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-green-500', // Bright Green
  },
  {
    value: WALLET_STATUS.REJECTED,
    label: toSentenceCase(WALLET_STATUS.REJECTED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-red-600', // Red
  },
  {
    value: WALLET_STATUS.NOT_CREATED,
    label: toSentenceCase(WALLET_STATUS.NOT_CREATED, true),
    className: '!text-neutral-0',
    buttonClassName: '!bg-gray-300', // Light Gray
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

export const TRANSACTION_REQUEST_TYPE_OPTIONS = [
  {
    value: TRANSACTION_REQUEST_TYPE.DEPOSIT,
    label: toSentenceCase(TRANSACTION_REQUEST_TYPE.DEPOSIT, true),
  },
  {
    value: TRANSACTION_REQUEST_TYPE.DEPOSIT,
    label: toSentenceCase(TRANSACTION_REQUEST_TYPE.WITHDRAW, true),
  },
  {
    value: TRANSACTION_REQUEST_TYPE.DEPOSIT,
    label: toSentenceCase(TRANSACTION_REQUEST_TYPE.STAKE, true),
  },
  {
    value: TRANSACTION_REQUEST_TYPE.DEPOSIT,
    label: toSentenceCase(TRANSACTION_REQUEST_TYPE.UNSTAKE, true),
  },
];
export const TRANSACTION_STATUS_OPTIONS = [
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.APPROVED, true),
  },
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.CANCELLED, true),
  },
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.COMPLETED, true),
  },
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.EXPIRED, true),
  },
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.FAILED, true),
  },
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.PENDING, true),
  },
  {
    value: TRANSACTION_STATUS.APPROVED,
    label: toSentenceCase(TRANSACTION_STATUS.REJECTED, true),
  },
];
