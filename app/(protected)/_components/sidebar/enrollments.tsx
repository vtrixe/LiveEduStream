"use client";

import { Enroll , User } from "@prisma/client";
import { useSidebar } from "@/state/use-sidebar";
import { getUserById } from "@/services/user";
import { UserItem, UserItemSkeleton } from "./user-item";

interface EnrollmentProps {
  data: (Enroll & { enrolledBy: User })[];
}

export const Following = ({
  data,
}: EnrollmentProps) => {
  const { collapsed } = useSidebar((state) => state);

  console.log( " lenght of enrollments : " + data.length);

  if (!data.length) {
    return null;
  }



  



  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Lecturers Enrolled :
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">


        {data.map((enroll) => (

            
          <UserItem
          key={enroll.id}
          username={enroll.enrolledBy.username}
          imageUrl={enroll.enrolledBy.imageUrl}

          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {/* {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))} */}
    </ul>
  );
};