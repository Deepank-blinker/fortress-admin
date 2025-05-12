import { API_ROUTES } from '@/constants/api.routes';
import { PERMISSIONS } from '@/constants/interface.constant';
import http from '@/services/http';
import {
  ADDRESS_DETAILS,
  DETAILS,
  DOCUMENT_DETAILS,
  FINANCIAL_DETAILS,
  ORGANIZATION,
  Response,
  USER,
  USER_PROFILE,
  WALLET,
} from '@/types';

export interface updateUserPayload {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  nationality?: string;
  isResidenceInSameCountry?: true | false | null;
  residenceCountry?: string;
  role?: string; //change to role
  permission?: PERMISSIONS;
}

export interface updateAddressPayload {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  addressType?: string;
  ADDRESS_PROOF?: File;
}
export interface updateAddressResponse {
  address: ADDRESS_DETAILS;
  document: DOCUMENT_DETAILS;
}

export const getAccessToken = async (): Promise<string> => {
  const response = await http.get(API_ROUTES.token.getAccessToken.url);
  return response.data;
};

export interface OrganizationBusinessActivityApiResponse {
  organization: ORGANIZATION;
  wallets: WALLET[];
  financialDetails: FINANCIAL_DETAILS;
}

export interface OrganizationMembersDetailsApiResponse {
  user: USER;
  address: ADDRESS_DETAILS;
  financialDetails: FINANCIAL_DETAILS;
  details: DETAILS;
  uploadedDocuments: DOCUMENT_DETAILS[];
}

// forgot password
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResetPayload {
  token: string;
  password: string;
}

// invite user
export interface InviteUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  permission: string;
}

export const getAllIndividualCustomers = async (): Promise<
  Response<USER[]>
> => {
  const response = await http.get(
    API_ROUTES.user.getAllIndividualCustomers.url
  );
  return response.data;
};

export const getUserById = async (
  id: string
): Promise<Response<USER_PROFILE>> => {
  const response = await http.get(`${API_ROUTES.user.getUserById.url}/${id}`);
  return response.data.data;
};
