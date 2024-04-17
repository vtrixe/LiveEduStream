/* eslint-disable no-unused-vars */

"use client";

import { Enroll, User } from "@prisma/client";

import { useSidebar } from "@/components/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

import { Key } from "react";

interface EnrollmentProps {
  data: (Enroll & {
    enrolledTo: User;
  })[];
}

export const Enrollments = ({ data }: EnrollmentProps) => {
  const { collapsed } = useSidebar((state: any) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">You are Enrolled to</p>
        </div>
      )}
     <ul className="space-y-2 px-2">
  {data.map((enroll) => (
    <UserItem
      key={enroll.id}
      id={enroll.enrolledToId} // Change this to enrolledToId
      username={enroll.enrolledTo?.name ?? "default name"}
      imageUrl={enroll.enrolledTo?.image ?? "defaultImage"}
      description={enroll.enrolledTo?.description ?? "defaultDescription"}
    />
  ))}
</ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};