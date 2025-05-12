import { USER_PROFILE, WALLET_TYPE } from '@/types';
import { mapDocumentsToIds, mapDocumentsToKeys, mapWallets } from '../../utils';
import { IndividualFormValues } from '../constants/interface.constants';

export const getIndividualInitialValues = (
  customer: USER_PROFILE
): IndividualFormValues => {
  const { details, address, financialDetails, Document, Wallet } = customer;

  const wallets = mapWallets(Wallet);
  const whitelistedWallets = wallets.filter(
    (wallet) => wallet.walletType === WALLET_TYPE.WHITELISTED
  );
  const vaultWallets = wallets.filter(
    (wallet) => wallet.walletType === WALLET_TYPE.VAULT
  );

  return {
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    username: customer?.username || '',
    email: customer?.email || '',
    gender: customer?.gender || '',
    phoneNumber: customer?.phoneNumber || '',
    dateOfBirth: customer?.dateOfBirth || '',
    nationality: customer?.nationality || '',
    placeOfBirth: customer?.placeOfBirth || '',
    residenceCountry: customer?.residenceCountry || '',
    profilePicture: customer?.profilePicture || '',
    accountStatus: details?.accountStatus || '',
    kycStatus: details?.kycStatus || '',

    // address
    line1: address?.line1 || '',
    line2: address?.line2 || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    country: address?.country || '',

    // financial details
    sourceOfIncome: financialDetails?.sourceOfIncome[0] || '',
    annualIncome: financialDetails?.annualIncome || '',
    originOfFunds: financialDetails?.originOfFunds || '',
    valueOfAssetsUnderCustody:
      financialDetails?.valueOfAssetsUnderCustody || '',
    numberOfAssetsUnderCustody:
      financialDetails?.numberOfAssetsUnderCustody as number,
    taxRegistrationNumber: financialDetails?.taxRegistrationNumber || '',
    taxRegistrationCountry: financialDetails?.taxRegistrationCountry || '',
    ...mapDocumentsToKeys(Document || []),
    ids: mapDocumentsToIds(Document || []),

    // wallets
    whitelistedWallets,
    vaultWallets,
  };
};
