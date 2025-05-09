import {
  ACCOUNT_STATUS_OPTIONS,
  ASSETS_UNDER_CUSTODY,
  COUNTRY_OPTIONS,
  COUNTRY_REGULATED_AS_OPTIONS,
  KYC_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  ORGANIZATION_MEMBER_TYPE_OPTIONS,
  PERMISSIONS_OPTIONS,
} from '@/constants/form.constant';
import { FormFields, FormFieldsSection } from '@/types';
import { addressFormFields, idFormFields } from '../../constants/form-fields';

const createdByFormFields: FormFields[] = [
  {
    name: 'createdByFirstName',
    label: 'First Name',
    placeholder: 'Enter your first name',
    required: true,
    type: 'text',
  },
  {
    name: 'createdByLastName',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    required: true,
    type: 'text',
  },
  {
    name: 'createdByEmail',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    type: 'email',
  },
  {
    name: 'createdByUserId',
    label: 'User Id',
    placeholder: 'mb1232',
    required: true,
    type: 'text',
  },
];

const organizationDetailsFormFields: FormFields[] = [
  {
    name: 'organizationName',
    label: 'Name',
    placeholder: 'Enter organization name',
    required: true,
    type: 'text',
  },
  {
    name: 'countryOfRegistration',
    label: 'Country of Registration',
    placeholder: 'Select country of registration',
    required: true,
    as: 'comboBox',
    options: COUNTRY_OPTIONS,
  },
  {
    name: 'organizationEmail',
    label: 'Email',
    placeholder: 'Enter organization email',
    required: true,
    type: 'email',
  },
  {
    name: 'registrationNumber',
    label: 'Registration Number',
    placeholder: 'Enter registration number',
    required: true,
    type: 'number',
  },

  {
    name: 'phoneNumber',
    label: 'Phone Number',
    placeholder: '+911234567890',
    required: true,
    type: 'tel',
  },
  {
    name: 'registrationDate',
    label: 'Registration Date',
    placeholder: 'Enter registration date',
    required: true,
    as: 'date',
  },
  {
    name: 'countryOfRegulation',
    label: 'Country of Regulation',
    placeholder: 'Select country of regulation',
    required: true,
    as: 'comboBox',
    options: COUNTRY_OPTIONS,
  },
  {
    name: 'regulator',
    label: 'Regulator',
    placeholder: 'Enter regulator',
    required: true,
    type: 'text',
  },
  {
    name: 'companyRegulateAs',
    label: 'Company Regulate As',
    placeholder: 'Enter company regulate as',
    required: true,
    as: 'comboBox',
    options: COUNTRY_REGULATED_AS_OPTIONS,
  },
  {
    name: 'companyRegulateAsDetails',
    label: 'Company Regulate As Details',
    placeholder: 'Enter company regulate as details',
    required: true,
    type: 'text',
  },
  {
    name: 'natureOfActivity',
    label: 'Nature of Activity',
    placeholder: 'Enter nature of activity',
    required: true,
    type: 'text',
  },
  {
    name: 'regulationDetails',
    label: 'Other Regulation Details',
    placeholder: 'Enter other regulation details',
    required: true,
    type: 'text',
  },
  {
    name: 'taxRegistrationNumber',
    label: 'Tax Registration Number',
    placeholder: 'Enter tax registration number',
    required: true,
    type: 'number',
  },
  {
    name: 'taxRegistrationCountry',
    label: 'Country of Tax Registration',
    placeholder: 'Select country of tax registration',
    required: true,
    as: 'comboBox',
    options: COUNTRY_OPTIONS,
  },
  {
    name: 'numberOfAssetUnderCustody',
    label: 'Number of Assets Under Custody',
    placeholder: 'Enter number of assets under custody',
    required: true,
    type: 'number',
  },
  {
    name: 'valueOfAssetsUnderCustody',
    label: 'Value of Assets Under Custody',
    placeholder: 'Select value of assets under custody',
    required: true,
    as: 'comboBox',
    options: ASSETS_UNDER_CUSTODY,
  },
  {
    name: 'kycStatus',
    label: 'KYC Status',
    as: 'comboBox',
    required: true,
    options: KYC_STATUS_OPTIONS,
  },
  {
    name: 'accountStatus',
    label: 'Account Status',
    as: 'comboBox',
    required: true,
    options: ACCOUNT_STATUS_OPTIONS,
  },
];

const organizationDocumentsFields: FormFields[] = [
  {
    name: 'proofOfAddress',
    label: 'Proof Of Address',
    as: 'file',
    required: true,
    placeholder: 'https://example.com/proof-of-address.png',
  },
  {
    name: 'proofOfRegistration',
    label: 'Proof Of Registration',
    as: 'file',
    required: true,
    placeholder: 'https://example.com/proof-of-registration.png',
  },
  {
    name: 'organizationConstitution',
    label: 'Organization Constitution',
    as: 'file',
    required: true,
    placeholder: 'https://example.com/organization-constitution.png',
  },
  {
    name: 'listOfDirectors',
    label: 'List Of Directors',
    as: 'file',
    required: true,
    placeholder: 'https://example.com/list-of-directors.png',
  },
  {
    name: 'shareholdersStructure',
    label: 'Shareholders Structure',
    as: 'file',
    required: true,
    placeholder: 'https://example.com/shareholders-structure.png',
  },
];

export const organizationMembersFields: FormFields[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your last name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    name: 'permission',
    label: 'Permission',
    as: 'comboBox',
    required: true,
    options: PERMISSIONS_OPTIONS,
  },
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'CEO',
  },
  {
    name: 'percentageShareInCompany',
    label: 'Percentage Share In Company',
    type: 'number',
    required: true,
    placeholder: '25%',
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    placeholder: '+353 123 456 789',
  },

  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    as: 'date',
    required: true,
    placeholder: 'DD/MM/YYYY',
  },
  {
    name: 'nationality',
    label: 'Nationality',
    as: 'comboBox',
    required: true,
    options: NATIONALITY_OPTIONS,
    placeholder: 'Select a nationality',
  },
  {
    name: 'placeOfBirth',
    label: 'Place of Birth',
    as: 'comboBox',
    required: true,
    placeholder: 'Select place of birth',
    options: COUNTRY_OPTIONS,
  },
  ,
  {
    name: 'primaryUserType',
    label: 'Primary User Type',
    as: 'comboBox',
    required: true,
    options: ORGANIZATION_MEMBER_TYPE_OPTIONS,
  },
  {
    name: 'otherTypes',
    label: 'Other Types',
    placeholder: 'Enter other types',
    type: 'text',
    multiSelect: true,
    options: ORGANIZATION_MEMBER_TYPE_OPTIONS,
  },

  {
    name: 'proofOfAddress',
    label: 'Proof Of Address',
    as: 'file',
    required: true,
    placeholder: 'https://example.com/proof-of-address.png',
  },
  {
    name: 'ids', // This will be an array of ID objects
    label: 'Identification Documents',
    type: 'array',
    arrayFields: idFormFields, // Use your existing ID fields
  },
];

export const subFormFieldsOrganization: FormFieldsSection[] = [
  {
    title: 'Account Created By',
    fields: createdByFormFields,
  },
  {
    title: 'Organization Details',
    fields: organizationDetailsFormFields,
  },

  {
    title: 'Organization Address',
    fields: addressFormFields,
  },

  {
    title: 'Orgnization Documents',
    fields: organizationDocumentsFields,
  },
];
