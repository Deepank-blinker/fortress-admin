'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import Header from './components/header';
import Tab from './components/tabs';
import Spinner from '@/components/custom/spinner';
import { ROUTES } from '@/constants/route';
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const path = usePathname();
  const [currentTab, setCurrentTab] = useState(path);
  const router = useRouter();
  const changeActiveTab = (tab: string) => {
    router.refresh();
    setCurrentTab(tab);
  };
  useEffect(() => {
    setCurrentTab(path);
  }, [path]);
  return (
    <div className="bg-neutral-20 flex-1 min-h-[100vh]">
      {/* Top Header */}
      <Header />
      {/* Tabs */}
      <Tab
        linkData={[
          {
            title: 'Whitelisted IPs',
            path: ROUTES.WHITELISTED_IPS.path,
          },
          {
            title: 'Crypto Tokens',
            path: ROUTES.CRYPTO_TOKENS.path,
          },
          {
            title: 'Individual',
            path: ROUTES.INDIVIDUAL.path,
          },
          {
            title: 'Corporate',
            path: ROUTES.CORPORATE.path,
          },
          {
            title: 'Customer Tickets',
            path: ROUTES.CUSTOMER_TICKETS.path,
          },
          {
            title: 'FAQs',
            path: ROUTES.FAQS.path,
          },
        ]}
        currentSelected={currentTab}
        onTabClick={changeActiveTab}
      />
      <Suspense fallback={<Spinner hScreen bgColor="bg-neutral-20" />}>
        <div className="p-4">{children}</div>
      </Suspense>
    </div>
  );
};
export default Layout;
