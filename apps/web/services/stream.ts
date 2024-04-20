import { db } from "@/lib/db";

export const getStreamByUserId = async (id: string) => {
 const dbUser = await db.user.findUnique({
    where : {
        id :id
    }
 })

 const stream = await db.stream.findUnique({
    where : {
        userId : dbUser?.id
    }
 }
 )

  return stream;
};