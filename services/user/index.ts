import { db } from "@/lib/db";

export const  getUserByUsername = async ( username : string) => {

    const user=await db.user.findUnique({
        where : {
            username,
        },
    });

    return user;

}

// export const  getUserByEmail = async (email : string) => {

//     const user = await db.user.findUnique({


//         where : {
//             email : email,
//         }
        

//     })
// return user;
// }

export const getUserById = async ( Id : string) => {
    const user = await db.user.findUnique({
        where : {


            id : Id,


        }
    })

    return user;
}