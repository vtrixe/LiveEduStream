"use server";

import { revalidatePath } from "next/cache";
import { enrollUser ,  unEnroll } from "@/services/enrollments";
import { db } from "@/lib/db";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await enrollUser(id);

    const lecturer = await db.user.findUnique({
      where : {
        id : followedUser?.lecturerId
      }
    })

    if(!lecturer){
      return null
    }

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${lecturer.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("Interal Error");
  };
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unEnroll(id);

    const lecturer = await db.user.findUnique({
      where : {
        id : unfollowedUser?.lecturerId
      }
    })

    if(!lecturer){
      return null
    }


    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${lecturer.username}`)
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
}