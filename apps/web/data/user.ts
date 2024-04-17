/* eslint-disable no-unused-vars */
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};


export const getSelf  = async () => {
  try {
    const self = await useCurrentUser();

    if(!self){
      return redirect('/auth/login');
    }

    return self.id
  }
  catch(error){
    console.log("Request Failed", error);

  }
}

