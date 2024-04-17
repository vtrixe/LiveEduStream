"use server";

import { revalidatePath } from "next/cache";
import { block , unBlock } from "@/services/block";
import { enroll , unEnroll } from "@/services/enrollments";

export const onEnroll = async (id: string) => {
  try {
    const enrolledUser = await enroll(id);

    revalidatePath("/");

    if (enrolledUser) {
      revalidatePath(`/${enrolledUser.enrolledTo.id}`);
    }

    return enrolledUser
  } catch (error) {
    throw new Error("Interal Error");
  };
};

export const onUnEnroll = async (id: string) => {
  try {
    const unEnrolledUser = await unEnroll(id);

    revalidatePath("/");

    if (unEnrolledUser) {
      revalidatePath(`/${unEnrolledUser.enrolledBy.id}`)
    }

    return unEnrolledUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
}


export const onBlock = async (id : string) => {


  const blockedUser = await block(id);

  revalidatePath("/")

  if(blockedUser){
    revalidatePath (`/${blockedUser.blockedId}`)

  }

  return blockedUser;

}

export const onunBlock = async (id : string) => {
  const unBlockedUser = await unBlock(id);

  revalidatePath("/");

  if(unBlockedUser){
    revalidatePath(`/${unBlockedUser.blockedId}`)
    revalidatePath(`/${unBlockedUser.blockerId}`)
  }

  return unBlockedUser;
}