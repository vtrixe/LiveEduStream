import { getRecommended } from "@/services/recommendations";
import { Lectures } from "./lectures";
import { Wrapper } from "./wrapper";
import { getEnrollments } from "@/services/enrollments";
import { Following, FollowingSkeleton } from "./enrollments";
import { 
  Toggle, 
} from "./toggle";

export const Sidebar = async  () => {
 const enrollments = await getEnrollments();
  const lecturersData = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <Following data={enrollments || null } />
      <Lectures data={lecturersData || null} />
    </Wrapper>

  );
};