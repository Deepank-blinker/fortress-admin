import {
  DOCUMENTS_TYPE,
  ORGANIZATION_MEMBER_TYPE,
} from '@/constants/interface.constant';
import { ORGANIZATION, USER_PROFILE, WALLET_TYPE } from '@/types';
import { mapDocumentsToIds, mapWallets } from '../../utils';
import {
  OrganizationFormValues,
  OrganizationMemberFormValues,
} from '../constants/interface.constants';

export const getInitialValuesOrganization = (
  organization: ORGANIZATION
): OrganizationFormValues | null => {
  if (!organization) return {} as OrganizationFormValues;
  const { createdBy, address, financialDetails, details, members, Document } =
    organization;
  const wallets = mapWallets(organization.Wallet);
  const whitelistedWallets = wallets.filter(
    (wallet) => wallet.walletType === WALLET_TYPE.WHITELISTED
  );
  const vaultWallets = wallets.filter(
    (wallet) => wallet.walletType === WALLET_TYPE.VAULT
  );
  const authorizedUsers =
    members?.filter(
      (member) =>
        member.primaryUserType === ORGANIZATION_MEMBER_TYPE.AUTHORISED_PERSON
    ) ?? [];
  const beneficiaryUsers =
    members?.filter(
      (member) =>
        member.primaryUserType === ORGANIZATION_MEMBER_TYPE.BENEFICIARY
    ) ?? [];
  const memberUsers =
    members?.filter(
      (member) => member.primaryUserType === ORGANIZATION_MEMBER_TYPE.MEMBER
    ) ?? [];
  return {
    // created by
    createdByFirstName: createdBy?.firstName || '',
    createdByLastName: createdBy?.lastName || '',
    createdByEmail: createdBy?.email || '',
    createdByUserId: createdBy?.id || '',

    organizationName: organization?.name,
    organizationEmail: organization?.email,
    phoneNumber: organization?.phoneNumber,

    registrationNumber: organization?.registrationNumber || '',
    registrationDate: organization?.registrationDate || '',
    countryOfRegistration: organization?.countryOfRegistration || '',
    // regulation
    countryOfRegulation: organization?.countryOfRegulation || '',
    regulator: organization?.regulator || '',
    companyRegulateAs: organization?.companyRegulateAs || '',
    companyRegulateAsDetails: organization?.companyRegulateAsDetails || '',
    otherRegulationDetails: organization?.regulationDetails || '',

    // financial details
    natureOfActivity: organization?.natureOfActivity,
    taxRegistrationNumber: financialDetails?.taxRegistrationNumber,
    taxRegistrationCountry: financialDetails?.taxRegistrationCountry,
    valueOfAssetsUnderCustody: financialDetails?.valueOfAssetsUnderCustody,
    numberOfAssetsUnderCustody: wallets?.length as number,

    // address
    ...address,

    //   status
    accountStatus: details?.accountStatus || '',
    kycStatus: details?.kycStatus || '',

    // documnets
    proofOfAddress:
      Document?.find(
        (doc) => doc.type === DOCUMENTS_TYPE.ORGANIZATION_ADDRESS_PROOF
      )?.documentUrl || '',
    proofOfRegistration:
      Document?.find(
        (doc) => doc.type === DOCUMENTS_TYPE.ORGANIZATION_REGISTRATION_PROOF
      )?.documentUrl || '',
    organizationConstitution:
      Document?.find(
        (doc) => doc.type === DOCUMENTS_TYPE.ORGANIZATION_CONSTITUTION
      )?.documentUrl || '',
    listOfDirectors:
      Document?.find(
        (doc) => doc.type === DOCUMENTS_TYPE.ORGANIZATION_DIRECTOR_LIST
      )?.documentUrl || '',
    shareholdersStructure:
      Document?.find(
        (doc) => doc.type === DOCUMENTS_TYPE.SHAREHOLDERS_STRUCTURE
      )?.documentUrl || '',

    // wallets
    whitelistedWallets,
    vaultWallets,

    // authorized users
    authorizedPersons: mapMembers(authorizedUsers),
    beneficiaries: mapMembers(beneficiaryUsers),
    members: mapMembers(memberUsers),
  };
};

const mapMembers = (
  members: USER_PROFILE[]
): OrganizationMemberFormValues[] => {
  const primaryUserType = members?.[0]?.primaryUserType;

  return members?.map((member) => {
    return {
      ...(primaryUserType === ORGANIZATION_MEMBER_TYPE.AUTHORISED_PERSON
        ? { title: member?.title }
        : {}),
      ...(primaryUserType === ORGANIZATION_MEMBER_TYPE.BENEFICIARY
        ? {
            percentageShareInCompany: member?.financialDetails
              ?.percentageShareInCompany as number,
          }
        : {}),
      firstName: member?.firstName || '',
      lastName: member?.lastName || '',
      username: member?.username || '',
      email: member?.email || '',
      phoneNumber: member?.phoneNumber || '',
      gender: member?.gender || '',
      dateOfBirth: member.dateOfBirth || '',
      placeOfBirth: member?.placeOfBirth || '',
      nationality: member?.nationality || '',
      primaryUserType: primaryUserType || '',
      otherTypes: (member.userTypes || []) as string[],
      line1: member?.address?.line1 || '',
      line2: member?.address?.line2 || '',
      city: member?.address?.city || '',
      state: member?.address?.state || '',
      zipCode: member?.address?.zipCode || '',
      country: member?.address?.country || '',
      permission: member?.permission || '',
      proofOfAddress:
        member.Document?.find(
          (doc) => doc.type === DOCUMENTS_TYPE.ADDRESS_PROOF
        )?.documentUrl || '',

      ids: mapDocumentsToIds(member.Document || []),
    };
  });
};
