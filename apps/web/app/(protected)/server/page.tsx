import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";
import { getSessionToken } from "@/actions/new-action";

const ServerPage = async () => {
  const user = await currentUser();
  const session = await getSessionToken()
  console.log(session);

  return ( 

    <div>

<UserInfo
      label="💻 Server component"
      user={user}

    />
    

    </div>

   );
}
 
export default ServerPage;