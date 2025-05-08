import {
  DOCUMENTS_TYPE,
  ORGANIZATION_MEMBER_TYPE,
} from '@/constants/interface.constant';
import { ORGANIZATION, USER_PROFILE } from '@/types';
import { mapDocumentsToIds, mapWallets } from '../../utils';
import {
  OrganizationFormValues,
  OrganizationMemberFormValues,
} from '../constants/interface.constansts';
import { AddressFormValues } from '../../constants/interface.constants';

export const getInitialValuesOrganization = (
  organization: ORGANIZATION
): OrganizationFormValues => {
  const wallets = mapWallets(organization.Wallet);
  const { createdBy, address, financialDetails, details, members, Document } =
    organization;

  const authprizedUsers =
    members?.filter(
      (member) =>
        member.primaryUserType === ORGANIZATION_MEMBER_TYPE.AUTHORISED_PERSON ||
        member?.userTypes?.includes(ORGANIZATION_MEMBER_TYPE.AUTHORISED_PERSON)
    ) ?? [];
  const beneficiaryUsers =
    members?.filter(
      (member) =>
        member.primaryUserType === ORGANIZATION_MEMBER_TYPE.BENEFICIARY ||
        member?.userTypes?.includes(ORGANIZATION_MEMBER_TYPE.BENEFICIARY)
    ) ?? [];
  const memberUsers =
    members?.filter(
      (member) =>
        member.primaryUserType === ORGANIZATION_MEMBER_TYPE.MEMBER ||
        member?.userTypes?.includes(ORGANIZATION_MEMBER_TYPE.MEMBER)
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
    wallets,

    // authorized users
    authorizedPersons: mapMembers(authprizedUsers),
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
      email: member?.email || '',
      phoneNumber: member?.phoneNumber || '',
      gender: member?.gender || '',
      dateOfBirth: member.dateOfBirth || '',
      placeOfBirth: member?.placeOfBirth || '',
      nationality: member?.nationality || '',
      primaryUserType: primaryUserType || '',
      otherTypes: (member.userTypes || []) as string[],
      address: member?.address as AddressFormValues,
      permission: member?.permission || '',
      proofOfAddress:
        member.Document?.find(
          (doc) => doc.type === DOCUMENTS_TYPE.ADDRESS_PROOF
        )?.documentUrl || '',

      ids: mapDocumentsToIds(member.Document || []),
    };
  });
};
