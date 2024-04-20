/* eslint-disable no-unused-vars */
"use server"

import { Stream } from "@prisma/client"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth";
import { getStreamByUserId } from "@/services/stream";




export const updateStream = async(values : Partial<Stream>) => {
    try {

        const session = await currentUser();
const userId = session.id;
const dbUser = await db.user.findUnique({
  where: {
    id: userId,
  },
});

if(!dbUser){
    throw new Error ("Session Expired")
}

const stream = await getStreamByUserId(dbUser?.id)

if(!stream){
    throw new Error("Unauthoritized Action");
}

const validateData = {
    name : values.name,
    isChatEnabled : values.isChatEnabled,
    isChatFollowersOnly : values.isChatFollowersOnly,
    isChatDelayed : values.isChatDelayed,


}
const updatedStream = await db.stream.update({
    where: {
      id: stream.id,
    },
    data: {
      ...validateData,
    },
  });


  revalidatePath(`/u/${dbUser.id}/chat`);
  revalidatePath(`/u/${dbUser.id}`);
  revalidatePath(`/${dbUser.id}`);


    }

    catch {

        throw new Error("Internal Server Error");



    }
}