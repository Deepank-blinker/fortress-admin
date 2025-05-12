import { DOCUMENTS_TYPE } from '@/constants/interface.constant';
import { DOCUMENT_DETAILS, WALLET } from '@/types';
import {
  IdFormValues,
  WalletFormValues,
} from '../constants/interface.constants';
import { IndividualDocumentFormValues } from '../individual-customers/constants/interface.constants';

export const mapDocumentsToKeys = (
  documents: DOCUMENT_DETAILS[]
): IndividualDocumentFormValues => {
  const mappedData: IndividualDocumentFormValues = {
    kycSelfie: '',
    proofOfIncome: '',
    proofOfAddress: '',
  };

  documents.forEach((doc) => {
    const { type, documentUrl } = doc;

    if (type === DOCUMENTS_TYPE.KYC_SELFIE) {
      mappedData['kycSelfie'] = documentUrl || '';
      // mappedData['kycSelfie']["uploadedFileUrl"] = documentUrl || '';
    } else if (type === DOCUMENTS_TYPE.INCOME_PROOF) {
      mappedData['proofOfIncome'] = documentUrl || '';
      //       mappedData['proofOfIncome']["uploadedFileUrl"] = documentUrl || '';
    } else if (type === DOCUMENTS_TYPE.ADDRESS_PROOF) {
      mappedData['proofOfAddress'] = documentUrl || '';
      // mappedData['kycSelfie']["uploadedFileUrl"] = documentUrl || '';
    }
  });

  return mappedData;
};

const documentTypeMapping: Record<string, string> = {
  [DOCUMENTS_TYPE.DRIVING_LICENSE_FRONT]: DOCUMENTS_TYPE.DRIVING_LICENSE,
  [DOCUMENTS_TYPE.DRIVING_LICENSE_BACK]: DOCUMENTS_TYPE.DRIVING_LICENSE,
  [DOCUMENTS_TYPE.GOVERNMENT_ID_FRONT]: DOCUMENTS_TYPE.GOVERNMENT_ID,
  [DOCUMENTS_TYPE.GOVERNMENT_ID_BACK]: DOCUMENTS_TYPE.GOVERNMENT_ID,
  [DOCUMENTS_TYPE.PERMANENT_RESIDENCE_PERMIT_FRONT]:
    DOCUMENTS_TYPE.PERMANENT_RESIDENCE_PERMIT,
  [DOCUMENTS_TYPE.PERMANENT_RESIDENCE_PERMIT_BACK]:
    DOCUMENTS_TYPE.PERMANENT_RESIDENCE_PERMIT,
  [DOCUMENTS_TYPE.PASSPORT_FRONT]: DOCUMENTS_TYPE.PASSPORT,
};
export const mapDocumentsToIds = (documents: DOCUMENT_DETAILS[]) => {
  const groupedByDocumentId: Record<string, IdFormValues> = {};

  documents.forEach((doc) => {
    const docTypeKey = documentTypeMapping[doc.type];
    if (!docTypeKey || !doc.documentId) return; // Skip if type is irrelevant or missing ID

    if (!groupedByDocumentId[doc.documentId]) {
      groupedByDocumentId[doc.documentId] = {
        documentId: doc.documentId,
        countryOfIssuance: doc.countryOfIssuance || 'Unknown',
        expiryDate: doc.expiryDate || '',
        documentType: docTypeKey,
        frontImage: '',
        backImage: '',
      };
    }

    if (doc.type.includes('FRONT')) {
      groupedByDocumentId[doc.documentId].frontImage = doc.documentUrl || '';
    } else if (doc.type.includes('BACK')) {
      groupedByDocumentId[doc.documentId].backImage = doc.documentUrl || '';
    }
  });

  return Object.values(groupedByDocumentId);
};

export const mapWallets = (wallets?: WALLET[]): WalletFormValues[] => {
  if (!wallets || wallets.length === 0) return [];
  return wallets?.map((wallet) => ({
    walletId: wallet.id || '',
    walletName: wallet.walletName || '',
    walletAddress: wallet.walletAddress || '',
    walletType: wallet.walletType || '',
    walletStatus: wallet.status || '',
    chain: wallet.chain || '',
    evmChainId: wallet.evmChainId || '',
    tokenId: wallet.tokenId || '',
    vaultId: wallet.vaultId || '',
    accountId: wallet.accountId || '',
    riskScore: wallet.riskScore as number,
    pdfReportUrl: wallet.pdfReportUrl || '',
  }));
};
