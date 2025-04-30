'use client';
import Typography from '@/components/custom/typography';
import Link from 'next/link';

type TabProps = {
  linkData: { title: string; path: string }[];
  currentSelected: string;
  onTabClick?: (path: string) => void;
  activeClassName?: string;
  inactiveClassName?: string;
  containerClassName?: string;
};
const Tab: React.FC<TabProps> = ({
  linkData,
  currentSelected,
  onTabClick,
  activeClassName = 'text-success-300 border-b-success-300',
  inactiveClassName = 'text-neutral-100 border-b-transparent',
  containerClassName = 'bg-white px-4 md:px-16 flex gap-4 border-t-[1px]',
}) => {
  return (
    <div className={`${containerClassName} overflow-x-auto no-scrollbar`}>
      {linkData.map((item, index) => {
        return (
          <Link
            href={item.path}
            key={index}
            onClick={() => onTabClick?.(item.path)}
            className={`p-2 sm:px-4 sm:py-2.5 ${currentSelected === item.path ? 'border-b-4 border-b-success-300' : ''}`}
          >
            <Typography
              variant="base"
              weight="bold"
              color={`${currentSelected === item.path ? activeClassName : inactiveClassName} whitespace-nowrap`}
            >
              {item.title}
            </Typography>
          </Link>
        );
      })}
    </div>
  );
};
export default Tab;
