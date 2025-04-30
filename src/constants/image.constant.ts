import ETH from '@/assets/images/crypto-logo/ETH.png';
import BSC from '@/assets/images/crypto-logo/BSC.png';
import TRX from '@/assets/images/crypto-logo/TRX.png';
import XRP from '@/assets/images/crypto-logo/XRP.png';
import XLM from '@/assets/images/crypto-logo/XLM.png';
import ADA from '@/assets/images/crypto-logo/ADA.png';
import MATIC from '@/assets/images/crypto-logo/MATIC.png';
import ZEC from '@/assets/images/crypto-logo/ZEC.png';
import DOGE from '@/assets/images/crypto-logo/DOGE.png';
import SOL from '@/assets/images/crypto-logo/SOL.png';
import BSV from '@/assets/images/crypto-logo/BSV.png';
import AVAX from '@/assets/images/crypto-logo/AVAX.png';
import ARB from '@/assets/images/crypto-logo/ARB.png';
import DOT from '@/assets/images/crypto-logo/DOT.png';
import TetherOMNI from '@/assets/images/crypto-logo/TetherOMNI.png';
import TON from '@/assets/images/crypto-logo/TON.png';
import NEAR from '@/assets/images/crypto-logo/NEAR.png';
import { StaticImageData } from 'next/image';

export const CRYPTO_CURRENCY_IMAGES: Record<string, StaticImageData> = {
  ETH,
  BSC,
  TRX,
  XRP,
  XLM,
  ADA,
  MATIC,
  ZEC,
  DOGE,
  SOL,
  BSV,
  AVAX,
  ARB,
  DOT,
  TetherOMNI,
  TON,
  NEAR,
};

export const getCryptoLogo = (symbol: string): StaticImageData => {
  return CRYPTO_CURRENCY_IMAGES?.[symbol.toUpperCase()];
};
