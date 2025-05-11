'use client';

import { getUserProfile } from '@/services/auth.api';
import { USER_PROFILE } from '@/types';
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
      id: 'cmadzq1ri000d497kgi0skbyd',
      email: 'ind@gmail.com',
      isEmailVerified: true,
      firstName: 'Bhaskar',
      lastName: 'Sharma',
      phoneNumber: '+918218262354',
      phoneCountryCode: '+91',
      role: 'INDIVIDUAL_CUSTOMER',
      isPhoneNumberVerified: true,
      gender: 'MALE',
      nationality: 'Afghan',
      placeOfBirth: 'Afghanistan',
      title: null,
      isResidenceInSameCountry: false,
      residenceCountry: 'Afghanistan',
      dateOfBirth: '2007-04-27T00:00:00.000Z',
      hasLoginAccess: true,
      isAccountApproved: true,
      userTypes: [],
      primaryUserType: null,
      permission: 'ADMIN',
      requestedById: null,
      organizationId: null,
      addressId: 'cmadzsb24000k497ks21eff62',
      financialDetailsId: 'cmadzupgn000p497kl18hb0uk',
      detailsId: 'cmadzsbe1000l497kdytp37ba',
      provider: 'EMAIL',
      createdAt: '2025-05-07T13:44:55.663Z',
      updatedAt: '2025-05-07T13:50:37.707Z',
      mustChangePassword: false,
      isMFAEnabled: false,
      profilePicture: null,
      currency: 'USD',
      address: {
        id: 'cmadzsb24000k497ks21eff62',
        userId: 'cmadzq1ri000d497kgi0skbyd',
        line1: '29 South Green Old Court',
        line2: 'Sint proident totam',
        city: 'Ashkāsham',
        state: 'Badakhshan',
        zipCode: '46978',
        country: 'Afghanistan',
        addressType: 'HOME',
        kycAddressDetails: {
          address_id: 'dcbb0b610dccb54b1d09c8c7f65cf77f3c92',
        },
        createdAt: '2025-05-07T13:46:41.020Z',
        updatedAt: '2025-05-07T13:50:33.949Z',
      },
      details: {
        id: 'cmadzsbe1000l497kdytp37ba',
        userId: 'cmadzq1ri000d497kgi0skbyd',
        organizationId: null,
        companySize: null,
        userOccupation: null,
        estimatedFundsToTransfer: null,
        intendedPlatformUsagePurpose: null,
        googleDriveRootFolderId: null,
        kycStatus: 'APPROVED',
        percentageShareInCompany: null,
        kycDetails: {
          record_id: '844598000002832002',
          applicant_id: '95aaed380ad205416f0af5b7bbc79acdbe95',
          verification_id: '91f27bd8051a254ef10952c7756d2f3c27a2',
        },
        accountStatus: 'ACTIVE',
        createdAt: '2025-05-07T13:46:41.449Z',
        updatedAt: '2025-05-07T13:50:37.304Z',
        isFileUploadedToGoogleDrive: false,
        kycResult: null,
      },
      organization: {
        adminCount: 0,
        members: [],
      },
      financialDetails: {
        id: 'cmadzupgn000p497kl18hb0uk',
        sourceOfIncome: ['SALARY'],
        annualIncome: 'ANNUAL_INCOME_GROUP_1',
        originOfFunds: 'Orging is de',
        valueOfAssetsUnderCustody: 'Less than 1,000,000 EUR',
        numberOfAssetsUnderCustody: 1,
        organizationId: null,
        taxRegistrationNumber: 'Ouijnkkm',
        taxRegistrationCountry: 'Afghanistan',
        userId: 'cmadzq1ri000d497kgi0skbyd',
        createdAt: '2025-05-07T13:48:32.999Z',
        updatedAt: '2025-05-07T13:48:32.999Z',
      },
      tokens: [
        {
          id: 'cmae130ue001j497kk8kzx2xh',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFkenExcmkwMDBkNDk3a2dpMHNrYnlkIiwiaWF0IjoxNzQ2NjI3NzgwLCJleHAiOjE3NDY2Mjg2ODAsInR5cGUiOiJBQ0NFU1MifQ.Ro32IZ9o3biSUyCV-KpKycAnmL3WHq29Bt66QFxfohw',
          type: 'ACCESS',
          expires: '2025-05-07T14:38:00.247Z',
          blacklisted: false,
          createdAt: '2025-05-07T14:23:00.614Z',
          userId: 'cmadzq1ri000d497kgi0skbyd',
        },
        {
          id: 'cmae130w8001n497ktbgboqr7',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFkenExcmkwMDBkNDk3a2dpMHNrYnlkIiwiaWF0IjoxNzQ2NjI3NzgwLCJleHAiOjE3NDY2Mjg2ODAsInR5cGUiOiJBQ0NFU1MifQ.Ro32IZ9o3biSUyCV-KpKycAnmL3WHq29Bt66QFxfohw',
          type: 'ACCESS',
          expires: '2025-05-07T14:38:00.297Z',
          blacklisted: false,
          createdAt: '2025-05-07T14:23:00.680Z',
          userId: 'cmadzq1ri000d497kgi0skbyd',
        },
        {
          id: 'cmae131gb001r497k0ddxeb8u',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFkenExcmkwMDBkNDk3a2dpMHNrYnlkIiwiaWF0IjoxNzQ2NjI3NzgwLCJleHAiOjE3NDY2Mjg2ODAsInR5cGUiOiJBQ0NFU1MifQ.Ro32IZ9o3biSUyCV-KpKycAnmL3WHq29Bt66QFxfohw',
          type: 'ACCESS',
          expires: '2025-05-07T14:38:00.991Z',
          blacklisted: false,
          createdAt: '2025-05-07T14:23:01.404Z',
          userId: 'cmadzq1ri000d497kgi0skbyd',
        },
        {
          id: 'cmadzq2td000h497kg5njnavd',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFkenExcmkwMDBkNDk3a2dpMHNrYnlkIiwiaWF0IjoxNzQ2NjI1NDk2LCJleHAiOjE3NDkyMTc0OTYsInR5cGUiOiJSRUZSRVNIIn0.O1ukkybtpNHdACEq5uhOBGbDcNrEnNz6soag3NvLSEw',
          type: 'REFRESH',
          expires: '2025-06-06T13:44:56.045Z',
          blacklisted: false,
          createdAt: '2025-05-07T13:44:57.025Z',
          userId: 'cmadzq1ri000d497kgi0skbyd',
        },
        {
          id: 'cmae130vz001l497kmhyr8flz',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFkenExcmkwMDBkNDk3a2dpMHNrYnlkIiwiaWF0IjoxNzQ2NjI3NzgwLCJleHAiOjE3NDY2Mjg2ODAsInR5cGUiOiJBQ0NFU1MifQ.Ro32IZ9o3biSUyCV-KpKycAnmL3WHq29Bt66QFxfohw',
          type: 'ACCESS',
          expires: '2025-05-07T14:38:00.289Z',
          blacklisted: false,
          createdAt: '2025-05-07T14:23:00.672Z',
          userId: 'cmadzq1ri000d497kgi0skbyd',
        },
        {
          id: 'cmae130yj001p497kurh768fk',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFkenExcmkwMDBkNDk3a2dpMHNrYnlkIiwiaWF0IjoxNzQ2NjI3NzgwLCJleHAiOjE3NDY2Mjg2ODAsInR5cGUiOiJBQ0NFU1MifQ.Ro32IZ9o3biSUyCV-KpKycAnmL3WHq29Bt66QFxfohw',
          type: 'ACCESS',
          expires: '2025-05-07T14:38:00.364Z',
          blacklisted: false,
          createdAt: '2025-05-07T14:23:00.763Z',
          userId: 'cmadzq1ri000d497kgi0skbyd',
        },
      ],
      Document: [
        {
          id: 'cmadzscms000n497kzwzp5dgb',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          type: 'ADDRESS_PROOF',
          expiryDate: null,
          documentId: null,
          documentVersion: 1,
          countryOfIssuance: null,
          documentUrl:
            'https://fortuna-bucket-123.s3.eu-north-1.amazonaws.com/1746625599230-images (2).png',
          kycDocumentDetails: {
            document_id: '4baf81e805e57541d40bfc57bae65ea8e9cb',
          },
          createdAt: '2025-05-07T13:46:43.060Z',
          updatedAt: '2025-05-07T13:50:33.355Z',
        },
        {
          id: 'cmadzuq34000r497khsto8y18',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          type: 'INCOME_PROOF',
          expiryDate: null,
          documentId: null,
          documentVersion: 1,
          countryOfIssuance: null,
          documentUrl:
            'https://fortuna-bucket-123.s3.eu-north-1.amazonaws.com/1746625711489-images (2).png',
          kycDocumentDetails: {
            document_id: 'a72a11b50028e54de30a992756c806fa167d',
          },
          createdAt: '2025-05-07T13:48:33.809Z',
          updatedAt: '2025-05-07T13:50:31.924Z',
        },
        {
          id: 'cmadzvlq8000v497klh639g6u',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          type: 'PASSPORT_FRONT',
          expiryDate: '2025-05-08T00:00:00.000Z',
          documentId: '612',
          documentVersion: 1,
          countryOfIssuance: 'Afghanistan',
          documentUrl:
            'https://fortuna-bucket-123.s3.eu-north-1.amazonaws.com/1746625753752-images (2).png',
          kycDocumentDetails: {
            document_id: 'baca14cc0ddb554f750b1fb70aa9895a3bdc',
          },
          createdAt: '2025-05-07T13:49:14.816Z',
          updatedAt: '2025-05-07T13:50:28.773Z',
        },
        {
          id: 'cmadzvlva000y497ktn8diij8',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          type: 'PASSPORT_FRONT',
          expiryDate: '2025-05-08T00:00:00.000Z',
          documentId: '317',
          documentVersion: 3,
          countryOfIssuance: 'British Indian Ocean Territory',
          documentUrl: null,
          kycDocumentDetails: null,
          createdAt: '2025-05-07T13:49:14.816Z',
          updatedAt: '2025-05-07T13:49:14.816Z',
        },
        {
          id: 'cmadzvlva000z497k4c3filxt',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          type: 'PASSPORT_FRONT',
          expiryDate: '2025-05-08T00:00:00.000Z',
          documentId: '832',
          documentVersion: 2,
          countryOfIssuance: 'Afghanistan',
          documentUrl: null,
          kycDocumentDetails: null,
          createdAt: '2025-05-07T13:49:14.816Z',
          updatedAt: '2025-05-07T13:49:14.816Z',
        },
        {
          id: 'cmadzvzfc0011497k1mtnd9sm',
          userId: 'cmadzq1ri000d497kgi0skbyd',
          organizationId: null,
          type: 'KYC_SELFIE',
          expiryDate: null,
          documentId: null,
          documentVersion: 1,
          countryOfIssuance: null,
          documentUrl:
            'https://fortuna-bucket-123.s3.eu-north-1.amazonaws.com/1746625776952-captured-image.png',
          kycDocumentDetails: {
            document_id: 'df131a5d0f6e65477e08a0b78c80340fd624',
          },
          createdAt: '2025-05-07T13:49:32.568Z',
          updatedAt: '2025-05-07T13:50:30.487Z',
        },
      ],
      Meta: [
        {
          id: 'cmadzqwch000j497kqykf8f4c',
          data: {
            ADD_DETAILS: true,
            CREATE_ACCOUNT: true,
            VERIFY_IDENTITY: true,
            IS_ABOVE_EIGHTEEN: true,
          },
          userId: 'cmadzq1ri000d497kgi0skbyd',
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
  USER_PROFILE, //TODO: USER_PROFILE to USER_PROFILE[]
  void,
  { rejectValue: string }
>(
  'individualCustomer/fetchIndividualCustomerThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProfile(); //TODO: change api
      return response?.data as USER_PROFILE; //TODO: USER_PROFILE to USER_PROFILE[]
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
        state.customers = [action.payload]; //TODO: actual data
        state.loading = false;
      })
      .addCase(fetchIndividualCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch evmChains';
      });
  },
});

export default individualCustomerSlice.reducer;
