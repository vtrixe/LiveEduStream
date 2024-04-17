/* eslint-disable no-unused-vars */
// import { getFollowedUsers } from "@/lib/follow-service";
// import { getRecommended } from "@/lib/recommended-service";
import { Wrapper } from "./wrapper";
import { Enrollments, FollowingSkeleton } from "./following";
import { 
  Toggle, 
  ToggleSkeleton
} from "./toggle";
import { 
  Recommended, 
  RecommendedSkeleton
} from "./recommended";
import { getLecturers } from "@/services/lecturers";
import { getEnrollments } from "@/services/enrollments";


export const Sidebar = async () => {
  const lecturers= await getLecturers();
  const enrollments = await getEnrollments();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
   
        <Recommended data={lecturers} />
        <Enrollments data={enrollments} />

      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
