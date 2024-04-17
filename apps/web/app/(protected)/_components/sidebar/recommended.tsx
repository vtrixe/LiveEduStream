/* eslint-disable no-unused-vars */
"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/components/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: (User & {
    // stream: { isLive: boolean } | null;
  })[];
};

export const Recommended = ({
  data,
}: RecommendedProps) => {
  const { collapsed } = useSidebar((state: any) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Lecturers you Can Enroll to
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
      <UserItem
      key={user.id}
      id={user.id}
      username={user.name || 'Unknown'}
      imageUrl={user.image || 'defaultImageURL'}
      description={user.description || 'defaultDescription'}
  
    

    />
     ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};

