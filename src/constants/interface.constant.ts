import { UserStats } from '@/services/auth.api';
import { USER_PROFILE } from '@/types';

export interface Tokens {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
  stats: UserStats;
  user?: USER_PROFILE;
}

export const ID_PROOF_TYPE = {
  DRIVING_LICENSE: 'DRIVING_LICENSE',
  PASSPORT: 'PASSPORT',
  OTHER: 'OTHER',
};

export const enum ROLES {
  INDIVIDUAL_CUSTOMER = 'INDIVIDUAL_CUSTOMER',
  CORPORATE = 'CORPORATE',
}
export const enum PERMISSIONS {
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER',
  ADMIN = 'ADMIN',
}

/* eslint-disable no-unused-vars */
export const enum DOCUMENTS_TYPE {
  PASSPORT = 'PASSPORT',
  GOVERNMENT_ID = 'GOVERNMENT_ID',
  PERMANENT_RESIDENCE_PERMIT = 'PERMANENT_RESIDENCE_PERMIT',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  INCOME_PROOF = 'INCOME_PROOF',
  KYC_SELFIE = 'KYC_SELFIE',
  SHAREHOLDERS_STRUCTURE = 'SHAREHOLDERS_STRUCTURE',

  DRIVING_LICENSE_FRONT = 'DRIVING_LICENSE_FRONT',
  DRIVING_LICENSE_BACK = 'DRIVING_LICENSE_BACK',

  PASSPORT_FRONT = 'PASSPORT_FRONT',
  PASSPORT_BACK = 'PASSPORT_BACK',

  ORGANIZATION_ADDRESS_PROOF = 'ORGANIZATION_ADDRESS_PROOF',
  ORGANIZATION_REGISTRATION_PROOF = 'ORGANIZATION_REGISTRATION_PROOF',

  ORGANIZATION_CONSTITUTION = 'ORGANIZATION_CONSTITUTION',
  ORGANIZATION_DIRECTOR_LIST = 'ORGANIZATION_DIRECTOR_LIST',

  GOVERNMENT_ID_FRONT = 'GOVERNMENT_ID_FRONT',
  GOVERNMENT_ID_BACK = 'GOVERNMENT_ID_BACK',

  PERMANENT_RESIDENCE_PERMIT_FRONT = 'PERMANENT_RESIDENCE_PERMIT_FRONT',
  PERMANENT_RESIDENCE_PERMIT_BACK = 'PERMANENT_RESIDENCE_PERMIT_BACK',
  OTHER = 'OTHER',
}
export const LOGIN_TYPE_PASSWORD_CODE_RESEND_MODE = {
  EMAIL: 'EMAIL',
  PHONE_NUMBER: 'PHONE NUMBER',
  AUTHENTICATOR: 'AUTHENTICATOR',
};

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN_KEY: 'FT-ACCESS-TOKEN',
  REFRESH_TOKEN_KEY: 'FT-REFRESH-TOKEN',
  USER_KEY: 'FT-USER',
  TOKENS: 'tokens',
  USER: 'user',
  META_DATA: 'META_DATA',
};

export const enum ORGANIZATION_MEMBER_TYPE {
  BENEFICIARY = 'BENEFICIARY',
  MEMBER = 'MEMBER',
  AUTHORISED_PERSON = 'AUTHORISED_PERSON',
}

export const enum WALLET_STATUS {
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  NOT_CREATED = 'NOT_CREATED',
}

export const enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export const enum TRANSACTION_REQUEST_TYPE {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
  STAKE = 'STAKE',
  UNSTAKE = 'UNSTAKE',
}

export enum META_DATA_KEYS {
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  ADD_DETAILS = 'ADD_DETAILS',
  VERIFY_IDENTITY = 'VERIFY_IDENTITY',
  SETTING_UP_ORGANIZATION_MEMBERS = 'SETTING_UP_ORGANIZATION_MEMBERS',
  IS_ABOVE_EIGHTEEN = 'IS_ABOVE_EIGHTEEN',
}
export const enum META_DATA_TYPES {
  COMPLETE_ACCOUNT_SETUP = 'COMPLETE_ACCOUNT_SETUP',
  KYC_CHANGES = 'KYC_CHANGES',
}

export enum ASSETS_TYPES {
  APTOS = 'APTOS',
  COSMOS = 'COSMOS',
  EVM = 'EVM',
  SOLANA = 'SOLANA',
  STARKNET = 'STARKNET',
  SUI = 'SUI',
  TON = 'TON',
  UTXO = 'UTXO',
}

// account status
export enum ACCOUNT_STATUS {
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  ACTIVE = 'ACTIVE',
  FREEZED = 'FREEZED',
  AGREEMENT_NOT_SIGNED = 'AGREEMENT_NOT_SIGNED',
}

// ACCOUNT APPROVAL STATUS
export enum APPROVAL_STATUS {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

export enum PENDING_APPROVAL_REQUEST {
  ACCOUNT = 'ACCOUNT',
  WALLET = 'WALLET',
  TRANSACTION = 'TRANSACTION',
  DELETE_USER = 'DELETE_USER',
  CHANGE_PERMISSION = 'CHANGE_PERMISSION',
  CHANGE_GOVERNANCE_STRUCTURE = 'CHANGE_GOVERNANCE_STRUCTURE',
}

export enum CHAINS_UNIQUE_ID {
  COSMOS_AGORIC_3 = 'cosmos_agoric-3',
  APTOS_MAINNET = 'aptos_mainnet',
  EVM_ARBITRUM_MAINNET = 'evm_arbitrum_mainnet',
  EVM_AVALANCHE_CHAIN = 'evm_avalanche_chain',
  EVM_BASE_MAINNET = 'evm_base_mainnet',
  BITCOIN_MAINNET = 'bitcoin_mainnet',
  EVM_BLAST_MAINNET = 'evm_blast_mainnet',
  EVM_BSC_MAINNET = 'evm_bsc_mainnet',
  COSMOS_CELESTIA = 'cosmos_celestia',
  COSMOS_COSMOSHUB_4 = 'cosmos_cosmoshub-4',
  COSMOS_DYDX_MAINNET_1 = 'cosmos_dydx-mainnet-1',
  COSMOS_DYMENSION_110_1 = 'cosmos_dymension_1100-1',
  EVM_ETHEREUM_MAINNET = 'evm_ethereum_mainnet',
  EVM_FANTOM_MAINNET = 'evm_fantom_mainnet',
  COSMOS_INJECTIVE_1 = 'cosmos_injective-1',
  EVM_LINEA_MAINNET = 'evm_linea_mainnet',
  EVM_MANTLE_MAINNET = 'evm_mantle_mainnet',
  APTOS_MOVEMENT_MAINNET = 'aptos_movement_mainnet',
  APTOS_MOVEMENT_TESTNET = 'aptos_movement_testnet',
  COSMOS_NOBLE_1 = 'cosmos_noble-1',
  EVM_OPTIMISM_MAINNET = 'evm_optimism_mainnet',
  COSMOS_OSMOSIS_1 = 'cosmos_osmosis-1',
  EVM_POLYGON_MAINNET = 'evm_polygon_mainnet',
  EVM_POLYGON_ZKEVM_MAINNET = 'evm_polygon_zkevm_mainnet',
  EVM_SCROLL_MAINNET = 'evm_scroll_mainnet',
  COSMOS_PACIFIC_1 = 'cosmos_pacific-1',
  EVM_SEI_MAINNET = 'evm_sei_mainnet',
  SOLANA_MAINNET = 'solana_mainnet',
  EVM_SONIC_MAINNET = 'evm_sonic_mainnet',
  STARKNET_MAINNET = 'starknet_mainnet',
  SUI_MAINNET = 'sui_mainnet',
  TON_MAINNET = 'ton_mainnet',
  ZKSYNC_ERA_MAINNET = 'zksync_era_mainnet',
}

// Enum for Amount Type (for modal form)
export enum AMOUNT_TYPE {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO',
}

// form option types
export interface FORM_OPTIONS {
  value: string;
  label: string;
}

export type CURRENCY_TYPE = 'CRYPTO' | 'USD';

export interface PaginationParams {
  page?: number;
  limit?: number;
}
export interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  initialPage?: number;
}
export interface TableWrapperPaginationProps extends Partial<PaginationProps> {
  pagination?: boolean;
}

export interface Pagination {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface TrelloLabel {
  id: string;
  idBoard: string;
  idOrganization: string;
  name: string;
  nodeId: string;
  color: string;
  uses: number;
}

interface TrelloBadges {
  attachments: number;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  checkItemsEarliestDue: string | null;
  comments: number;
  description: boolean;
  due: string | null;
  dueComplete: boolean;
  lastUpdatedByAi: boolean;
  start: string | null;
  externalSource: string | null;
  attachmentsByType: {
    trello: {
      board: number;
      card: number;
    };
  };
  location: boolean;
  votes: number;
  maliciousAttachments: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
}

export interface TrelloCard {
  name: string;
  id?: string;
  badges?: TrelloBadges;
  checkItemStates?: any[]; // refine if you know structure
  closed?: boolean;
  dueComplete?: boolean;
  dateLastActivity?: string;
  desc?: string;
  descData?: {
    emoji: Record<string, unknown>;
  };
  due?: string | null;
  dueReminder?: string | null;
  email?: string | null;
  idBoard?: string;
  idChecklists?: string[];
  idList?: string;
  idMembers?: string[];
  idMembersVoted?: string[];
  idShort?: number;
  idAttachmentCover?: string | null;
  labels?: TrelloLabel[];
  idLabels?: string[];
  manualCoverAttachment?: boolean;
  nodeId?: string;
  pinned?: boolean;
  pos?: number;
  shortLink?: string;
  shortUrl?: string;
  start?: string | null;
  subscribed?: boolean;
  url?: string;
  cover?: string | null;
  isTemplate?: boolean;
  cardRole?: string | null;
  mirrorSourceId?: string | null;
}
