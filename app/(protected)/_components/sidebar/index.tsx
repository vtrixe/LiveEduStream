import { getRecommended } from "@/services/recommendations";
import { Lectures } from "./lectures";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async  () => {
  const lecturersData = await getRecommended()
  return (
    <Wrapper>
      <Toggle />
      <Lectures data={lecturersData || null} />
    </Wrapper>

  );
};