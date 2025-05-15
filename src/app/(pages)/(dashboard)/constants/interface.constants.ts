import {
  TRANSACTION_REQUEST_TYPE,
  TRANSACTION_STATUS,
} from '@/constants/interface.constant';
import { TRANSACTION_AMOUNT_TYPE } from '@/types';

export interface WalletFormValues {
  walletId: string;
  walletName: string;
  walletAddress: string;
  walletType: string;
  walletStatus: string;
  chain: string;
  evmChainId: string;
  tokenId: string;
  vaultId: string;
  accountId: string;
  riskScore: number;
  pdfReportUrl: string;
}

export interface AddressFormValues {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IdFormValues {
  documentId: string;
  countryOfIssuance: string;
  expiryDate: string;
  documentType: string;
  frontImage: string;
  backImage: string;
}

export interface TransactionFormValues {
  id: string;
  from?: string;
  to?: string;
  requestType: TRANSACTION_REQUEST_TYPE;
  status: TRANSACTION_STATUS;
  chain?: string;
  evmChain?: string;
  tokenId?: string;
  amount: number;
  transactionCurrency: TRANSACTION_AMOUNT_TYPE;
  requestedBy?: string;
}
