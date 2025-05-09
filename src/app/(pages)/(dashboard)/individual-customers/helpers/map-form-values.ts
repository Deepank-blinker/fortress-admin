import { USER_PROFILE, WALLET_TYPE } from '@/types';
import { mapDocumentsToIds, mapDocumentsToKeys, mapWallets } from '../../utils';
import { IndividualFormValues } from '../constants/interface.constants';

export const getIndividualInitialvalues = (
  customer: USER_PROFILE
): IndividualFormValues => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    nationality,
    placeOfBirth,
    residenceCountry,
    details,
    gender,
    address,
    financialDetails,
    Wallet,
    Document,
    profilePicture,
  } = customer;

  const wallets = mapWallets(Wallet);
  const whitelistedWallets = wallets.filter(
    (wallet) => wallet.walletType === WALLET_TYPE.WHITELISTED
  );
  const vaultWallets = wallets.filter(
    (wallet) => wallet.walletType === WALLET_TYPE.VAULT
  );

  return {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    gender: gender || '',
    phoneNumber: phoneNumber || '',
    dateOfBirth: dateOfBirth || '',
    nationality: nationality || '',
    placeOfBirth: placeOfBirth || '',
    residenceCountry: residenceCountry || '',
    profilePicture: profilePicture || '',
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
