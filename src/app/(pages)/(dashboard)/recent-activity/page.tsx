'use client';

import TableWrapper from '@/components/custom/table-wrapper';
import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { EngagementMonitor } from '@/types';
import { formatDate } from '@/utils';
import { ClockIcon } from '@heroicons/react/24/solid';

const activity: EngagementMonitor[] = [
  {
    id: '1',
    type: 'transaction',
    title: 'Transaction Request',
    message:
      'Bhaskar has requested a withdrawal of 100 BTC from your wallets mflkns dnflgmnlk dsmglkm dlfmglk mdlkfmgl mlmlmlm ksndfkns kdngkkl',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const isPending = false;

const Page = () => {
  return (
    <div className="space-y-4">
      <TableWrapper>
        {isPending ? (
          <RecentActivitySkeleton />
        ) : activity.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full py-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <ClockIcon className="text-neutral-50 w-20 h-20" />
              <Typography variant="large" color="text-neutral-400">
                No activity found.
              </Typography>
            </div>
          </div>
        ) : (
          activity.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center justify-between px-5 py-5 border-b border-b-neutral-40"
            >
              <div className="flex gap-2 items-center flex-wrap w-svw">
                <UserAvatar />
                <Typography
                  variant="small"
                  weight="bold"
                  color="text-neutral-0"
                  className="first-letter:uppercase rounded-full bg-neutral-50 px-2 py-1"
                >
                  {item?.type}
                </Typography>
                <Typography
                  variant="base"
                  color="text-neutral-100"
                  className="break-words max-w"
                >
                  {item?.message}
                </Typography>
                <Typography variant="base" color="text-neutral-100">
                  initaited by
                </Typography>
                <Typography
                  variant="base"
                  weight="bold"
                  color="text-neutral-100"
                >
                  Bhaskar Sharma
                </Typography>
              </div>
              <Typography
                variant="small"
                weight="bold"
                color="text-neutral-100"
                className="first-letter:uppercase"
              >
                {formatDate(item?.createdAt, 'RELATIVE')}
              </Typography>
            </div>
          ))
        )}
      </TableWrapper>
    </div>
  );
};
export default Page;

function RecentActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between gap-4 border-b py-2.5 px-5 last:border-none"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Skeleton className="h-8 w-8 rounded-full" />

            {/* Text lines */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-60" />
            </div>
          </div>

          {/* Timestamp */}
          <Skeleton className="h-3 w-8" />
        </div>
      ))}
    </div>
  );
}
