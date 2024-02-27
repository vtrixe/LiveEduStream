import { notFound } from "next/navigation";
import { getUserByUsername } from "@/services/user";
import { isEnrolled } from "@/services/enrollments";
import { Actions } from "./_components/actions";
import { revalidatePath } from "next/cache";
import { isBlockedByUser } from "@/services/block";




interface UserPageProps {
  params: {
    username: string;
    id : string;
  };
};

const UserPage = async ({
  params
}: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }
  const enrolled = await isEnrolled(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  
  console.log(enrolled);


  if (!user) {
    notFound();
  }

  return ( 
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>Are you Enrolled to this Lecturer: {enrolled ? 'Yes' : 'No'}</p>
      <p>is blocked by this user: {`${isBlocked}`}</p>
      <Actions userId={user.id} isEnrolled={!!enrolled} />

 
    </div>
  );
}

export default UserPage;