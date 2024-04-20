import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStreamByUserId } from "@/services/stream";
import { redirect } from "next/navigation";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {

    const session = await currentUser();
    const userId = session.id;
    const dbUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });


    if(!dbUser){
        return redirect("/auth/login");
    }


    const stream = await getStreamByUserId(dbUser.id)

    // console.log(stream)

    if(!stream){
        throw new Error("Unauthorized Action!")
    }
  return ( 
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Keys & URLs
        </h1>

        <ConnectModal />

      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};
 
export default KeysPage;