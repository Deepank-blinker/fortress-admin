import Typography from '@/components/custom/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/store/store';
import { getUserInitials } from '@/utils';
import { useMemo } from 'react';

interface UserAvatarProps {
  name?: string;
  src?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, src, onClick }) => {
  const { user } = useAppSelector((state) => state.auth);

  // by default use redux user if user data not provided
  const { displayInitial, displaySrc } = useMemo(() => {
    if (name || src) {
      return {
        displayInitial: name,
        displaySrc: src,
      };
    }
    return {
      displayInitial: getUserInitials(user?.firstName, user?.lastName),
      displaySrc: user?.profilePicture,
    };
  }, [name, src, user]);

  return (
    <Avatar
      className="bg-neutral-0 flex justify-center items-center"
      onClick={onClick}
    >
      <AvatarImage src={displaySrc || ''} />
      <AvatarFallback className="bg-primary-100 w-10 h-10 p-2.5">
        <Typography variant="base" weight="bold">
          {displayInitial}
        </Typography>
      </AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar };
