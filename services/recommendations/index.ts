import { db } from "@/lib/db";
import { getCurrentUser } from "../auth";


export const getRecommended = async () => {


    const users = await db.user.findMany({

        where : {

            OrganizationRole : "MEMBER"

        } ,

        orderBy : {
            createdAt : "desc"
        }
    })

    return users;
}