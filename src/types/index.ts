import { DateExtraProps } from '@/components/custom/date-input';
import { AsType } from '@/components/custom/form-field';
import { CHAINS } from '@/constants/index.constant';
import {
  ACCOUNT_STATUS,
  ASSETS_TYPES,
  CURRENCY_TYPE,
  DOCUMENTS_TYPE,
  ORGANIZATION_MEMBER_TYPE,
  Pagination,
  PERMISSIONS,
  ROLES,
  TRANSACTION_REQUEST_TYPE,
  TRANSACTION_STATUS,
  WALLET_STATUS,
} from '@/constants/interface.constant';

export interface ADDRESS_DETAILS {
  id: string;
  userId: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  kycAddressDetails: {
    address_id: string;
  };
}
export interface FINANCIAL_DETAILS {
  id: string;
  sourceOfIncome: string[];
  annualIncome: string; // Represented as a range string
  originOfFunds: string;
  valueOfAssetsUnderCustody: string; // Represented as a range string
  numberOfAssetsUnderCustody: number; // Represented as a numeric value
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  taxRegistrationNumber: string;
  taxRegistrationCountry: string;
  percentageShareInCompany?: number;
}

export interface DOCUMENT_DETAILS {
  id: string;
  userId: string;
  organizationId?: string;
  type: DOCUMENTS_TYPE; // Enum-like strings for type
  documentId: string;
  documentVersion: number;
  countryOfIssuance?: string;
  documentUrl: string | undefined;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  expiryDate: string;
}
export interface TOKEN {
  id: string;
  token: string;
  type: 'ACCESS' | 'REFRESH';
  expires: string; // ISO 8601 format
  blacklisted: boolean;
  createdAt: string; // ISO 8601 format
  userId: string;
}
export interface ORGANIZATION_MEMBERS_DETAILS {
  memberUser: MEMBER[];
  authorizedUser: MEMBER[];
  beneficiaryUser: MEMBER[];
  primaryRoleAuthorizedUser?: MEMBER[];
  primaryRoleBeneficiaryUser?: MEMBER[];
}
export interface ORGANIZATION {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationNumber: string | null;
  registrationDate: string | null;
  countryOfRegistration: string | null;
  hasNoBeneficiaries: boolean | null;
  beneficiariesDetails: string | null;
  numberOfAdminToSetupNewUser: string | null;
  numberOfAdminRequiredToChangeGovernanceStructure: string | null;
  numberOfAdminToApproveTransaction: string | null;
  numberOfAdminToWhitelist: string | null;
  numberOfAdminRequiredToChangePermission: string | null;
  numberOfAdminRequiredToDeleteAUser: string | null;
  numberOfAdminToVault: string | null;
  addressId: string | null;
  createdAt: string;
  updatedAt: string;
  adminCount: number;
  Document: DOCUMENT_DETAILS[];
  address: ADDRESS_DETAILS;
  Wallet: WALLET[];
  regulationDetails: string | null;
  countryOfRegulation: string | null;
  regulator: string | null;
  companyRegulateAs: string | null;
  companyRegulateAsDetails: string | null;
  natureOfActivity: string;
  financialDetails: FINANCIAL_DETAILS;
  details: DETAILS;
  members?: MEMBER[];
  createdBy?: MEMBER;
}
export interface DETAILS {
  id: string;
  userId?: string;
  companySize?: string;
  userOccupation?: string;
  estimatedFundsToTransfer?: string;
  intendedPlatformUsagePurpose?: string;
  percentageShareInCompany?: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  kycStatus?: KYC_STATUS;
  isDashboardUnlocked?: boolean;
  kycDetails?: {
    applicant_id: string;
    record_Id: string;
    verification_id: string;
  };
  kycResult: Record<string, unknown>;
  accountStatus: ACCOUNT_STATUS;
}

export interface USER {
  id?: string;
  email?: string;
  isEmailVerified?: boolean;
  profilePicture?: string;
  mustChangePassword?: boolean;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneCountryCode?: string;
  role?: ROLES;
  permission?: PERMISSIONS;
  isPhoneNumberVerified?: boolean;
  gender?: string;
  nationality?: string;
  isResidenceInSameCountry?: boolean;
  residenceCountry?: string;
  dateOfBirth?: string; // ISO 8601 format
  organizationId?: string;
  addressId?: string;
  detailsId?: string;
  financialDetailsId?: string;
  createdAt?: string; // ISO 8601 format
  updatedAt?: string; // ISO 8601 format
  placeOfBirth?: string;
  title?: string;
  primaryUserType?: ORGANIZATION_MEMBER_TYPE;
  userTypes?: ORGANIZATION_MEMBER_TYPE[];
  requestedById?: string;
  hasLoginAccess?: boolean;
  isMFAEnabled?: boolean;
  username?: string;
}

export interface FORM_FIELD {
  type?: AsType;
  name: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  dateProps?: DateExtraProps;
  required?: boolean;
}

export interface ACCOUNT_SUMMARY_ITEMS {
  fieldKey: string;
  title: string;
  description: string;
}
export interface PROCESSED_ACCOUNT_SUMMARY_ITEMS extends ACCOUNT_SUMMARY_ITEMS {
  checked: boolean;
}

export interface StepProps {
  handleNext: (query?: string) => void;
  handlePrevious?: () => void;
}

export interface Step {
  component: React.ReactElement<StepProps>;
  name: string;
}

export interface FORM_FIELD_OBJECT {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  as?: AsType;
  value?: string | number;
  options?: { value: string; label: string }[];
  min?: number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectValue?: (value: string) => void;
  dateProps?: DateExtraProps;
}
export interface GRID_FORM_FIELD {
  isGrid?: boolean;
  fields: FORM_FIELD_OBJECT[] | FORM_FIELD_OBJECT;
}

export interface WALLET {
  id: string;
  userId?: string;
  organizationId?: string;
  status: WALLET_STATUS;
  walletName: string;
  token?: CryptoToken;
  chain: ASSETS_TYPES;
  isNativeToken?: boolean;
  evmChain?: EvmChains;
  walletType: WALLET_TYPE;
  walletAddress: string;
  riskScore?: number;
  tokenId: string | null;
  pdfReportUrl?: string;
  createdAt: string;
  updatedAt: string;
  requestedBy?: USER;
  isWalletApproved: boolean;
  vaultId?: string;
  assetId?: string;
  accountId?: string;
  whitelistedOn?: string;
  evmChainId?: string;
}

// document field
export interface DOCUMENTS_FIELDS {
  id?: string;
  documentId: string;
  countryOfIssuance: string;
  expiryDate?: string;
}
// document form fields
export interface DOCUMENT_FORM_VALUES {
  documentId?: string;
  countryOfIssuance?: string;
  frontImage?: File[] | null;
  backImage?: File[] | null;
  hasMoreThanOneDocument?: string | boolean;
  expiryDate?: Date | string;
  documentsData: DOCUMENTS_FIELDS[];
}
export interface ADDRESS_FORM_VALUES {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType?: 'HOME' | 'WORK' | 'OTHER';
}

export interface USER_STATS {
  isProfileComplete: boolean;
  isOnboardingComplete: boolean;
  isKycApproved: boolean;
  isMetaCompleted: boolean;
}

export interface USER_PROFILE extends USER {
  address?: ADDRESS_DETAILS;
  financialDetails?: FINANCIAL_DETAILS;
  Document?: DOCUMENT_DETAILS[];
  tokens?: TOKEN[];
  primaryUserType?: ORGANIZATION_MEMBER_TYPE;
  userTypes?: ORGANIZATION_MEMBER_TYPE[];
  organization?: ORGANIZATION;
  details?: DETAILS;
  Wallet?: WALLET[];
  stats?: USER_STATS;
}

export interface MEMBER
  extends Omit<USER_PROFILE, 'Meta' | 'Wallet' | 'tokens'> {
  userType?: ORGANIZATION_MEMBER_TYPE;
}
export interface MEMBER_FORM_VALUES
  extends ADDRESS_FORM_VALUES,
    USER,
    DOCUMENT_FORM_VALUES {
  proofOfAddress?: File[];
  documentType?: DOCUMENTS_TYPE;
  percentageShareInCompany?: number;
  title?: string;
}

// nature of activity
export interface BUSINESS_ACTIVITY {
  business_category_id: string;
  labels: [
    {
      label: string;
      language_code: string;
    },
  ];
  activities: [
    {
      business_activity_id: string;
      labels: [
        {
          label: string;
          language_code: string;
        },
      ];
    },
  ];
}

export enum WALLET_TYPE {
  WHITELISTED = 'WHITELISTED',
  VAULT = 'VAULT',
}

export interface Response<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
export interface PaginationResponse<T = unknown> {
  data: T;
  pagination: Pagination;
}

// KYC status
export enum KYC_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface SHORT_WALLET {
  id: string;
  walletName: string;
  chain: string;
  evmChain?: EvmChains;
  tokenId: string;
  token?: CryptoToken;
  walletType: WALLET_TYPE;
  walletAddress?: string;
  logo?: string;
  isNativeToken?: boolean;
}

export interface TRANSACTION {
  id: string;
  userId?: string;
  organizationId?: string;
  chain?: ASSETS_TYPES;
  tokenId?: string;
  token?: CryptoToken & { logo?: string };
  transactionCode?: string | null;
  amount?: number;
  requestType: TRANSACTION_REQUEST_TYPE;
  isTransactionApproved?: boolean;
  from: string;
  to: string;
  status: TRANSACTION_STATUS;
  requestedById: string;
  createdAt: string;
  updatedAt: string;
  transactionCurrency: CURRENCY_TYPE;
  fromWallet?: WALLET;
  toWallet?: WALLET;
  requestedBy?: REQUESTED_BY;
}

// approval request initiated By
export interface REQUESTED_BY {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  permission: PERMISSIONS;
  createdAt: string;
}

export interface CryptoToken {
  id?: string;
  name?: string;
  symbol: string;
  chain?: CHAINS;
}

export interface EvmChains {
  id?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
export interface FormOption {
  value: string;
  label: string;
}
export interface FormFields {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  as?: AsType;
  value?: string | number;
  options?: FormOption[];
  showUploadedUrlPreview?: boolean;
  min?: number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectValue?: (value: string) => void;
  arrayFields?: FormFields[];
  multiSelect?: boolean;
  editable?: boolean;
  hidden?: boolean;
}

export interface FormFieldsSection {
  title: string;
  fields: FormFields[];
  name?: string;
  hideFields?: string[];
}

export interface StakeAsset {
  id: string;
  assetName: string;
  assetType: string;
  rewardRate: number | null;
  activationPeriod: string | null;
  unBoundingPeriod: string | null;
  minimumStakingAmount: string | null;
  createdAt: string;
  updatedAt: string;
  minimumStake: number | null;
}
