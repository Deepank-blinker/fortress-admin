import {
  CHAIN_OPTIONS,
  COUNTRY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  TRANSACTION_REQUEST_TYPE_OPTIONS,
  TRANSACTION_STATUS_OPTIONS,
  WALLET_STATUS_OPTIONS,
  WALLET_TYPE_OPTIONS,
} from '@/constants/form.constant';
import { FormFields, FormOption } from '@/types';
import { toSentenceCase } from '@/utils';

export const addressFormFields: FormFields[] = [
  {
    name: 'line1',
    label: 'Line 1',
    placeholder: 'Line 1',
    required: true,
    type: 'text',
  },
  {
    name: 'line2',
    label: 'Line 2',
    placeholder: 'Line 2',
    type: 'text',
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Enter your city',
    required: true,
    type: 'text',
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'Enter your state',
    required: true,
    type: 'text',
  },
  {
    name: 'zipCode',
    label: 'Zip Code',
    placeholder: 'Enter your zip code',
    required: true,
    type: 'text',
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Enter your country',
    required: true,
    as: 'comboBox',
    options: COUNTRY_OPTIONS,
  },
];

export const getWalletFormFields = (
  tokenOptions: FormOption[],
  evmChainOptions: FormOption[]
): FormFields[] => {
  return [
    {
      name: 'walletName',
      label: 'Wallet Name',
      type: 'string',
      required: true,
      placeholder: 'Wallet Name',
      editable: true,
    },
    {
      name: 'walletAddress',
      label: 'Wallet Address',
      type: 'string',
      required: true,
      placeholder: '0x5dcd7d85ac0eb27a12e8b458e7d2c8c7bf637862',
      editable: true,
    },
    {
      name: 'walletType',
      label: 'Wallet Type',
      as: 'comboBox',
      options: WALLET_TYPE_OPTIONS,
      required: true,
    },
    {
      name: 'walletStatus',
      label: 'Wallet Status',
      as: 'comboBox',
      options: WALLET_STATUS_OPTIONS,
      required: true,
      editable: true,
    },
    {
      name: 'chain',
      label: 'Chain',
      as: 'comboBox',
      options: CHAIN_OPTIONS,
      required: true,
    },
    {
      name: 'evmChainId',
      label: 'EVM Chain',
      as: 'comboBox',
      options: evmChainOptions?.map((evmChain) => ({
        ...evmChain,
        label: toSentenceCase(evmChain.label, true),
      })),
    },
    {
      name: 'tokenId',
      label: 'Token',
      as: 'comboBox',
      options: tokenOptions,
      required: true,
    },
    {
      name: 'vaultId',
      label: 'Vault ID',
      type: 'string',
      placeholder: 'XXXXXXXXXXXXXXXXXXXXXXXX',
      editable: true,
    },
    {
      name: 'accountId',
      label: 'Account ID',
      type: 'string',
      placeholder: 'XXX',
      editable: true,
    },
    {
      name: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      placeholder: '0.5',
    },
    {
      name: 'pdfReportUrl',
      label: 'PDF Report URL',
      as: 'file',
      placeholder:
        'https://fortuna-bucket-123.s3.eu-north-1.amazonaws.com/1746079140430-logo-color.png',
    },
  ];
};

export const idFormFields: FormFields[] = [
  {
    name: 'documentId',
    label: 'Document ID',
    required: true,
    placeholder: 'A12345678',
  },
  {
    name: 'documentType',
    label: 'Document Type',
    as: 'comboBox',
    options: DOCUMENT_TYPE_OPTIONS,
    required: true,
  },
  {
    name: 'countryOfIssuance',
    label: 'Country of issuance',
    as: 'comboBox',
    options: COUNTRY_OPTIONS,
    required: true,
  },
  {
    name: 'expiryDate',
    label: 'Expiry Date',
    as: 'date',
    required: true,
  },
  {
    name: 'frontImage',
    label: 'Front Image',
    as: 'file',
    placeholder: 'https://example.com/front-image.png',
    type: 'url',
  },
  {
    name: 'backImage',
    label: 'Back Image',
    as: 'file',
    placeholder: 'https://example.com/back-image.png',
    type: 'url',
  },
];

export const getTransactionFormFields = (
  tokenOptions: FormOption[],
  evmChainOptions: FormOption[]
): FormFields[] => [
  {
    name: 'from',
    label: 'From',
    placeholder: 'From Wallet',
  },
  {
    name: 'to',
    label: 'To',
    placeholder: 'To Wallet',
  },
  {
    name: 'requestType',
    label: 'Transaction Type',
    as: 'comboBox',
    required: true,
    options: TRANSACTION_REQUEST_TYPE_OPTIONS,
  },
  {
    name: 'status',
    label: 'Status',
    as: 'comboBox',
    required: true,
    options: TRANSACTION_STATUS_OPTIONS,
  },
  {
    name: 'chain',
    label: 'Chain',
    as: 'comboBox',
    options: CHAIN_OPTIONS,
  },
  {
    name: 'evmChain',
    label: 'EVM Chain',
    as: 'comboBox',
    options: evmChainOptions,
  },
  {
    name: 'tokenId',
    label: 'Token',
    as: 'comboBox',
    options: tokenOptions,
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'number',
    placeholder: '1',
    required: true,
  },
  {
    name: 'transactionCurrency',
    label: 'Currency',
    required: true,
  },
  {
    name: 'requestedBy',
    label: 'Requested By',
  },
];
