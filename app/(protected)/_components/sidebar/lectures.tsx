"use client";

import { User } from "@prisma/client";
import { UserItem } from "./user-item";
import { useSidebar } from "@/state/use-sidebar";
import { UserItemSkeleton } from "./user-item";

// import { UserItem, UserItemSkeleton } from "./user-item";

interface LecturesProps {
  data: User[];
};

export const Lectures = ({
  data,
}: LecturesProps) => {
  const { collapsed } = useSidebar((state) => state);

  console.log(data.length);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Recommended
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
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