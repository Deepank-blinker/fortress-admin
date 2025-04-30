'use client';

import { BackgroundPlaceholder, Logo } from '@/assets';
import Carousel from '@/components/custom/carousel';
import { CAROUSEL_ITEMS } from '@/utils';
import Image from 'next/image';
import React, { ReactNode, Suspense } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <div
        className="h-[100vh] p-4 sm:px-20 md:px-12 lg:px-[7.5rem] lg:py-28 overflow-y-auto md:overflow-hidden flex justify-center items-center w-full"
        style={{
          backgroundImage: `url(${BackgroundPlaceholder.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 relative h-[95vh] sm:h-[82vh] rounded-xl w-full max-w-screen-2xl">
          <div className="w-full flex flex-col p-4 lg:px-16 pt-8 bg-neutral-0 rounded-xl md:rounded-r-none overflow-y-auto no-scrollbar">
            <Image
              src={Logo}
              alt="logo"
              className="h-16 w-16 object-contain mb-10"
            />
            <div className="px-3 sm:w-md">{children}</div>
          </div>
          <div className="hidden md:flex flex-col gap-4 bg-neutral-900 h-[82vh] rounded-r-xl">
            <Carousel items={CAROUSEL_ITEMS} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
