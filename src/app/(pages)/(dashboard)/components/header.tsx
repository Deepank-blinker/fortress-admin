import { Logo } from '@/assets';
import Typography from '@/components/custom/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PERMISSIONS, ROLES } from '@/constants/interface.constant';
import { ROUTES } from '@/constants/route';
import { logout } from '@/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  Bars3Icon,
  ChevronDoubleUpIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-white max-h-20 h-20 w-full p-4 md:px-10 flex items-center justify-between">
      {/* logo and name link*/}
      <Link href="/dashboard">
        <div className="flex gap-4">
          <div className="w-6 h-6 overflow-hidden">
            <Image
              src={Logo}
              alt="Logo"
              className="w-auto h-auto object-contain"
            />
          </div>

          <Typography variant="h5" weight="bold">
            FORTUNA
            <Typography
              variant="h5"
              weight="bold"
              color="text-neutral-100"
              as="span"
            >
              FORTRESS
            </Typography>
          </Typography>
        </div>
      </Link>

      <div className=" hidden lg:flex items-center justify-end w-[30%] xl:w-auto xl:gap-x-1 ">
        {/* admin  */}
        {user?.role === ROLES.CORPORATE &&
        user?.permission === PERMISSIONS.ADMIN ? (
          <Button
            variant="outline"
            className="rounded-xl py-3 px-4 border border-neutral-40 hover:bg-inherit"
          >
            <Typography
              variant="x-small"
              color="text-neutral-100"
              className="capitalize"
            >
              ADMIN
            </Typography>
          </Button>
        ) : null}
        {/* user info badge*/}
        <div className="flex items-center gap-2 justify-end pl-4 xl:pl-10">
          <div
            className="flex items-center gap-2   cursor-pointer whitespace-nowrap"
            onClick={() => router.push(ROUTES.ACCOUNT.path)}
          >
            <Typography variant="base" weight="bold" color="text-neutral-400">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Avatar className="bg-primary-75">
              <AvatarImage src={user?.profilePicture || ''} />
              <AvatarFallback className="bg-primary-75 text-success-300 font-medium">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* gap */}
        <div className="w-4 h-12 shrink-0" />

        {/* role if not individual user */}
        {user?.permission !== PERMISSIONS.ADMIN && (
          <div className="bg-neutral-40 flex items-center px-4 py-2 gap-2.5 rounded-3xl cursor-pointer whitespace-nowrap">
            <div className="flex items-center gap-1">
              <Typography
                variant="x-small"
                color="text-neutral-100"
                className="capitalize"
              >
                ROLE: {user?.permission}
              </Typography>
              {user?.permission === 'VIEWER' && (
                <Typography
                  variant="x-small"
                  color="text-neutral-100"
                  className="capitalize"
                >
                  Only
                </Typography>
              )}
            </div>
            {user?.permission === PERMISSIONS.OPERATOR ? (
              <ChevronDoubleUpIcon className="w-4 h-4 text-neutral-100" />
            ) : (
              <EyeIcon className="w-4 h-4 text-neutral-100" />
            )}
          </div>
        )}
        {/* logout button */}
        <Button variant="text" onClick={handleLogout}>
          <LogOutIcon />
        </Button>
      </div>

      {/* lg below menu menu */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="text" className="lg:hidden">
            <Bars3Icon style={{ width: '1.5rem', height: '1.5rem' }} />
          </Button>
        </SheetTrigger>

        <SheetContent className="px-4 [&>button:hidden] w-[90%] sm:w-3/4">
          <SheetTitle>
            <div className="flex items-center justify-between my-4 bg-neutral-20 hover:bg-neutral-30 p-2 rounded-lg text-neutral-900">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2   cursor-pointer whitespace-nowrap">
                  <Avatar className="bg-primary-75">
                    <AvatarImage src={user?.profilePicture || ''} />
                    <AvatarFallback className="bg-primary-75 text-success-300 font-medium">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Typography
                    variant="base"
                    weight="bold"
                    color="text-neutral-400"
                  >
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription aria-describedby="" />
    

          <Button
            variant="secondary"
            className="w-full my-4 "
            onClick={handleLogout}
          >
            Logout
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Header;
