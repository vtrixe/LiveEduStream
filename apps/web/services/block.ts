import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function isBlocked(id : string) {
  const session = await currentUser();
  const userId = session.id;
  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const user = await db.user.findUnique({
    where : {
        id : id
    }
  })

  if(!user){
    throw new Error("The User you are trying to access does not exist")


  }

  const isBlocked = await db.block.findFirst({
    where : {

        blockerId : dbUser?.id,
        blockedId : user.id
   

    }
  });

  return !!isBlocked;
}

export const getBlockedUsers = async () => {
  const session = await currentUser();
  const userId = session.id;

  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const BlockedUsers = await db.block.findMany({
    where: {
        blockerId : dbUser?.id
    },
    include: {
        blocked : true
    },
  });

  return BlockedUsers;
};
export const block = async (id: string) => {
    const session = await currentUser();
  
    const userId = session.id;
  
    const dbUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
  
    if (!user) {
      throw new Error("The User you are trying to access does not exist");
    }
  
    if (user.id === dbUser?.id) {
      throw new Error("Cannot Block yourself");
    }
  
    // Check if the current user has the LECTURER role
    if (dbUser?.role !== "LECTURER") {
      throw new Error("Only lecturers can block students");
    }
  
    // Check if the target user has the STUDENT role
    if (user.role !== "USER") {
      throw new Error("Only students can be blocked");
    }
  
    const isBlocked = await db.block.findFirst({
      where: {
        blockerId: dbUser?.id,
        blockedId: user.id,
      },
    });
  
    if (isBlocked) {
      throw new Error("Already Blocked");
    }
  
    const block = await db.block.create({
      data: {
        blockerId: dbUser?.id,
        blockedId: user.id,
      },
      include: {},
    });
  
    return block;
  };
export const unBlock = async (id : string) => {
  const session = await currentUser();
  const userId = session.id;
  const dbUser = await db.user.findUnique({
      where: {
          id: userId,
      },
  });

  const lecturer = await db.user.findUnique({
      where: {
          id: id
      }
  });

  if(!lecturer){
      throw new Error("The User you are trying to access does not exist");
  }

  if(lecturer.id === dbUser?.id){
      throw new Error("Canno Unblock  yourself");
  }

  const isBlocked = await db.block.findFirst({
      where: {

        blockerId : dbUser?.id,
        blockedId : lecturer.id

      }
  });

  if(!isBlocked){
      throw new Error("Not Blocked");
  }


  const enroll = await db.block.delete({
      where: {
          id: isBlocked.id
      }
  });

  return enroll;
};
