import { Pagination } from './interface.constant';
import { ROUTES } from './route';

export const MIN_SELECTABLE_AGE = 18;

export const MAX_PASSPORTS = 2;

export const PaginationInitialValues: Pagination = {
  page: 0,
  limit: 0,
  total: 0,
  totalPages: 0,
};

export const NATIVE_COUNTRY_ISO_CODE = 'IE';

export const WHITELIST_WALLET_LIMIT = {
  MAX: 10,
  MIN: 1,
};

export const MAIN_COUNTRY = {
  code: 'IE',
  name: 'Ireland',
};

export enum CHAINS {
  EVM = 'EVM',
  SOLANA = 'SOLANA',
  COSMOS = 'COSMOS',
  AKASH = 'AKASH',
  ARCHWAY = 'ARCHWAY',
  AXELAR = 'AXELAR',
  CELESTIA = 'CELESTIA',
  DYDX = 'DYDX',
  AGORIC = 'AGORIC',
  DYMENSION = 'DYMENSION',
  INJECTIVE = 'INJECTIVE',
  NILLION = 'NILLION',
  NOBLE = 'NOBLE',
  OSMOSIS = 'OSMOSIS',
  SEI = 'SEI',
  STRIDE = 'STRIDE',
  UTXO = 'UTXO',
  SUI = 'SUI',
  APTOS = 'APTOS',
  MOVEMENT = 'MOVEMENT',
  TON = 'TON',
  STACKS = 'STACKS',
  STARKNET = 'STARKNET',
  CARDANO = 'CARDANO',
  DASH = 'DASH',
  DOGECOIN = 'DOGECOIN',
  NEAR = 'NEAR',
  POLKADOT = 'POLKADOT',
  RIPPLE = 'RIPPLE',
  STELLAR = 'STELLAR',
  TEZOS = 'TEZOS',
  USDT = 'USDT',
  BITCOIN = 'BITCOIN',
  CRONOS = 'CRONOS',
}

// Comprehensive color mapping for all blockchain chains
export const CHAIN_COLORS = {
  // Main chains
  EVM: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  SOLANA: 'bg-purple-50 border-purple-200 text-purple-700',
  BITCOIN: 'bg-orange-50 border-orange-200 text-orange-700',

  // Cosmos ecosystem (blue variants)
  COSMOS: 'bg-blue-50 border-blue-200 text-blue-700',
  AKASH: 'bg-sky-50 border-sky-200 text-sky-700',
  ARCHWAY: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  AXELAR: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  CELESTIA: 'bg-violet-50 border-violet-200 text-violet-700',
  DYDX: 'bg-blue-50 border-blue-200 text-blue-800',
  AGORIC: 'bg-sky-50 border-sky-200 text-sky-800',
  DYMENSION: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  INJECTIVE: 'bg-cyan-50 border-cyan-200 text-cyan-800',
  NILLION: 'bg-blue-50 border-blue-200 text-blue-600',
  NOBLE: 'bg-indigo-50 border-indigo-200 text-indigo-600',
  OSMOSIS: 'bg-violet-50 border-violet-200 text-violet-800',
  SEI: 'bg-blue-50 border-blue-200 text-blue-700',
  STRIDE: 'bg-sky-50 border-sky-200 text-sky-600',

  // Move-based chains (red variants)
  SUI: 'bg-rose-50 border-rose-200 text-rose-700',
  APTOS: 'bg-red-50 border-red-200 text-red-700',
  MOVEMENT: 'bg-pink-50 border-pink-200 text-pink-700',

  // Other major chains (unique colors)
  TON: 'bg-blue-50 border-blue-200 text-blue-700',
  STACKS: 'bg-slate-50 border-slate-200 text-slate-700',
  STARKNET: 'bg-neutral-50 border-neutral-200 text-neutral-700',
  CARDANO: 'bg-teal-50 border-teal-200 text-teal-700',
  UTXO: 'bg-amber-50 border-amber-200 text-amber-700',

  // Additional chains (various colors)
  DASH: 'bg-blue-50 border-blue-200 text-blue-700',
  DOGECOIN: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  NEAR: 'bg-stone-50 border-stone-200 text-stone-700',
  POLKADOT: 'bg-pink-50 border-pink-200 text-pink-700',
  RIPPLE: 'bg-sky-50 border-sky-200 text-sky-700',
  STELLAR: 'bg-blue-50 border-blue-200 text-blue-700',
  TEZOS: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  USDT: 'bg-green-50 border-green-200 text-green-700',
};

export const CARD_COLORS = [
  'bg-gradient-to-br from-rose-50 to-white', // soft rose gradient
  'bg-gradient-to-br from-emerald-50 to-white', // soft emerald gradient
  'bg-gradient-to-br from-violet-50 to-white', // soft violet gradient
  'bg-gradient-to-br from-amber-50 to-white', // soft amber gradient
];

export const HEADER_COLORS = [
  'bg-gradient-to-r from-rose-100 to-rose-50', // rose header gradient
  'bg-gradient-to-r from-emerald-100 to-emerald-50', // emerald header gradient
  'bg-gradient-to-r from-violet-100 to-violet-50', // violet header gradient
  'bg-gradient-to-r from-amber-100 to-amber-50', // amber header gradient
];

export const TAB_LINKS_DATA = [
  {
    title: 'Whitelisted IPs',
    path: ROUTES.WHITELISTED_IPS.path,
  },
  {
    title: 'Crypto Tokens',
    path: ROUTES.CRYPTO_TOKENS.path,
  },
  {
    title: 'Stake',
    path: ROUTES.STAKE.path,
  },
  {
    title: 'Individual',
    path: ROUTES.INDIVIDUAL.path,
  },
  {
    title: 'Corporate',
    path: ROUTES.CORPORATE.path,
  },
  {
    title: 'Customer Tickets',
    path: ROUTES.CUSTOMER_TICKETS.path,
  },
  {
    title: 'FAQs',
    path: ROUTES.FAQS.path,
  },
];
