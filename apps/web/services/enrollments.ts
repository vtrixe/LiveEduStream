import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function isEnrolled(id : string) {
  const session = await currentUser();
  const userId = session.id;
  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const lecturer = await db.user.findUnique({
    where : {
        id : id
    }
  })

  if(!lecturer){
    throw new Error("The Lecturer you are trying to access does not exist")


  }

  const isEnrolled = await db.enroll.findFirst({
    where : {
        enrolledById : dbUser?.id,
        enrolledToId : lecturer.id

    }
  });

  return !!isEnrolled
}

export const getEnrollments = async () => {
  const session = await currentUser();
  const userId = session.id;

  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const enrollments = await db.enroll.findMany({
    where: {
      enrolledById: dbUser?.id,
    },
    include: {
      enrolledTo: true, // Include the enrolledTo user data
    },
  });

  return enrollments;
};
export const enroll = async (id : string) => {

    const session = await currentUser();
    const userId = session.id;
    const dbUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const lecturer= await db.user.findUnique({
        where : {
            id : id
        }
    })

    if(!lecturer){
        throw new Error("The Lecturer you are trying to access does not exist")
    
    
      }

      if(lecturer.id === dbUser?.id){
        throw new Error("Cannot enroll to yourself")


      }

      const isEnrolled = await db.enroll.findFirst({
        where : {
            enrolledById : dbUser?.id,
            enrolledToId : lecturer.id
        }
      })

      if(isEnrolled){
        throw new Error("Already Enrolled");

      }

      const enroll = await db.enroll.create({
        data : {
            enrolledById : dbUser?.id || "enrolled",
            enrolledToId : lecturer.id
        },
        include : {

            enrolledBy : true,
            enrolledTo : true
        
        }

        
      })


      return enroll;






}

export const unEnroll = async (id : string) => {
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
      throw new Error("The Lecturer you are trying to access does not exist");
  }

  if(lecturer.id === dbUser?.id){
      throw new Error("Cannot enroll to yourself");
  }

  const isEnrolled = await db.enroll.findFirst({
      where: {
          enrolledById: dbUser?.id,
          enrolledToId: lecturer.id
      }
  });

  if(!isEnrolled){
      throw new Error("Not Enrolled");
  }


  const enroll = await db.enroll.delete({
      where: {
          id: isEnrolled.id 
      },
      include: {
          enrolledBy: true,
      }
  });

  return enroll;
};
