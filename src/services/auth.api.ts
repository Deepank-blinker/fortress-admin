import { Response, USER, USER_PROFILE } from '@/types';

import { API_ROUTES } from '@/constants/api.routes';
import { Tokens } from '@/constants/interface.constant';
import http from '@/services/http';

export interface SignupUserWithEmailPayload {
  email: string;
  password: string;
  role?: string;
}
export interface signupUserWithEmailResponseData extends USER {
  tokens: Tokens;
}

export interface VerifyEmailOTPPayload {
  email: string;
  otp: string;
}

export const verifyEmailOTP = async (
  data: VerifyEmailOTPPayload
): Promise<Response> => {
  const response = await http.post(API_ROUTES.auth.verifyEmailOtp.url, data);
  return response.data;
};

export interface sendEmailOtpPayload {
  email: string;
  isSignup?: boolean;
}

export const sendEmailOtp = async (
  data: sendEmailOtpPayload
): Promise<Response> => {
  const response = await http.post(API_ROUTES.auth.sendEmailOtp.url, data);
  return response.data;
};

export interface sendMobileOtpPayload {
  phone: string;
  phoneCountryCode?: string;
}

export const sendMobileOtp = async (
  data: sendMobileOtpPayload
): Promise<Response> => {
  const response = await http.post(API_ROUTES.auth.sendMobileOtp.url, data);
  return response.data;
};
export interface sendMobileOtpNoAuthPayload {
  phone: string;
}

export const sendMobileOtpNoAuth = async (
  data: sendMobileOtpNoAuthPayload
): Promise<Response> => {
  const response = await http.post(
    API_ROUTES.auth.sendMobileOtpNoAuth.url,
    data
  );
  return response.data;
};

export interface verifyMobileOtpPayload {
  phone: string;
  otp: string;
}

export const verifyMobileOtp = async (
  data: verifyMobileOtpPayload
): Promise<Response> => {
  const response = await http.post(API_ROUTES.auth.verifyMobileOtp.url, data);
  return response.data;
};

export interface SignupUserWithMobilePayload {
  mobile: string;
}

export interface loginTypePasswordPayload {
  emailOrUsername: string;
  password: string;
}
export interface loginTypePasswordResponseData {
  sentTo: string;
  phoneNumber?: string;
}

export const loginTypePassword = async (
  data: loginTypePasswordPayload
): Promise<Response<loginTypePasswordResponseData>> => {
  const response = await http.post(API_ROUTES.auth.loginTypePassword.url, data);
  return response.data;
};

export interface loginTypeOtpPayload {
  emailOrUsername: string;
  otp: string;
}

export const loginTypeOtp = async (
  data: loginTypeOtpPayload
): Promise<Response<Tokens>> => {
  const response = await http.post(API_ROUTES.auth.loginTypeOtp.url, data);
  return response.data;
};
export const getUserProfile = async (): Promise<Response<USER_PROFILE>> => {
  const response = await http.get(API_ROUTES.user.getUserProfile.url);
  return response.data;
};

export interface UserStats {
  isProfileComplete: boolean;
  isOnboardingComplete: boolean;
}
