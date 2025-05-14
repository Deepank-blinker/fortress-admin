import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TAB_LINKS_DATA } from '@/constants/index.constant';
import { useAppSelector } from '@/store/store';
import {
  Bars3Icon,
  BuildingOffice2Icon,
  CircleStackIcon,
  CubeTransparentIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  TicketIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { LogOutIcon } from 'lucide-react';
import { useState } from 'react';

// Map each tab to an appropriate icon
export const TAB_ICONS = {
  'Whitelisted IPs': <ShieldCheckIcon className="w-5 h-5" />,
  'Crypto Tokens': <CubeTransparentIcon className="w-5 h-5" />,
  Stake: <CircleStackIcon className="w-5 h-5" />,
  Individual: <UserIcon className="w-5 h-5" />,
  Corporate: <BuildingOffice2Icon className="w-5 h-5" />,
  'Customer Tickets': <TicketIcon className="w-5 h-5" />,
  FAQs: <QuestionMarkCircleIcon className="w-5 h-5" />,
};

interface HeaderSidebarProps {
  currentTab: string;
  handleNavigate: (path: string) => void;
  handleLogout: () => void;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({
  currentTab,
  handleNavigate,
  handleLogout,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleTabClick = (path: string) => {
    setIsSheetOpen(false);
    handleNavigate(path);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="text" className="lg:hidden">
          <Bars3Icon className="!size-6 active:scale-90 transition-all" />
        </Button>
      </SheetTrigger>

      <SheetContent className="[&>button:hidden] w-[90%] sm:w-3/4 bg-neutral-0 overflow-y-auto">
        <div className="h-full flex flex-col">
          {/* Header with user info */}
          <SheetTitle>
            <div className="p-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <UserAvatar />
                <div>
                  <Typography variant="base" weight="bold">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="x-small" color="text-neutral-400">
                    {user?.username || user?.email}
                  </Typography>
                </div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription aria-describedby="" />

          {/* Navigation links */}
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {TAB_LINKS_DATA.map((link, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleTabClick(link.path)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary-75 transition-colors text-left ${currentTab === link.path ? 'bg-primary-100' : ''}`}
                    >
                      <span className="text-neutral-500">
                        {TAB_ICONS[link.title as keyof typeof TAB_ICONS]}
                      </span>
                      <Typography variant="base" weight="medium">
                        {link.title}
                      </Typography>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer with logout button */}
          <div className="p-4 border-t border-neutral-100">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleLogout}
            >
              <LogOutIcon />
              <Typography variant="base" weight="medium">
                Logout
              </Typography>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSidebar;
