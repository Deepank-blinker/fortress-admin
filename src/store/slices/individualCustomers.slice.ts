'use client';

import { ACCOUNT_STATUS, ORGANIZATION_MEMBER_TYPE, PERMISSIONS, ROLES } from '@/constants/interface.constant';
import { getAllIndividualCustomers } from '@/services/user.api';
import { KYC_STATUS, USER_PROFILE } from '@/types';
import { getErrorMessage } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
interface IndividualCustomerState {
  customers: USER_PROFILE[];
  loading: boolean;
  error: string | null;
}

const initialState: IndividualCustomerState = {
  customers: [
    {
      id: '',
      email: '',
      isEmailVerified: true,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      phoneCountryCode: '',
      role: ROLES.INDIVIDUAL_CUSTOMER,
      isPhoneNumberVerified: true,
      gender: '',
      nationality: '',
      placeOfBirth: '',
      title: '',
      isResidenceInSameCountry: false,
      residenceCountry: '',
      dateOfBirth: '',
      hasLoginAccess: true,
      isAccountApproved: true,
      userTypes: [],
      primaryUserType: ORGANIZATION_MEMBER_TYPE.AUTHORISED_PERSON,
      permission: PERMISSIONS.OPERATOR,
      requestedById: '',
      organizationId: '',
      addressId: '',
      financialDetailsId: '',
      detailsId: '',
      provider: '',
      createdAt: '',
      updatedAt: '',
      mustChangePassword: false,
      isMFAEnabled: false,
      profilePicture: '',
      currency: '',
      address: {
        id: '',
        userId: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        kycAddressDetails: {
          address_id: '',
        },
      },
      details: {
        id: '',
        userId: '',
        organizationId: null,
        companySize: '',
        userOccupation: '',
        estimatedFundsToTransfer: '',
        intendedPlatformUsagePurpose: '',
        googleDriveRootFolderId: '',
        kycStatus: KYC_STATUS.PENDING,
        percentageShareInCompany: 0,
        kycDetails: {
  
          applicant_id: '',
          verification_id: '',
        },
        accountStatus: ACCOUNT_STATUS.PENDING,
        createdAt: '',
        updatedAt: '',
        isFileUploadedToGoogleDrive: false,

      },
      organization: {
        adminCount: 0,
        members: [],
      },
      financialDetails: {
        id: '',
        sourceOfIncome: [],
        annualIncome: '',
        originOfFunds: '',
        valueOfAssetsUnderCustody: '',
        numberOfAssetsUnderCustody: 1,
        organizationId: null,
        taxRegistrationNumber: '',
        taxRegistrationCountry: '',
        userId: '',
        createdAt: '',
        updatedAt: '',
      },
      Document: [
        {
          id: '',
          userId: '',
          organizationId: null,
          type: '',
          expiryDate: null,
          documentId: null,
          documentVersion: 1,
          countryOfIssuance: null,
          documentUrl:
            '',
          kycDocumentDetails: {
            document_id: '',
          },
          createdAt: '',
          updatedAt: '',
        },
      ],
      Meta: [
        {
          id: '',
          data: {
            ADD_DETAILS: true,
            CREATE_ACCOUNT: true,
            VERIFY_IDENTITY: true,
            IS_ABOVE_EIGHTEEN: true,
          },
          userId: '',
          organizationId: null,
          type: 'COMPLETE_ACCOUNT_SETUP',
          createdAt: '2025-05-07T13:45:35.296Z',
          updatedAt: '2025-05-07T13:49:33.966Z',
        },
      ],
      Wallet: [
        {
          id: 'cmadzuqvf000t497kgikz44aj',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          walletName: 'BTC DEB',
          tokenId: 'cma4yd3i9000m494kcvywpt30',
          isNativeToken: true,
          chain: 'UTXO',
          evmChainId: null,
          walletType: 'WHITELISTED',
          status: 'PENDING',
          vaultId: null,
          assetId: null,
          riskScore: 1,
          pdfReportUrl:
            'https://reserveapi.silencatech.com/response/userdata/294E66B78CA07A9/renderer/pdf/responsedata/681B650BB06AC911498340:182EDC32ADCDD16',
          isWalletApproved: true,
          requestedById: 'cmadzq1ri000d497kgi0skbyd',
          whitelistedOn: null,
          createdAt: '2025-05-07T13:48:34.827Z',
          updatedAt: '2025-05-07T13:50:25.258Z',
          accountId: null,
        },
      ],
      stats: {
        isProfileComplete: true,
        isOnboardingComplete: true,
        isKycApproved: true,
        isMetaCompleted: true,
      },
    },
  ],
  loading: false,
  error: null,
};

// **🔹 Async Thunks for API Calls**
export const fetchIndividualCustomerThunk = createAsyncThunk<
  USER_PROFILE[],
  void,
  { rejectValue: string }
>(
  'individualCustomer/fetchIndividualCustomerThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllIndividualCustomers(); 
      return response?.data; 
    } catch (error) {
      return rejectWithValue(getErrorMessage(error as Error) as string);
    }
  }
);

// **🔹 Redux Slice**
const individualCustomerSlice = createSlice({
  name: 'individualCustomer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tokens
      .addCase(fetchIndividualCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndividualCustomerThunk.fulfilled, (state, action) => {
        state.customers = action.payload; 
        state.loading = false;
      })
      .addCase(fetchIndividualCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch evmChains';
      });
  },
});

export default individualCustomerSlice.reducer;
