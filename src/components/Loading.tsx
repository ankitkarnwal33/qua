import React from "react";
import HeaderSkeleton from "./HeaderSkeleton";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`} />
);

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <HeaderSkeleton />
      {/* Page title skeleton */}
      <Skeleton className="h-8 w-3/4 rounded-md" />
      {/* Subtitle lines */}
      <Skeleton className="h-4 w-full max-w-md rounded-md" />
      <Skeleton className="h-4 w-full max-w-lg rounded-md" />

      {/* Grid skeleton for cards or list items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
          >
            {/* Image or media placeholder */}
            <Skeleton className="h-48 w-full rounded-t-lg" />
            {/* Text lines under media */}
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
