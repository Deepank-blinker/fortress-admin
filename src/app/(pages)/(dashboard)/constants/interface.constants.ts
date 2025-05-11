export interface WalletFormvalues {
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
