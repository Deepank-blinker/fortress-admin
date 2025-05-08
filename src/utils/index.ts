import {
  Carousel1,
  Carousel2,
  Carousel3,
  Carousel4,
  Carousel5,
} from '@/assets';
import { CHAIN_COLORS, CHAINS } from '@/constants/index.constant';

import { StaticImageData } from 'next/image';

// export const CAROUSEL_ITEMS = [Carousel1, Carousel2, Carousel3, Carousel4];
export interface CAROUSEL {
  heading: string;
  subText: string;
  image: StaticImageData;
}
export const CAROUSEL_ITEMS: CAROUSEL[] = [
  {
    heading: 'Total Control, Zero Hassle',
    subText:
      'Track, trade, and manage your assets—all in one intuitive dashboard',
    image: Carousel5,
  },
  {
    heading: 'All Your Wallets, One Access',
    subText: 'Manage multiple wallets effortlessly and securely on Fortress',
    image: Carousel2,
  },
  {
    heading: 'Stake Your Assets With Ease',
    subText: 'Maximize your crypto yields with Staking in over 50+ networks',
    image: Carousel4,
  },
  {
    heading: 'Seamless Transactions Trail',
    subText: 'Check and Download full transactions trail of your wallets',
    image: Carousel1,
  },
  {
    heading: 'Request, Relax, Repeat',
    subText:
      "Put in your request—we'll handle the rest with speed and security.",
    image: Carousel3,
  },
];

interface VerificationCodeButtonProps {
  otp: string;
  isPending: boolean;
  canResend: boolean;
  isCodeResendPending: boolean;
  timer: number;
  isAuthenticator?: boolean;
}

export const getVerificationCodeSubmitButtonText = ({
  otp,
  isPending,
  canResend,
  isCodeResendPending,
  timer,
  isAuthenticator = false,
}: VerificationCodeButtonProps) => {
  if (isAuthenticator) {
    return 'Check your authenticator app';
  }

  if (otp.length === 6) {
    return isPending ? 'Verifying OTP...' : 'Continue';
  }

  if (canResend) {
    return 'Resend Code';
  }

  if (isCodeResendPending) {
    return 'Sending code...';
  }

  return `Resend Code in ${timer}s`;
};

interface Error {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const getErrorMessage = (error: Error): string | undefined => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    (error as string) ||
    'Something went wrong!'
  );
};

export const getMaskedPhoneNumber = (
  phoneNumber?: string,
  defaultTextReplacement = 'your phone number'
) => {
  // if not phone number return msg
  if (!phoneNumber)
    return defaultTextReplacement
      ? defaultTextReplacement
      : 'your phone number';

  const textNumber = phoneNumber
    ?.split('')
    .map((digit, index) => {
      if (index < 4) return digit; // Keep the first 4 characters (+353)
      if (index >= phoneNumber?.toString().length - 2) return digit; // Keep the last 2 digits
      return 'x'; // Replace middle digits with 'x'
    })
    .join('');

  return textNumber
    ? `${textNumber}`
    : defaultTextReplacement
      ? defaultTextReplacement
      : 'your phone number';
};

// Helper function to get chain color with fallback
export const getChainColor = (chain: keyof typeof CHAIN_COLORS | string) => {
  return (
    CHAIN_COLORS[chain as keyof typeof CHAIN_COLORS] ||
    'bg-gray-50 border-gray-200 text-gray-700'
  );
};

export const getDisplayChainName = (chain: keyof typeof CHAINS): string => {
  return chain === CHAINS.UTXO ? CHAINS.BITCOIN : chain;
};

export const unescapeHtml = (escaped: string) => {
  const doc = new DOMParser().parseFromString(escaped, 'text/html');
  return doc.body.textContent || '';
};
