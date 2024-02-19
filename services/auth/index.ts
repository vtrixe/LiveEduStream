import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";


export const getCurrentUser  = async () =>{

    const current =await currentUser();

    if(!current || current.id ){
     throw new Error ("Error : Unauthorized");
    }


    const user = await db.user.findUnique({
        where : {
            externalUserId : current.id
        }
    })

    if(!user) {

        throw new Error ("not found");
    }

    return user;
}