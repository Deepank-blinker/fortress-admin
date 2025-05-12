'use client';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
interface UserOrganizationDetailSkeletonProps {
  profilePicture?: boolean;
}

const UserOrganizationDetailSkeleton: React.FC<
  UserOrganizationDetailSkeletonProps
> = ({ profilePicture = false }) => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Header section: avatar and name */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-0">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>

      {/* Profile image section */}
      {profilePicture && (
        <div className="p-4 rounded-lg bg-neutral-0 flex justify-center">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
      )}

      {/* Static FormSection Skeleton */}
      {[1, 2, 3, 3, 4].map((_, index) => (
        <div key={index} className="p-4 rounded-lg bg-neutral-0 space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[1, 2, 3, 4].map((fieldIndex) => (
              <Skeleton key={fieldIndex} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrganizationDetailSkeleton;
