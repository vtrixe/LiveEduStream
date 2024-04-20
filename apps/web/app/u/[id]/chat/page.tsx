/* eslint-disable no-unused-vars */
import { Settings } from "lucide-react";
import { getSelfById } from "@/services/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStreamByUserId } from "@/services/stream";
import { redirect } from "next/navigation";
import { ToggleCard } from "./_components/toggle-card";

const LecturerChat = async () => {
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

    console.log(stream)

    if(!stream){
        throw new Error("Unauthorized Action!")
    }
    return (
        <div className="p-6">

            <div className="flex items-center justify-between mb-4 ">

                <h1 className="text-2xl font-bold">
                    QnA Settings 
                    <Settings />
                </h1>

            </div>

            <div className="space-y-4">
                <ToggleCard  
                field="isChatEnabled"
                label = "Enable QnA"
                value = {
                    stream.isChatEnabled
                }
                />
                   <ToggleCard  
                field="isChatDelayed"
                label = "Delay"
                value = {
                    stream.isChatDelayed
                }
                />
                       <ToggleCard 
                field="isChatFollowersOnly"
                label = "Restrict Class"
                value = {
                    stream.isChatFollowersOnly
                }
                />
            </div>
        </div>
    )
}

export default LecturerChat;