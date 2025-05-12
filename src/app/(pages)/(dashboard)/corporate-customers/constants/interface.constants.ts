import {
  AddressFormValues,
  IdFormValues,
  WalletFormValues,
} from '../../constants/interface.constants';

export interface OrganizationMemberFormValues extends AddressFormValues {
  title?: string;
  percentageShareInCompany?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  primaryUserType: string;
  otherTypes: string[];
  permission: string;
  proofOfAddress: string;
  ids: IdFormValues[];
}
export interface OrganizationFormValues extends AddressFormValues {
  createdByFirstName: string;
  createdByLastName: string;
  createdByEmail: string;
  createdByUserId: string;

  organizationName: string;
  organizationEmail: string;
  phoneNumber: string;

  registrationNumber: string;
  registrationDate: string;
  countryOfRegistration: string;
  // regulation
  countryOfRegulation: string;
  regulator: string;
  companyRegulateAs: string;
  companyRegulateAsDetails: string;
  otherRegulationDetails: string;

  // financial details
  natureOfActivity: string;
  taxRegistrationNumber: string;
  taxRegistrationCountry: string;
  valueOfAssetsUnderCustody: string;
  numberOfAssetsUnderCustody: number;

  //   status
  accountStatus: string;
  kycStatus: string;

  // documnets
  proofOfAddress: string;
  proofOfRegistration: string;
  organizationConstitution: string;
  listOfDirectors: string;
  shareholdersStructure: string;

  // wallets
  whitelistedWallets: WalletFormValues[];
  vaultWallets: WalletFormValues[];

  // authorized users
  authorizedPersons: OrganizationMemberFormValues[];
  beneficiaries: OrganizationMemberFormValues[];
  members: OrganizationMemberFormValues[];
}
