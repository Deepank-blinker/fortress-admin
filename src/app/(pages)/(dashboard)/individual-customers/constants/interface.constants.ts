import {
  AddressFormValues,
  IdFormValues,
  WalletFormvalues,
} from '../../constants/interface.constants';

export interface IndividualDocumentFormValues {
  kycSelfie: string;
  proofOfIncome: string;
  proofOfAddress: string;
}
export interface IndividualFormValues extends AddressFormValues {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  nationality: string;
  placeOfBirth: string;
  residenceCountry: string;
  profilePicture: string;

  accountStatus: string;
  kycStatus: string;

  //   financialDetails
  sourceOfIncome: string;
  annualIncome: string;
  originOfFunds: string;
  valueOfAssetsUnderCustody: string;
  numberOfAssetsUnderCustody: number;
  taxRegistrationNumber: string;
  taxRegistrationCountry: string;

  //   documents
  proofOfAddress: string;
  proofOfIncome: string;
  kycSelfie: string;

  ids: IdFormValues[];
  whitelistedWallets: WalletFormvalues[];
  vaultWallets: WalletFormvalues[];
}
